/**
 * @file clientController.js
 * @description Contrôleur client — EthnicEats
 *
 * Orchestre toutes les actions liées au profil client, aux préférences,
 * aux favoris, à l'historique et au calcul de prix des ingrédients.
 *
 * Pages gérées :
 *   - client/preferences.html      → sauvegarderPreferences(), getPreferences()
 *   - client/profil.html           → getProfil()
 *   - client/favoris.html          → getFavoris(), toggleFavori(), isFavori()
 *   - client/historique.html       → getHistorique()
 *   - client/detail-recette.html   → calculerPrixIngredients(), toggleFavori(), isFavori()
 *
 * Architecture MVC stricte :
 *   - Ne manipule jamais le DOM
 *   - Ne connaît pas les vues
 *   - Appelle les services et retourne des objets résultat aux vues
 *
 * Dépendances :
 *   - services/firestoreService.js
 *   - services/authService.js (getCurrentUser)
 *   - models/client.js (Client.depuisObjet, Client.definirPreferences)
 */

import {
  getUtilisateur,
  sauvegarderPreferences  as _sauvegarderPrefsFS,
  getPreferences          as _getPrefsFS,
  getFavoris              as _getFavorisFS,
  ajouterFavori,
  supprimerFavori,
  getHistoriqueClient,
} from "../services/firestoreService.js";

import { getCurrentUser } from "../services/authService.js";

// ─── Constantes métier ────────────────────────────────────────────────────────

/**
 * Multiplicateurs de prix selon la source et la priorité.
 *
 * Logique :
 *   - souk        → produits frais, moins chers mais délai variable
 *   - supermarche → produits emballés, prix standard, délai court
 *   - mix         → combinaison des deux sources
 *
 * Les multiplicateurs s'appliquent sur prixBase de chaque ingrédient.
 */
const MULTIPLICATEURS_SOURCE = {
  souk:         0.75,   // -25 % par rapport au prix de base
  supermarche:  1.10,   // +10 % (emballage, traçabilité)
  mix:          0.90,   // -10 % (moyenne pondérée)
};

const MULTIPLICATEURS_PRIORITE = {
  moins_cher:   0.95,   // Optimise vers le moins cher (-5 % supplémentaire)
  plus_rapide:  1.05,   // Frais de rapidité (+5 %)
  plus_frais:   1.08,   // Qualité supérieure (+8 %)
};

// ─── getProfil ────────────────────────────────────────────────────────────────

/**
 * Récupère les données du profil client depuis Firestore.
 *
 * Retourne un objet enrichi avec les préférences et les ids favoris.
 * La vue utilise ces données pour afficher le nom, l'email, etc.
 *
 * @param {string} clientId - UID Firebase du client
 * @returns {Promise<{
 *   success: boolean,
 *   profil: Object|null,
 *   message: string
 * }>}
 */
async function getProfil(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      return { success: false, profil: null, message: "Identifiant client invalide." };
    }

    const profil = await getUtilisateur(clientId);

    if (!profil) {
      return {
        success: false,
        profil: null,
        message: "Profil introuvable. Veuillez vous reconnecter.",
      };
    }

    // On enrichit avec les préférences stockées dans la sous-collection
    const preferences = await _getPrefsFS(clientId);

    return {
      success: true,
      profil: {
        ...profil,
        preferences: preferences ?? null,
      },
      message: "",
    };

  } catch (error) {
    console.error("[clientController.getProfil]", error.message);
    return {
      success: false,
      profil: null,
      message: "Impossible de charger le profil. Veuillez réessayer.",
    };
  }
}

// ─── sauvegarderPreferences ───────────────────────────────────────────────────

/**
 * Valide et sauvegarde les préférences d'achat d'un client.
 *
 * Appelé depuis :
 *   - client/preferences.html après l'inscription (1ère fois)
 *   - client/profil.html → Préférences (modification ultérieure)
 *
 * Les préférences influencent :
 *   - le prix calculé de chaque ingrédient (calculerPrixIngredients)
 *   - la source des produits (souk / supermarché / mix)
 *   - le plan de livraison généré pour le livreur (max 1–2 points de collecte)
 *
 * @param {string} clientId
 * @param {Object} preferences
 *   @param {number} preferences.budgetMax      - budget en MAD (≥ 0)
 *   @param {string} preferences.sourcePreferee - "souk" | "supermarche" | "mix"
 *   @param {string} preferences.priorite       - "moins_cher" | "plus_rapide" | "plus_frais"
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function sauvegarderPreferences(clientId, preferences) {
  try {
    if (!clientId || typeof clientId !== "string") {
      return { success: false, message: "Identifiant client invalide." };
    }

    // ── Validation contrôleur ──────────────────────────────────────────────
    if (!preferences || typeof preferences !== "object") {
      return { success: false, message: "Préférences invalides." };
    }

    const { budgetMax, sourcePreferee, priorite } = preferences;

    if (typeof budgetMax !== "number" || budgetMax < 0) {
      return { success: false, message: "Le budget doit être un nombre positif ou nul." };
    }

    const sourcesValides   = ["souk", "supermarche", "mix"];
    const prioritesValides = ["moins_cher", "plus_rapide", "plus_frais"];

    if (!sourcesValides.includes(sourcePreferee)) {
      return {
        success: false,
        message: `Source invalide : "${sourcePreferee}". Choisissez parmi : souk, supermarche, mix.`,
      };
    }

    if (!prioritesValides.includes(priorite)) {
      return {
        success: false,
        message: `Priorité invalide : "${priorite}". Choisissez parmi : moins_cher, plus_rapide, plus_frais.`,
      };
    }

    // ── Persistance ───────────────────────────────────────────────────────
    await _sauvegarderPrefsFS(clientId, { budgetMax, sourcePreferee, priorite });

    // Mise à jour du champ preferencesDefinies dans le document principal
    // (permet à la logique de navigation de savoir si les préférences ont été définies)
    const { sauvegarderUtilisateur } = await import("../services/firestoreService.js");
    await sauvegarderUtilisateur(clientId, { preferencesDefinies: true });

    return { success: true, message: "Préférences enregistrées avec succès." };

  } catch (error) {
    console.error("[clientController.sauvegarderPreferences]", error.message);
    return {
      success: false,
      message: "Impossible d'enregistrer les préférences. Veuillez réessayer.",
    };
  }
}

// ─── getPreferences ───────────────────────────────────────────────────────────

/**
 * Récupère les préférences actuelles d'un client.
 *
 * Utilisé pour pré-remplir le formulaire de préférences depuis le profil.
 *
 * @param {string} clientId
 * @returns {Promise<{
 *   success: boolean,
 *   preferences: { budgetMax: number, sourcePreferee: string, priorite: string }|null,
 *   message: string
 * }>}
 */
async function getPreferences(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      return { success: false, preferences: null, message: "Identifiant client invalide." };
    }

    const preferences = await _getPrefsFS(clientId);

    if (!preferences) {
      return {
        success: true,
        preferences: null,
        message: "Aucune préférence définie.",
      };
    }

    return { success: true, preferences, message: "" };

  } catch (error) {
    console.error("[clientController.getPreferences]", error.message);
    return {
      success: false,
      preferences: null,
      message: "Impossible de charger les préférences. Veuillez réessayer.",
    };
  }
}

// ─── getFavoris ───────────────────────────────────────────────────────────────

/**
 * Récupère la liste des recetteIds mis en favoris par un client.
 *
 * Les données complètes des recettes sont stockées localement dans
 * data/recettes.js — le contrôleur retourne uniquement les IDs,
 * la vue se charge de croiser avec les données locales.
 *
 * @param {string} clientId
 * @returns {Promise<{
 *   success: boolean,
 *   favorisIds: string[],
 *   message: string
 * }>}
 */
async function getFavoris(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      return { success: false, favorisIds: [], message: "Identifiant client invalide." };
    }

    const favorisIds = await _getFavorisFS(clientId);

    return { success: true, favorisIds, message: "" };

  } catch (error) {
    console.error("[clientController.getFavoris]", error.message);
    return {
      success: false,
      favorisIds: [],
      message: "Impossible de charger les favoris. Veuillez réessayer.",
    };
  }
}

// ─── toggleFavori ─────────────────────────────────────────────────────────────

/**
 * Ajoute ou retire une recette des favoris (bascule).
 *
 * Utilisé depuis :
 *   - L'icône cœur sur l'écran de détail d'une recette
 *   - L'icône cœur sur l'écran des favoris (suppression)
 *
 * Logique :
 *   - Si la recette est déjà en favori → suppression immédiate
 *   - Sinon → ajout
 *
 * @param {string} clientId
 * @param {string} recetteId
 * @returns {Promise<{
 *   success: boolean,
 *   estFavori: boolean,   // état final après la bascule
 *   action: "ajout"|"suppression",
 *   message: string
 * }>}
 */
async function toggleFavori(clientId, recetteId) {
  try {
    if (!clientId  || typeof clientId  !== "string") {
      return { success: false, estFavori: false, action: null, message: "Identifiant client invalide." };
    }
    if (!recetteId || typeof recetteId !== "string") {
      return { success: false, estFavori: false, action: null, message: "Identifiant recette invalide." };
    }

    // Vérifie l'état actuel
    const favorisIds   = await _getFavorisFS(clientId);
    const déjàFavori   = favorisIds.includes(recetteId);

    if (déjàFavori) {
      await supprimerFavori(clientId, recetteId);
      return {
        success: true,
        estFavori: false,
        action: "suppression",
        message: "Recette retirée des favoris.",
      };
    } else {
      await ajouterFavori(clientId, recetteId);
      return {
        success: true,
        estFavori: true,
        action: "ajout",
        message: "Recette ajoutée aux favoris.",
      };
    }

  } catch (error) {
    console.error("[clientController.toggleFavori]", error.message);
    return {
      success: false,
      estFavori: false,
      action: null,
      message: "Impossible de modifier les favoris. Veuillez réessayer.",
    };
  }
}

// ─── isFavori ─────────────────────────────────────────────────────────────────

/**
 * Vérifie si une recette est dans les favoris du client.
 *
 * Utilisé au chargement de l'écran de détail d'une recette pour
 * afficher l'icône cœur dans le bon état (vide ou remplie).
 *
 * @param {string} clientId
 * @param {string} recetteId
 * @returns {Promise<{
 *   success: boolean,
 *   estFavori: boolean,
 *   message: string
 * }>}
 */
async function isFavori(clientId, recetteId) {
  try {
    if (!clientId  || typeof clientId  !== "string") {
      return { success: false, estFavori: false, message: "Identifiant client invalide." };
    }
    if (!recetteId || typeof recetteId !== "string") {
      return { success: false, estFavori: false, message: "Identifiant recette invalide." };
    }

    const favorisIds = await _getFavorisFS(clientId);
    const estFavori  = favorisIds.includes(recetteId);

    return { success: true, estFavori, message: "" };

  } catch (error) {
    console.error("[clientController.isFavori]", error.message);
    return {
      success: false,
      estFavori: false,
      message: "Impossible de vérifier les favoris.",
    };
  }
}

// ─── getHistorique ────────────────────────────────────────────────────────────

/**
 * Récupère l'historique des commandes livrées d'un client.
 *
 * Seules les commandes au statut "livree" sont retournées.
 * Utilisé depuis client/profil.html → Historique des recettes.
 *
 * Chaque commande contient : id, dateCreation, statut, prixTotal,
 * itineraire, adresseLivraison, recetteId, etc.
 * (voir firestoreService.getHistoriqueClient pour la structure complète)
 *
 * @param {string} clientId
 * @returns {Promise<{
 *   success: boolean,
 *   historique: Array<Object>,
 *   message: string
 * }>}
 */
async function getHistorique(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      return { success: false, historique: [], message: "Identifiant client invalide." };
    }

    const historique = await getHistoriqueClient(clientId);

    return { success: true, historique, message: "" };

  } catch (error) {
    console.error("[clientController.getHistorique]", error.message);
    return {
      success: false,
      historique: [],
      message: "Impossible de charger l'historique. Veuillez réessayer.",
    };
  }
}

// ─── calculerPrixIngredients ──────────────────────────────────────────────────

/**
 * Calcule le prix de chaque ingrédient en fonction des préférences du client.
 *
 * Logique de calcul :
 *   prixFinal = prixBase × multiplicateurSource × multiplicateurPriorite
 *
 * Chaque ingrédient peut fournir trois prix bruts :
 *   - prixSouk        → prix au marché local (MAD)
 *   - prixSupermarche → prix en supermarché (MAD)
 *   - prixBase        → prix de référence neutre (MAD)
 *
 * Selon la sourcePreferee et la priorite, le contrôleur choisit
 * et ajuste le bon prix pour chaque ingrédient.
 *
 * Le prixTotal retourné est la somme de tous les prixFinal,
 * ajustée en fonction du budgetMax (aucun dépassement — information
 * uniquement, la vue peut alerter l'utilisateur).
 *
 * @param {Array<Object>} ingredients - Tableau d'ingrédients avec :
 *   @param {string} ingredients[].id
 *   @param {string} ingredients[].nom
 *   @param {number} ingredients[].quantite        - quantité sélectionnée
 *   @param {string} ingredients[].unite           - "g" | "kg" | "pack" | "unité"
 *   @param {number} ingredients[].prixBase        - prix de référence (MAD / unité)
 *   @param {number} [ingredients[].prixSouk]      - prix souk (MAD / unité), optionnel
 *   @param {number} [ingredients[].prixSupermarche] - prix supermarché (MAD / unité), optionnel
 *
 * @param {Object} preferences
 *   @param {number} preferences.budgetMax
 *   @param {string} preferences.sourcePreferee - "souk" | "supermarche" | "mix"
 *   @param {string} preferences.priorite       - "moins_cher" | "plus_rapide" | "plus_frais"
 *
 * @returns {Promise<{
 *   success: boolean,
 *   ingredientsCalcules: Array<{
 *     id: string,
 *     nom: string,
 *     quantite: number,
 *     unite: string,
 *     prixUnitaire: number,   // prix final par unité (MAD)
 *     prixTotal: number,      // prixUnitaire × quantite (MAD)
 *     source: string,         // "souk" | "supermarche" | "mix"
 *   }>,
 *   prixTotal: number,        // somme de tous les prixTotal (MAD)
 *   dépasseBudget: boolean,
 *   message: string
 * }>}
 */
async function calculerPrixIngredients(ingredients, preferences) {
  try {
    // ── Validation des entrées ─────────────────────────────────────────────
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
      return {
        success: false,
        ingredientsCalcules: [],
        prixTotal: 0,
        dépasseBudget: false,
        message: "La liste des ingrédients est vide ou invalide.",
      };
    }

    if (!preferences || typeof preferences !== "object") {
      return {
        success: false,
        ingredientsCalcules: [],
        prixTotal: 0,
        dépasseBudget: false,
        message: "Les préférences sont invalides ou manquantes.",
      };
    }

    const { budgetMax, sourcePreferee, priorite } = preferences;

    const sourcesValides   = ["souk", "supermarche", "mix"];
    const prioritesValides = ["moins_cher", "plus_rapide", "plus_frais"];

    if (!sourcesValides.includes(sourcePreferee)) {
      return {
        success: false,
        ingredientsCalcules: [],
        prixTotal: 0,
        dépasseBudget: false,
        message: `Source invalide : "${sourcePreferee}".`,
      };
    }
    if (!prioritesValides.includes(priorite)) {
      return {
        success: false,
        ingredientsCalcules: [],
        prixTotal: 0,
        dépasseBudget: false,
        message: `Priorité invalide : "${priorite}".`,
      };
    }

    // ── Calcul par ingrédient ──────────────────────────────────────────────
    const multSource   = MULTIPLICATEURS_SOURCE[sourcePreferee];
    const multPriorite = MULTIPLICATEURS_PRIORITE[priorite];

    const ingredientsCalcules = ingredients.map((ing) => {
      // Choix du prix brut selon la source
      let prixBrut;
      let sourceEffective = sourcePreferee;

      if (sourcePreferee === "souk") {
        // Priorité au prixSouk, fallback sur prixBase
        prixBrut = (typeof ing.prixSouk === "number" && ing.prixSouk > 0)
          ? ing.prixSouk
          : ing.prixBase * multSource;
      } else if (sourcePreferee === "supermarche") {
        // Priorité au prixSupermarche, fallback sur prixBase
        prixBrut = (typeof ing.prixSupermarche === "number" && ing.prixSupermarche > 0)
          ? ing.prixSupermarche
          : ing.prixBase * multSource;
      } else {
        // Mix : on prend le moins cher entre souk et supermarché si disponibles
        const pS  = (typeof ing.prixSouk         === "number" && ing.prixSouk > 0)
                      ? ing.prixSouk : null;
        const pSM = (typeof ing.prixSupermarche   === "number" && ing.prixSupermarche > 0)
                      ? ing.prixSupermarche : null;

        if (pS !== null && pSM !== null) {
          if (priorite === "moins_cher" || priorite === "plus_frais") {
            // moins_cher → souk ; plus_frais → supermarché (qualité emballée)
            prixBrut        = priorite === "moins_cher" ? Math.min(pS, pSM) : Math.max(pS, pSM);
            sourceEffective = priorite === "moins_cher"
              ? (pS <= pSM ? "souk" : "supermarche")
              : (pSM >= pS ? "supermarche" : "souk");
          } else {
            // plus_rapide → supermarché (stock disponible immédiatement)
            prixBrut        = pSM;
            sourceEffective = "supermarche";
          }
        } else {
          prixBrut = (pS ?? pSM ?? ing.prixBase) * multSource;
        }
      }

      // Application du multiplicateur de priorité
      const prixUnitaire = Math.round(prixBrut * multPriorite * 100) / 100;
      const prixLigne    = Math.round(prixUnitaire * ing.quantite * 100) / 100;

      return {
        id:           ing.id,
        nom:          ing.nom,
        quantite:     ing.quantite,
        unite:        ing.unite,
        prixUnitaire,
        prixTotal:    prixLigne,
        source:       sourceEffective,
      };
    });

    // ── Total et vérification budget ───────────────────────────────────────
    const prixTotal = Math.round(
      ingredientsCalcules.reduce((acc, ing) => acc + ing.prixTotal, 0) * 100
    ) / 100;

    const dépasseBudget = typeof budgetMax === "number"
      && budgetMax > 0
      && prixTotal > budgetMax;

    return {
      success: true,
      ingredientsCalcules,
      prixTotal,
      dépasseBudget,
      message: dépasseBudget
        ? `Le total (${prixTotal} MAD) dépasse votre budget maximum (${budgetMax} MAD).`
        : "",
    };

  } catch (error) {
    console.error("[clientController.calculerPrixIngredients]", error.message);
    return {
      success: false,
      ingredientsCalcules: [],
      prixTotal: 0,
      dépasseBudget: false,
      message: "Erreur lors du calcul des prix. Veuillez réessayer.",
    };
  }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  getProfil,
  sauvegarderPreferences,
  getPreferences,
  getFavoris,
  toggleFavori,
  isFavori,
  getHistorique,
  calculerPrixIngredients,
};
