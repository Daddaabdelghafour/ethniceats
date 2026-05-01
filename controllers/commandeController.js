/**
 * @file commandeController.js
 * @description Contrôleur commande — EthnicEats
 *
 * Orchestre le cycle de vie complet d'une commande :
 * création (checkout) → suivi temps réel → archivage.
 *
 * Cycle de vie :
 *   commande_passee → confirmee → en_preparation → en_livraison → arrive → livree
 *
 * Comportements automatiques pilotés par les statuts :
 *   "confirmee"   → les infos du livreur deviennent visibles chez le client
 *   "arrive"      → pop-up de notification déclenchée par la vue via callback
 *   "livree"      → commande retirée du suivi actif + archivage automatique
 *
 * Pages gérées :
 *   - client/checkout.html     → creerCommande(), calculerFraisLivraison()
 *   - client/suivi.html        → getCommandesEnCours(), ecouterStatutCommande()
 *   - client/suivi-detail.html → getDetailCommande(), ecouterStatutCommande()
 *
 * Architecture MVC stricte :
 *   - Ne manipule jamais le DOM
 *   - La synchronisation temps réel passe exclusivement par realtimeService.js
 *   - Retourne des objets résultat { success, data, message } aux vues
 *
 * Dépendances :
 *   - services/firestoreService.js
 *   - services/realtimeService.js
 *   - models/commande.js  (Commande.STATUTS, Commande.FRAIS_LIVRAISON_BASE)
 */

import {
  sauvegarderCommande,
  getCommandesClient,
  mettreAJourStatutCommande,
} from "../services/firestoreService.js";

import {
  initialiserCommandeRealtime,
  publierCommandeDisponible,
  ecouterStatutCommande  as _ecouterStatutRT,
  ecouterInfosLivreur,
  mettreAJourStatutRealtime,
  stopperEcoute,
} from "../services/realtimeService.js";

// ─── Constantes métier ────────────────────────────────────────────────────────

/**
 * Statuts valides du cycle de vie d'une commande.
 * Définis ici en attendant l'import depuis models/commande.js.
 * Doit être synchronisé avec Commande.STATUTS.
 */
const STATUTS = [
  "commande_passee",
  "confirmee",
  "en_preparation",
  "en_livraison",
  "arrive",
  "livree",
];

/** Statuts considérés comme "actifs" (affichés dans le suivi en cours) */
const STATUTS_ACTIFS = [
  "commande_passee",
  "confirmee",
  "en_preparation",
  "en_livraison",
  "arrive",
];

/** Modes de paiement acceptés */
const MODES_PAIEMENT = ["livraison", "carte"];

/**
 * Frais de livraison de base en MAD.
 * Ajustés selon les préférences dans calculerFraisLivraison().
 */
const FRAIS_LIVRAISON_BASE = 20;

/**
 * Temps de livraison estimé de base en minutes.
 * Ajusté selon les préférences dans calculerTempsEstime().
 */
const TEMPS_BASE_MINUTES = 30;

/**
 * Préfixe des IDs de commandes (ex : "ORD-1024")
 */
const PREFIXE_ID = "ORD";

// ─── Helpers privés ───────────────────────────────────────────────────────────

/**
 * Génère un identifiant de commande unique.
 * Format : ORD-XXXX (4 chiffres aléatoires + timestamp partiel pour l'unicité)
 * @returns {string}
 */
function _genererIdCommande() {
  const rand = Math.floor(1000 + Math.random() * 9000); // 1000–9999
  const ts   = Date.now().toString().slice(-4);          // 4 derniers chiffres du timestamp
  return `${PREFIXE_ID}-${rand}${ts}`;
}

/**
 * Génère les points de collecte selon les préférences du client.
 * Maximum 1–2 points selon la source choisie.
 *
 * @param {string} sourcePreferee - "souk" | "supermarche" | "mix"
 * @returns {Array<{ type: string, label: string }>}
 */
function _genererPointsCollecte(sourcePreferee) {
  switch (sourcePreferee) {
    case "souk":
      return [{ type: "souk", label: "Souk local — produits frais" }];
    case "supermarche":
      return [{ type: "supermarche", label: "Supermarché — produits emballés" }];
    case "mix":
    default:
      return [
        { type: "souk",        label: "Souk local — légumes et épices" },
        { type: "supermarche", label: "Supermarché — produits emballés" },
      ];
  }
}

// ─── creerCommande ────────────────────────────────────────────────────────────

/**
 * Crée et sauvegarde une nouvelle commande lors du checkout.
 *
 * Étapes :
 *  1. Valide les données du panier, de l'adresse et du mode de paiement.
 *  2. Génère un ID unique (#ORD-XXXX).
 *  3. Calcule les frais de livraison et le total final.
 *  4. Génère les points de collecte selon les préférences client.
 *  5. Persiste la commande dans Firestore (firestoreService).
 *  6. Initialise le nœud Realtime Database (realtimeService).
 *  7. Publie la commande dans l'index `commandesDisponibles` pour les livreurs.
 *
 * @param {string} clientId       - UID Firebase du client
 * @param {Array<Object>} panier  - Ingrédients du panier, chacun avec :
 *   { id, nom, quantite, unite, prixUnitaire, prixTotal, source }
 * @param {Object} adresse        - Adresse de livraison :
 *   { adresse, ville, telephone }
 * @param {string} modePaiement   - "livraison" | "carte"
 * @param {Object} [preferences]  - Préférences du client pour les points de collecte et temps :
 *   { budgetMax, sourcePreferee, priorite }
 *
 * @returns {Promise<{
 *   success: boolean,
 *   commandeId: string|null,
 *   commande: Object|null,
 *   message: string
 * }>}
 */
async function creerCommande(clientId, panier, adresse, modePaiement, preferences = {}) {
  try {
    // ── Validation ────────────────────────────────────────────────────────
    if (!clientId || typeof clientId !== "string") {
      return { success: false, commandeId: null, commande: null, message: "Identifiant client invalide." };
    }

    if (!Array.isArray(panier) || panier.length === 0) {
      return { success: false, commandeId: null, commande: null, message: "Le panier est vide ou invalide." };
    }

    if (!adresse || typeof adresse !== "object") {
      return { success: false, commandeId: null, commande: null, message: "Adresse de livraison invalide." };
    }
    if (!adresse.adresse || !adresse.ville || !adresse.telephone) {
      return {
        success: false, commandeId: null, commande: null,
        message: "L'adresse doit contenir le champ adresse, la ville et un numéro de téléphone.",
      };
    }

    if (!MODES_PAIEMENT.includes(modePaiement)) {
      return {
        success: false, commandeId: null, commande: null,
        message: `Mode de paiement invalide : "${modePaiement}". Choisissez "livraison" ou "carte".`,
      };
    }

    // ── Calculs financiers ─────────────────────────────────────────────────
    const sousTotal = Math.round(
      panier.reduce((acc, ing) => acc + (ing.prixTotal ?? 0), 0) * 100
    ) / 100;

    const { fraisLivraison } = await calculerFraisLivraison(adresse, preferences);
    const totalFinal = Math.round((sousTotal + fraisLivraison) * 100) / 100;

    // ── Temps estimé ───────────────────────────────────────────────────────
    const { tempsEstime } = await calculerTempsEstime(preferences);

    // ── Points de collecte ─────────────────────────────────────────────────
    const pointsCollecte = _genererPointsCollecte(preferences.sourcePreferee ?? "mix");

    // ── Construction de l'objet commande ──────────────────────────────────
    const commandeId = _genererIdCommande();

    const commande = {
      id:             commandeId,
      clientId,
      statut:         "commande_passee",
      dateCreation:   new Date().toISOString(),
      panier,
      adresseLivraison: {
        adresse:   adresse.adresse.trim(),
        ville:     adresse.ville.trim(),
        telephone: adresse.telephone.trim(),
      },
      modePaiement,
      sousTotal,
      fraisLivraison,
      prixTotal:      totalFinal,
      tempsEstime,
      pointsCollecte,
      livreurId:      "",       // rempli lors de l'acceptation par le livreur
      livreurNom:     "",
      livreurTelephone: "",
      archivee:       false,
      nbIngredients:  panier.length,
      sourcePreferee: preferences.sourcePreferee ?? "",
    };

    // ── Persistance Firestore ──────────────────────────────────────────────
    await sauvegarderCommande(commande);

    // ── Initialisation Realtime Database ──────────────────────────────────
    await initialiserCommandeRealtime(commandeId, "commande_passee");

    // ── Publication pour les livreurs ──────────────────────────────────────
    await publierCommandeDisponible(commandeId);

    return {
      success: true,
      commandeId,
      commande,
      message: "Commande créée avec succès.",
    };

  } catch (error) {
    console.error("[commandeController.creerCommande]", error.message);
    return {
      success: false,
      commandeId: null,
      commande: null,
      message: "Impossible de créer la commande. Veuillez réessayer.",
    };
  }
}

// ─── getCommandesEnCours ──────────────────────────────────────────────────────

/**
 * Récupère les commandes actives (non livrées) d'un client.
 *
 * Filtre côté contrôleur : seules les commandes dont le statut
 * appartient à STATUTS_ACTIFS sont retournées.
 * Utilisé sur client/suivi.html pour afficher la liste des commandes en cours.
 *
 * @param {string} clientId
 * @returns {Promise<{
 *   success: boolean,
 *   commandes: Array<Object>,
 *   message: string
 * }>}
 */
async function getCommandesEnCours(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      return { success: false, commandes: [], message: "Identifiant client invalide." };
    }

    const toutes = await getCommandesClient(clientId);

    const enCours = toutes.filter(c => STATUTS_ACTIFS.includes(c.statut));

    return { success: true, commandes: enCours, message: "" };

  } catch (error) {
    console.error("[commandeController.getCommandesEnCours]", error.message);
    return {
      success: false,
      commandes: [],
      message: "Impossible de charger les commandes en cours. Veuillez réessayer.",
    };
  }
}

// ─── getDetailCommande ────────────────────────────────────────────────────────

/**
 * Récupère le détail complet d'une commande depuis Firestore.
 *
 * Utilisé sur client/suivi-detail.html pour afficher :
 * ingrédients, adresse, infos livreur, timeline des statuts, etc.
 *
 * @param {string} commandeId
 * @returns {Promise<{
 *   success: boolean,
 *   commande: Object|null,
 *   message: string
 * }>}
 */
async function getDetailCommande(commandeId) {
  try {
    if (!commandeId || typeof commandeId !== "string") {
      return { success: false, commande: null, message: "Identifiant commande invalide." };
    }

    // Récupération via la collection commandes (pas de getCommande directe dans firestoreService,
    // on recharge toutes les commandes et on filtre — ou on utilise sauvegarderCommande en lecture)
    // On passe par une requête ciblée via getCommandesClient n'est pas adapté ici.
    // → Import dynamique de doc/getDoc pour cibler directement le document.
    const { db } = await import("../services/firebase.js");
    const { doc, getDoc } = await import(
      "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js"
    );

    const snap = await getDoc(doc(db, "commandes", commandeId));

    if (!snap.exists()) {
      return { success: false, commande: null, message: "Commande introuvable." };
    }

    const commande = { id: snap.id, ...snap.data() };

    return { success: true, commande, message: "" };

  } catch (error) {
    console.error("[commandeController.getDetailCommande]", error.message);
    return {
      success: false,
      commande: null,
      message: "Impossible de charger la commande. Veuillez réessayer.",
    };
  }
}

// ─── ecouterStatutCommande ────────────────────────────────────────────────────

/**
 * Écoute en temps réel les changements de statut d'une commande (côté client).
 *
 * Gère automatiquement les comportements liés aux statuts :
 *   - "confirmee"  → déclenche onLivreurAssigne(commandeId) si fourni
 *   - "arrive"     → signale à la vue d'afficher la pop-up notification
 *   - "livree"     → archive la commande et arrête l'écoute
 *
 * @param {string}   commandeId        - ID de la commande à surveiller
 * @param {Function} onStatutChange    - callback principal :
 *                                       onStatutChange(statut: string, erreur?: Error)
 * @param {Object}   [options]         - callbacks optionnels pour les événements clés
 *   @param {Function} [options.onConfirmee]  - appelé quand statut === "confirmee"
 *   @param {Function} [options.onArrive]     - appelé quand statut === "arrive"
 *   @param {Function} [options.onLivree]     - appelé quand statut === "livree" (après archivage)
 *
 * @returns {Promise<{
 *   success: boolean,
 *   stopperEcoute: Function,  // appeler pour arrêter le listener
 *   message: string
 * }>}
 */
async function ecouterStatutCommande(commandeId, onStatutChange, options = {}) {
  try {
    if (!commandeId || typeof commandeId !== "string") {
      return { success: false, stopperEcoute: () => {}, message: "Identifiant commande invalide." };
    }
    if (typeof onStatutChange !== "function") {
      return { success: false, stopperEcoute: () => {}, message: "Le callback onStatutChange est requis." };
    }

    const { onConfirmee, onArrive, onLivree } = options;
    let   référenceActive = null;

    référenceActive = _ecouterStatutRT(commandeId, async (statut, erreur) => {
      if (erreur) {
        onStatutChange(null, erreur);
        return;
      }

      // Appel du callback principal
      onStatutChange(statut, null);

      // ── Comportements automatiques selon le statut ─────────────────────

      if (statut === "confirmee" && typeof onConfirmee === "function") {
        // Infos du livreur maintenant disponibles
        onConfirmee(commandeId);
      }

      if (statut === "arrive" && typeof onArrive === "function") {
        // Déclenche la pop-up "Livreur arrivé" dans la vue
        onArrive(commandeId);
      }

      if (statut === "livree") {
        // Archivage automatique (Firestore : archivee: true + statut final)
        await archiverCommande(commandeId);

        // Callback vue pour retirer la commande du suivi
        if (typeof onLivree === "function") {
          onLivree(commandeId);
        }

        // Arrêt propre du listener — la commande est terminée
        if (référenceActive) {
          stopperEcoute(référenceActive);
          référenceActive = null;
        }
      }
    });

    return {
      success: true,
      stopperEcoute: () => {
        if (référenceActive) {
          stopperEcoute(référenceActive);
          référenceActive = null;
        }
      },
      message: "",
    };

  } catch (error) {
    console.error("[commandeController.ecouterStatutCommande]", error.message);
    return {
      success: false,
      stopperEcoute: () => {},
      message: "Impossible de démarrer l'écoute du statut. Veuillez réessayer.",
    };
  }
}

// ─── calculerTempsEstime ──────────────────────────────────────────────────────

/**
 * Calcule le temps de livraison estimé en minutes.
 *
 * Base : 30 minutes.
 * Ajustements selon la priorité :
 *   - "plus_rapide" → réduit le temps (-8 min) : fourchette 22–35 min
 *   - "moins_cher"  → délai standard            : fourchette 30–45 min
 *   - "plus_frais"  → légère augmentation (+5 min, collecte souk) : fourchette 35–50 min
 *
 * @param {Object} [preferences]
 *   @param {string} [preferences.priorite] - "moins_cher" | "plus_rapide" | "plus_frais"
 * @returns {Promise<{
 *   success: boolean,
 *   tempsEstime: number,        // minutes (valeur médiane)
 *   fourchette: string,         // ex : "30–45 min"
 *   message: string
 * }>}
 */
async function calculerTempsEstime(preferences = {}) {
  try {
    const { priorite = "moins_cher" } = preferences;

    let tempsMin, tempsMax;

    switch (priorite) {
      case "plus_rapide":
        tempsMin = 22;
        tempsMax = 35;
        break;
      case "plus_frais":
        tempsMin = 35;
        tempsMax = 50;
        break;
      case "moins_cher":
      default:
        tempsMin = 30;
        tempsMax = 45;
        break;
    }

    const tempsEstime = Math.round((tempsMin + tempsMax) / 2);
    const fourchette  = `${tempsMin}–${tempsMax} min`;

    return { success: true, tempsEstime, fourchette, message: "" };

  } catch (error) {
    console.error("[commandeController.calculerTempsEstime]", error.message);
    return {
      success: false,
      tempsEstime: TEMPS_BASE_MINUTES,
      fourchette: "30–45 min",
      message: "Erreur lors du calcul du temps estimé.",
    };
  }
}

// ─── calculerFraisLivraison ───────────────────────────────────────────────────

/**
 * Calcule les frais de livraison selon l'adresse et les préférences client.
 *
 * Base : 20 MAD.
 * Ajustements :
 *   - "plus_rapide" → +10 MAD (service express)
 *   - "moins_cher"  → -5 MAD  (livraison économique)
 *   - "plus_frais"  → +5 MAD  (priorité qualité, collecte souk)
 *   - source "mix"  → +5 MAD  (deux points de collecte)
 *
 * L'adresse est utilisée pour déterminer la zone (ville) mais le calcul
 * exact de distance n'est pas implémenté côté frontend (aucune API Maps).
 *
 * @param {Object} adresse
 *   @param {string} adresse.ville
 * @param {Object} [preferences]
 *   @param {string} [preferences.priorite]       - "moins_cher" | "plus_rapide" | "plus_frais"
 *   @param {string} [preferences.sourcePreferee] - "souk" | "supermarche" | "mix"
 * @returns {Promise<{
 *   success: boolean,
 *   fraisLivraison: number,   // MAD
 *   message: string
 * }>}
 */
async function calculerFraisLivraison(adresse, preferences = {}) {
  try {
    const { priorite = "moins_cher", sourcePreferee = "mix" } = preferences;

    let frais = FRAIS_LIVRAISON_BASE;

    // Ajustement selon la priorité
    switch (priorite) {
      case "plus_rapide":
        frais += 10;
        break;
      case "moins_cher":
        frais -= 5;
        break;
      case "plus_frais":
        frais += 5;
        break;
    }

    // Supplément si deux points de collecte (source "mix")
    if (sourcePreferee === "mix") {
      frais += 5;
    }

    // Garantir un minimum de 5 MAD
    frais = Math.max(5, frais);

    return { success: true, fraisLivraison: frais, message: "" };

  } catch (error) {
    console.error("[commandeController.calculerFraisLivraison]", error.message);
    return {
      success: false,
      fraisLivraison: FRAIS_LIVRAISON_BASE,
      message: "Erreur lors du calcul des frais de livraison.",
    };
  }
}

// ─── archiverCommande ─────────────────────────────────────────────────────────

/**
 * Archive une commande livrée dans Firestore.
 *
 * Appelé automatiquement par ecouterStatutCommande() quand le statut
 * atteint "livree", mais peut aussi être appelé manuellement si nécessaire.
 *
 * Actions :
 *  - Met le statut à "livree" dans Firestore (si pas déjà fait)
 *  - Active le flag archivee: true
 *  - La commande disparaît de getCommandesEnCours() et apparaît dans getHistorique()
 *
 * @param {string} commandeId
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function archiverCommande(commandeId) {
  try {
    if (!commandeId || typeof commandeId !== "string") {
      return { success: false, message: "Identifiant commande invalide." };
    }

    // Mise à jour Firestore : statut "livree" + archivee: true
    // mettreAJourStatutCommande gère automatiquement archivee: true quand statut === "livree"
    await mettreAJourStatutCommande(commandeId, "livree");

    return { success: true, message: "Commande archivée avec succès." };

  } catch (error) {
    console.error("[commandeController.archiverCommande]", error.message);
    return {
      success: false,
      message: "Impossible d'archiver la commande. Veuillez réessayer.",
    };
  }
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export {
  creerCommande,
  getCommandesEnCours,
  getDetailCommande,
  ecouterStatutCommande,
  calculerTempsEstime,
  calculerFraisLivraison,
  archiverCommande,
};
