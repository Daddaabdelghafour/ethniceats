// ============================================================
//  EthnicEats — controllers/panierController.js
//  Contrôleur Panier — Architecture MVC
//
//  Responsabilités :
//    - Initialisation du panier depuis une recette + préférences client
//    - Persistance temporaire dans localStorage
//    - Modification / suppression des ingrédients
//    - Calcul des prix selon les préférences (souk / supermarche / mix)
//    - Préparation des données pour la page checkout
//
//  ⚠️  Ce contrôleur ne manipule JAMAIS le DOM.
//      Le panier est stocké dans localStorage — jamais dans Firestore.
//      Les prix proviennent toujours de data/recettes.js.
// ============================================================

/** Clé utilisée pour la persistance localStorage */
const PANIER_KEY = 'ethniceats_panier';

// ─────────────────────────────────────────────────────────────
//  FRAIS DE LIVRAISON
// ─────────────────────────────────────────────────────────────

/**
 * Calcule les frais de livraison selon la source préférée du client.
 * - souk        → 15 MAD
 * - supermarche → 20 MAD
 * - mix         → 17 MAD  (intermédiaire)
 *
 * @param {string} sourcePreferee
 * @returns {number}
 */
function _fraisLivraison(sourcePreferee) {
  const tarifs = { souk: 15, supermarche: 20, mix: 17 };
  return tarifs[sourcePreferee] ?? 20;
}

// ─────────────────────────────────────────────────────────────
//  CALCUL DU PRIX D'UN INGRÉDIENT
// ─────────────────────────────────────────────────────────────

/**
 * Retourne le prix unitaire d'un ingrédient selon la source préférée du client.
 *  - "souk"        → ing.prixSouk
 *  - "supermarche" → ing.prixSupermarche
 *  - "mix"         → moyenne arrondie à 2 décimales
 *
 * @param {Object} ing            - ingrédient issu de data/recettes.js
 * @param {string} sourcePreferee - "souk" | "supermarche" | "mix"
 * @returns {number}
 */
function _prixUnitaire(ing, sourcePreferee) {
  // IMPORTANT:
  // - Dans data/recettes.js, `prix*` est un prix "ligne" pour la quantité de la recette,
  //   pas un prix par gramme/ml.
  // - On convertit donc en prix UNITAIRE (par unité de `unite`) pour les ingrédients flexibles.

  let prixLigne;
  if (sourcePreferee === 'souk') prixLigne = ing.prixSouk ?? ing.prixBase ?? ing.prix;
  else if (sourcePreferee === 'supermarche') prixLigne = ing.prixSupermarche ?? ing.prixBase ?? ing.prix;
  else {
    const a = ing.prixSouk ?? ing.prixBase ?? ing.prix ?? 0;
    const b = ing.prixSupermarche ?? ing.prixBase ?? ing.prix ?? 0;
    prixLigne = (a + b) / 2;
  }

  const prixLigneNum = Number(prixLigne ?? 0) || 0;

  // Packs : on considère `prixLigne` comme prix par pack
  if (ing.type === 'pack') return Math.round(prixLigneNum * 100) / 100;

  // Flexible : prix unitaire = prixLigne / quantiteRecette (base)
  const qteBase = Number(ing.quantiteRecette ?? 0) || 0;
  if (qteBase <= 0) return 0;
  const pu = prixLigneNum / qteBase;
  return Math.round(pu * 100000) / 100000;
}

/**
 * Calcule le prix total d'un ingrédient en tenant compte du type de vente.
 *  - "pack"     → arrondi au pack supérieur × prix
 *  - "flexible" → quantité × prix
 *
 * @param {Object} ing - ingrédient avec quantiteRecette, type, prix, quantitePanier
 * @returns {number} arrondi à 2 décimales
 */
function _prixTotalIngredient(ing) {
  const prix = ing.prixUnitaire ?? ing.prix ?? 0;

  if (ing.type === 'pack') {
    // quantitePanier représente déjà le nombre de packs nécessaires
    return Math.round((ing.quantitePanier ?? 1) * prix * 100) / 100;
  }

  // flexible : quantité × prix
  const quantite = ing.quantiteRecette ?? ing.quantite ?? 0;
  return Math.round(quantite * prix * 100) / 100;
}

// ─────────────────────────────────────────────────────────────
//  INITIALISATION
// ─────────────────────────────────────────────────────────────

/**
 * Crée un nouveau panier depuis une recette avec les quantités et les prix
 * calculés selon les préférences du client, puis le sauvegarde dans localStorage.
 *
 * @param {Object} recette     - objet recette complet issu de data/recettes.js
 * @param {number} nbPortions  - nombre de portions choisi (entier ≥ 1)
 * @param {Object} preferences - { sourcePreferee, priorite, budgetMax }
 * @returns {Promise<Object>}  objet panier prêt à l'emploi
 */
export async function initialiserPanier(recette, nbPortions, preferences) {
  try {
    if (!recette || typeof recette !== 'object') {
      throw new Error('initialiserPanier : recette invalide.');
    }
    if (!Number.isInteger(nbPortions) || nbPortions < 1) {
      throw new Error('initialiserPanier : nbPortions doit être un entier ≥ 1.');
    }
    if (!preferences || typeof preferences !== 'object') {
      throw new Error('initialiserPanier : preferences invalides.');
    }

    const { sourcePreferee = 'supermarche' } = preferences;
    const portionsBase = Math.max(1, Number(recette.portions) || 4);
    const ratio        = nbPortions / portionsBase;

    const ingredients = (recette.ingredients ?? []).map(ing => {
      const prixUnitaire   = _prixUnitaire(ing, sourcePreferee);
      const baseQte = Number(ing.quantiteRecette ?? 0) || 0;
      const quantiteRecette = Math.round(baseQte * ratio * 1000) / 1000;

      let quantitePanier;
      if (ing.type === 'pack') {
        // Arrondir au pack supérieur
        const packsBase  = Number(ing.quantitePanier ?? 1) || 1;
        quantitePanier   = Math.ceil(packsBase * ratio);
      } else {
        quantitePanier = quantiteRecette;
      }

      const ingAjuste = {
        nom:            ing.nom,
        image:          ing.image ?? '',
        unite:          ing.unite,
        type:           ing.type,
        icone:          ing.icone ?? '',
        formatVente:    ing.formatVente ?? null,
        unitePanier:    ing.unitePanier ?? ing.unite,
        quantiteRecette,
        quantitePanier,
        prixUnitaire,
        // Prix bruts conservés pour recalcul éventuel
        prixSouk:       ing.prixSouk ?? ing.prixBase,
        prixSupermarche: ing.prixSupermarche ?? ing.prixBase,
        prixBase:       ing.prixBase ?? ing.prix,
      };

      ingAjuste.prixTotal = _prixTotalIngredient(ingAjuste);
      return ingAjuste;
    });

    const sousTotal      = ingredients.reduce((acc, i) => acc + i.prixTotal, 0);
    const fraisLivraison = _fraisLivraison(sourcePreferee);
    const total          = Math.round((sousTotal + fraisLivraison) * 100) / 100;

    const panier = {
      recetteId:    recette.id,
      recetteTitre: recette.titre,
      nbPortions,
      preferences: {
        sourcePreferee,
        priorite:   preferences.priorite   ?? '',
        budgetMax:  preferences.budgetMax  ?? 0,
      },
      ingredients,
      sousTotal:      Math.round(sousTotal * 100) / 100,
      fraisLivraison,
      total,
      creeLe:         new Date().toISOString(),
    };

    await sauvegarderPanier(panier);
    return panier;

  } catch (error) {
    console.error('[panierController] initialiserPanier :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  LECTURE / ÉCRITURE localStorage
// ─────────────────────────────────────────────────────────────

/**
 * Récupère le panier actuel depuis localStorage.
 *
 * @returns {Promise<Object|null>} objet panier ou null si absent
 */
export async function getPanier() {
  try {
    const raw = localStorage.getItem(PANIER_KEY);
    if (raw) return JSON.parse(raw);

    // Migration legacy : certaines anciennes pages enregistraient le panier
    // sous la clé "panier" avec un format différent (liste d'objets recette).
    const legacyRaw = localStorage.getItem('panier');
    if (!legacyRaw) return null;

    const legacy = JSON.parse(legacyRaw);
    if (!Array.isArray(legacy) || legacy.length === 0) return null;

    // On convertit le premier item (comportement historique : 1 recette à la fois).
    const item = legacy[0];
    if (!item || typeof item !== 'object') return null;

    const nbPortions = Math.max(1, Number(item.portions) || 1);
    const ingredients = Array.isArray(item.ingredients) ? item.ingredients : [];

    const panierMigré = {
      recetteId: item.recetteId ?? null,
      recetteTitre: item.titre ?? item.recetteTitre ?? 'Recette',
      nbPortions,
      preferences: { sourcePreferee: 'mix', priorite: '', budgetMax: 0 },
      ingredients: ingredients.map(ing => {
        const type = ing.type;
        const legacyQtePanier = Number(ing.quantitePanier ?? NaN);
        const legacyQteRecette = Number(ing.quantiteRecette ?? NaN);
        const legacyQte = Number(ing.quantite ?? NaN);

        // Ancien format recette-detail : quantitePanier = quantité ajustée (pour les flexibles).
        let quantiteRecette;
        if (type === 'flexible' && Number.isFinite(legacyQtePanier)) quantiteRecette = legacyQtePanier;
        else if (Number.isFinite(legacyQteRecette)) quantiteRecette = legacyQteRecette;
        else if (Number.isFinite(legacyQtePanier)) quantiteRecette = legacyQtePanier;
        else if (Number.isFinite(legacyQte)) quantiteRecette = legacyQte;
        else quantiteRecette = 0;

        let quantitePanier;
        if (type === 'pack') {
          // Ancien format ne stockait pas bien les packs, on sécurise au minimum.
          quantitePanier = Math.max(1, Math.ceil(Number.isFinite(legacyQtePanier) ? legacyQtePanier : 1));
        } else {
          quantitePanier = quantiteRecette;
        }

        // Ancien format: `prix` était souvent un prix "ligne" déjà ajusté par ratio.
        // On reconstruit un prix unitaire cohérent pour le panier.
        const legacyPrixLigne = Number(ing.prix ?? 0) || 0;
        let prixUnitaire;
        if (type === 'pack') {
          // On suppose prixLigne par pack (ou réparti sur nb de packs si > 1)
          const packs = Math.max(1, quantitePanier);
          prixUnitaire = legacyPrixLigne / packs;
        } else {
          const denom = (Number(quantiteRecette) || 0);
          prixUnitaire = denom > 0 ? (legacyPrixLigne / denom) : 0;
        }

        return {
          nom: ing.nom,
          image: ing.image ?? '',
          unite: ing.unite,
          type,
          icone: ing.icone ?? '',
          formatVente: ing.formatVente ?? null,
          unitePanier: ing.unitePanier ?? ing.unite,
          quantiteRecette,
          quantitePanier,
          prixUnitaire: Math.round((Number(ing.prixUnitaire ?? prixUnitaire ?? 0) || 0) * 100000) / 100000,
          prixSouk: Number(ing.prixSouk ?? ing.prix ?? 0) || 0,
          prixSupermarche: Number(ing.prixSupermarche ?? ing.prix ?? 0) || 0,
          prixBase: Number(ing.prixBase ?? ing.prix ?? 0) || 0,
        };
      }),
      sousTotal: 0,
      fraisLivraison: 0,
      total: 0,
      creeLe: new Date().toISOString(),
    };

    // Persiste sous le nouveau format, et conserve l'ancien pour compat.
    await sauvegarderPanier(panierMigré);
    return panierMigré;
  } catch (error) {
    console.error('[panierController] getPanier :', error);
    throw error;
  }
}

/**
 * Sauvegarde le panier dans localStorage.
 *
 * @param {Object} panier - objet panier complet
 * @returns {Promise<void>}
 */
export async function sauvegarderPanier(panier) {
  try {
    if (!panier || typeof panier !== 'object') {
      throw new Error('sauvegarderPanier : panier invalide.');
    }
    localStorage.setItem(PANIER_KEY, JSON.stringify(panier));
  } catch (error) {
    console.error('[panierController] sauvegarderPanier :', error);
    throw error;
  }
}

/**
 * Vide le panier et le supprime de localStorage.
 *
 * @returns {Promise<void>}
 */
export async function viderPanier() {
  try {
    localStorage.removeItem(PANIER_KEY);
  } catch (error) {
    console.error('[panierController] viderPanier :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  MODIFICATION DU PANIER
// ─────────────────────────────────────────────────────────────

/**
 * Modifie la quantité d'un ingrédient flexible dans le panier.
 * Seuls les ingrédients de type "flexible" peuvent être modifiés.
 * Recalcule le prixTotal de l'ingrédient, le sousTotal et le total.
 *
 * @param {string} ingredientNom    - nom exact de l'ingrédient à modifier
 * @param {number} nouvelleQuantite - nouvelle quantité (nombre > 0)
 * @returns {Promise<Object>} panier mis à jour
 */
export async function modifierQuantite(ingredientNom, nouvelleQuantite) {
  try {
    if (!ingredientNom || typeof ingredientNom !== 'string') {
      throw new Error('modifierQuantite : ingredientNom invalide.');
    }
    if (typeof nouvelleQuantite !== 'number' || nouvelleQuantite <= 0) {
      throw new Error('modifierQuantite : nouvelleQuantite doit être un nombre > 0.');
    }

    const panier = await getPanier();
    if (!panier) throw new Error('modifierQuantite : aucun panier en cours.');

    const index = panier.ingredients.findIndex(i => i.nom === ingredientNom);
    if (index === -1) throw new Error(`modifierQuantite : ingrédient "${ingredientNom}" introuvable.`);

    const ing = panier.ingredients[index];

    if (ing.type !== 'flexible') {
      throw new Error(`modifierQuantite : "${ingredientNom}" est un pack — quantité non modifiable.`);
    }

    ing.quantiteRecette = Math.round(nouvelleQuantite * 1000) / 1000;
    ing.quantitePanier  = ing.quantiteRecette;
    ing.prixTotal       = Math.round(ing.quantiteRecette * ing.prixUnitaire * 100) / 100;

    panier.ingredients[index] = ing;

    // Recalcul des totaux
    const { sousTotal, total } = _recalculerTotaux(panier);
    panier.sousTotal = sousTotal;
    panier.total     = total;

    await sauvegarderPanier(panier);
    return panier;

  } catch (error) {
    console.error('[panierController] modifierQuantite :', error);
    throw error;
  }
}

/**
 * Supprime un ingrédient du panier par son nom.
 * Recalcule les totaux après suppression.
 *
 * @param {string} ingredientNom - nom exact de l'ingrédient à supprimer
 * @returns {Promise<Object>} panier mis à jour
 */
export async function supprimerIngredient(ingredientNom) {
  try {
    if (!ingredientNom || typeof ingredientNom !== 'string') {
      throw new Error('supprimerIngredient : ingredientNom invalide.');
    }

    const panier = await getPanier();
    if (!panier) throw new Error('supprimerIngredient : aucun panier en cours.');

    const avant = panier.ingredients.length;
    panier.ingredients = panier.ingredients.filter(i => i.nom !== ingredientNom);

    if (panier.ingredients.length === avant) {
      throw new Error(`supprimerIngredient : ingrédient "${ingredientNom}" introuvable.`);
    }

    const { sousTotal, total } = _recalculerTotaux(panier);
    panier.sousTotal = sousTotal;
    panier.total     = total;

    await sauvegarderPanier(panier);
    return panier;

  } catch (error) {
    console.error('[panierController] supprimerIngredient :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  CALCUL DES PRIX
// ─────────────────────────────────────────────────────────────

/**
 * Calcule le sous-total du panier selon les préférences client.
 * Les prix sont relus depuis les champs prixSouk / prixSupermarche de chaque ingrédient.
 *
 * @param {Object} panier      - objet panier (issu de getPanier)
 * @param {Object} preferences - { sourcePreferee, priorite, budgetMax }
 * @returns {Promise<number>} sous-total en MAD, arrondi à 2 décimales
 */
export async function calculerSousTotal(panier, preferences) {
  try {
    if (!panier || typeof panier !== 'object') {
      throw new Error('calculerSousTotal : panier invalide.');
    }
    if (!preferences || typeof preferences !== 'object') {
      throw new Error('calculerSousTotal : preferences invalides.');
    }

    const { sourcePreferee = 'supermarche' } = preferences;

    const sousTotal = panier.ingredients.reduce((acc, ing) => {
      const prixUnit = _prixUnitaire(ing, sourcePreferee);
      let prix;

      if (ing.type === 'pack') {
        prix = (ing.quantitePanier ?? 1) * prixUnit;
      } else {
        prix = (ing.quantiteRecette ?? 0) * prixUnit;
      }

      return acc + prix;
    }, 0);

    return Math.round(sousTotal * 100) / 100;

  } catch (error) {
    console.error('[panierController] calculerSousTotal :', error);
    throw error;
  }
}

/**
 * Calcule le total final (sous-total + frais de livraison).
 *
 * @param {number} sousTotal       - sous-total des ingrédients en MAD
 * @param {number} fraisLivraison  - frais de livraison en MAD
 * @returns {Promise<number>} total en MAD, arrondi à 2 décimales
 */
export async function calculerTotal(sousTotal, fraisLivraison) {
  try {
    if (typeof sousTotal !== 'number' || sousTotal < 0) {
      throw new Error('calculerTotal : sousTotal invalide.');
    }
    if (typeof fraisLivraison !== 'number' || fraisLivraison < 0) {
      throw new Error('calculerTotal : fraisLivraison invalide.');
    }
    return Math.round((sousTotal + fraisLivraison) * 100) / 100;
  } catch (error) {
    console.error('[panierController] calculerTotal :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  CHECKOUT
// ─────────────────────────────────────────────────────────────

/**
 * Prépare et retourne les données du panier pour la page checkout.html.
 * Retourne null si le panier est vide ou absent.
 *
 * Structure retournée :
 * {
 *   recetteId, recetteTitre, nbPortions,
 *   ingredients: [...],
 *   sousTotal, fraisLivraison, total,
 *   preferences: { sourcePreferee, priorite, budgetMax },
 *   creeLe,
 * }
 *
 * @returns {Promise<Object|null>}
 */
export async function getPanierPourCheckout() {
  try {
    const panier = await getPanier();
    if (!panier || !panier.ingredients || panier.ingredients.length === 0) {
      return null;
    }

    // Snapshot propre pour le checkout — pas de mutation du panier en cours
    return {
      recetteId:    panier.recetteId,
      recetteTitre: panier.recetteTitre,
      nbPortions:   panier.nbPortions,
      ingredients:  panier.ingredients.map(ing => ({ ...ing })),
      sousTotal:    panier.sousTotal,
      fraisLivraison: panier.fraisLivraison,
      total:        panier.total,
      preferences:  { ...panier.preferences },
      creeLe:       panier.creeLe,
    };

  } catch (error) {
    console.error('[panierController] getPanierPourCheckout :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  UTILITAIRES PRIVÉS
// ─────────────────────────────────────────────────────────────

/**
 * Recalcule sousTotal et total à partir des ingrédients actuels du panier.
 *
 * @param {Object} panier
 * @returns {{ sousTotal: number, total: number }}
 */
function _recalculerTotaux(panier) {
  const sousTotal = panier.ingredients.reduce((acc, i) => acc + (i.prixTotal ?? 0), 0);
  const stArrondi = Math.round(sousTotal * 100) / 100;
  const total     = Math.round((stArrondi + (panier.fraisLivraison ?? 0)) * 100) / 100;
  return { sousTotal: stArrondi, total };
}
