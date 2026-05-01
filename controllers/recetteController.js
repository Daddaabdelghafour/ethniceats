// ============================================================
//  EthnicEats — controllers/recetteController.js
//  Contrôleur Recette — Architecture MVC
//
//  Responsabilités :
//    - Accès aux données locales (data/recettes.js)
//    - Filtrage / recherche des recettes
//    - Calcul des quantités selon les portions
//    - Gestion des favoris via Firestore (firestoreService.js)
//
//  ⚠️  Ce contrôleur ne manipule JAMAIS le DOM.
//      Les recettes proviennent toujours de data/recettes.js —
//      jamais directement de Firestore.
// ============================================================

import { RECETTES }          from '../data/recettes.js';
import {
  ajouterFavori,
  supprimerFavori,
  getFavoris,
} from '../services/firestoreService.js';

// ─────────────────────────────────────────────────────────────
//  LECTURE GLOBALE
// ─────────────────────────────────────────────────────────────

/**
 * Retourne toutes les recettes disponibles dans data/recettes.js.
 *
 * @returns {Promise<Array<Object>>} tableau de toutes les recettes
 */
export async function getAllRecettes() {
  try {
    return RECETTES;
  } catch (error) {
    console.error('[recetteController] getAllRecettes :', error);
    throw error;
  }
}

/**
 * Retourne une recette complète par son identifiant.
 *
 * @param {string} id - identifiant unique de la recette (ex : "couscous-marocain")
 * @returns {Promise<Object|null>} objet recette ou null si introuvable
 */
export async function getRecetteById(id) {
  try {
    if (!id || typeof id !== 'string') {
      throw new Error('getRecetteById : id invalide.');
    }

    const recette = RECETTES.find(r => r.id === id) ?? null;
    return recette;
  } catch (error) {
    console.error('[recetteController] getRecetteById :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  FILTRAGE PAR CATÉGORIE
// ─────────────────────────────────────────────────────────────

/**
 * Retourne toutes les recettes d'une catégorie principale.
 * La comparaison est insensible à la casse.
 * Pour la catégorie "Asiatique", retourne toutes les sous-catégories.
 *
 * Catégories valides : Marocain, Italien, Mexicain, Espagnol, Français, Asiatique
 *
 * @param {string} categorie - nom de la catégorie principale
 * @returns {Promise<Array<Object>>}
 */
export async function getRecettesParCategorie(categorie) {
  try {
    if (!categorie || typeof categorie !== 'string') {
      throw new Error('getRecettesParCategorie : categorie invalide.');
    }

    const cat = categorie.trim().toLowerCase();

    const recettes = RECETTES.filter(r => {
      // Pour "asiatique" on inclut toutes les sous-catégories
      if (cat === 'asiatique') {
        return r.categorie.toLowerCase() === 'asiatique' ||
               r.categorie.toLowerCase().startsWith('asiatique/');
      }
      return r.categorie.toLowerCase() === cat;
    });

    return recettes;
  } catch (error) {
    console.error('[recetteController] getRecettesParCategorie :', error);
    throw error;
  }
}

/**
 * Retourne toutes les recettes d'une sous-catégorie asiatique.
 * La comparaison est insensible à la casse.
 *
 * Sous-catégories valides : japonais, chinois, coréen, vietnamien, indien
 *
 * @param {string} sousCategorie - ex : "japonais", "coréen"
 * @returns {Promise<Array<Object>>}
 */
export async function getRecettesParSousCategorie(sousCategorie) {
  try {
    if (!sousCategorie || typeof sousCategorie !== 'string') {
      throw new Error('getRecettesParSousCategorie : sousCategorie invalide.');
    }

    const sc = sousCategorie.trim().toLowerCase();

    // Les recettes asiatiques sont stockées avec categorie "Asiatique"
    // et sousCategorie distincte (ex : "Japonais")
    const recettes = RECETTES.filter(r => {
      if (!r.sousCategorie) return false;
      return r.sousCategorie.toLowerCase() === sc;
    });

    return recettes;
  } catch (error) {
    console.error('[recetteController] getRecettesParSousCategorie :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  RECETTES POPULAIRES
// ─────────────────────────────────────────────────────────────

/**
 * Retourne les recettes populaires d'une catégorie donnée.
 * Si aucune catégorie n'est fournie, retourne toutes les recettes populaires.
 *
 * Règles métier :
 *  - Chaque catégorie principale a exactement 3 recettes populaires.
 *  - La catégorie "Asiatique" en a 5 (1 par sous-catégorie).
 *  - Chaque sous-catégorie asiatique en a exactement 2.
 *
 * @param {string} [categorie] - catégorie principale (optionnel)
 * @returns {Promise<Array<Object>>}
 */
export async function getRecettesPopulaires(categorie) {
  try {
    let recettes = RECETTES.filter(r => r.populaire === true);

    if (categorie) {
      const cat = categorie.trim().toLowerCase();

      recettes = recettes.filter(r => {
        if (cat === 'asiatique') {
          return r.categorie.toLowerCase() === 'asiatique' ||
                 r.categorie.toLowerCase().startsWith('asiatique/');
        }
        return r.categorie.toLowerCase() === cat;
      });
    }

    return recettes;
  } catch (error) {
    console.error('[recetteController] getRecettesPopulaires :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  RECHERCHE
// ─────────────────────────────────────────────────────────────

/**
 * Recherche des recettes par nom de recette ou par nom d'ingrédient.
 * La recherche est insensible à la casse et aux accents.
 *
 * @param {string} query - terme de recherche (min 1 caractère)
 * @returns {Promise<Array<Object>>} tableau de recettes correspondantes (sans doublons)
 */
export async function rechercherRecettes(query) {
  try {
    if (!query || typeof query !== 'string' || query.trim().length < 1) {
      throw new Error('rechercherRecettes : query invalide (minimum 1 caractère).');
    }

    const terme = _normaliser(query.trim());

    const recettes = RECETTES.filter(r => {
      // Correspondance par titre de recette
      if (_normaliser(r.titre).includes(terme)) return true;

      // Correspondance par nom d'ingrédient
      if (Array.isArray(r.ingredients)) {
        return r.ingredients.some(ing => _normaliser(ing.nom).includes(terme));
      }

      return false;
    });

    return recettes;
  } catch (error) {
    console.error('[recetteController] rechercherRecettes :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  CALCUL DES PORTIONS
// ─────────────────────────────────────────────────────────────

/**
 * Retourne une copie de la recette avec les quantités d'ingrédients
 * recalculées selon le nombre de portions demandé.
 *
 * Les quantités de base dans recettes.js correspondent à recette.portions.
 * Le recalcul est : quantiteAjustee = quantiteRecette * nbPortions / portionsBase
 *
 * @param {Object} recette    - objet recette complet issu de RECETTES
 * @param {number} nbPortions - nombre de portions souhaité (entier ≥ 1)
 * @returns {Promise<Object>} recette avec ingrédients recalculés
 */
export async function calculerQuantitesPortions(recette, nbPortions) {
  try {
    if (!recette || typeof recette !== 'object') {
      throw new Error('calculerQuantitesPortions : recette invalide.');
    }
    if (!Number.isInteger(nbPortions) || nbPortions < 1) {
      throw new Error('calculerQuantitesPortions : nbPortions doit être un entier ≥ 1.');
    }

    const portionsBase = recette.portions ?? 1;

    const ingredientsAjustes = (recette.ingredients ?? []).map(ing => {
      const ratio            = nbPortions / portionsBase;
      const quantiteAjustee  = Math.round(ing.quantiteRecette * ratio * 1000) / 1000;

      // Pour les ingrédients vendus au pack, recalculer le nombre de packs
      let quantitePanier = quantiteAjustee;
      if (ing.type === 'pack' && ing.quantiteRecette > 0) {
        const packsBase    = ing.quantitePanier;   // packs pour portionsBase portions
        quantitePanier     = Math.ceil(packsBase * ratio);
      }

      return {
        ...ing,
        quantiteRecette: quantiteAjustee,
        quantitePanier,
      };
    });

    return {
      ...recette,
      portions:    nbPortions,
      ingredients: ingredientsAjustes,
    };
  } catch (error) {
    console.error('[recetteController] calculerQuantitesPortions :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  FAVORIS
// ─────────────────────────────────────────────────────────────

/**
 * Ajoute ou retire une recette des favoris d'un client dans Firestore.
 * Si la recette est déjà en favori → elle est retirée.
 * Sinon → elle est ajoutée.
 *
 * @param {string} clientId  - UID Firebase du client
 * @param {string} recetteId - identifiant de la recette
 * @returns {Promise<boolean>} true si ajouté, false si retiré
 */
export async function toggleFavori(clientId, recetteId) {
  try {
    if (!clientId  || typeof clientId  !== 'string') throw new Error('toggleFavori : clientId invalide.');
    if (!recetteId || typeof recetteId !== 'string') throw new Error('toggleFavori : recetteId invalide.');

    const favoriExistant = await isFavori(clientId, recetteId);

    if (favoriExistant) {
      await supprimerFavori(clientId, recetteId);
      return false; // retiré
    } else {
      await ajouterFavori(clientId, recetteId);
      return true;  // ajouté
    }
  } catch (error) {
    console.error('[recetteController] toggleFavori :', error);
    throw error;
  }
}

/**
 * Vérifie si une recette est dans les favoris d'un client.
 *
 * @param {string} clientId  - UID Firebase du client
 * @param {string} recetteId - identifiant de la recette
 * @returns {Promise<boolean>}
 */
export async function isFavori(clientId, recetteId) {
  try {
    if (!clientId  || typeof clientId  !== 'string') throw new Error('isFavori : clientId invalide.');
    if (!recetteId || typeof recetteId !== 'string') throw new Error('isFavori : recetteId invalide.');

    const ids = await getFavoris(clientId);
    return ids.includes(recetteId);
  } catch (error) {
    console.error('[recetteController] isFavori :', error);
    throw error;
  }
}

/**
 * Récupère les identifiants favoris depuis Firestore, puis retourne
 * les objets recettes complets correspondants depuis data/recettes.js.
 * Les recettes introuvables localement sont silencieusement ignorées.
 *
 * @param {string} clientId - UID Firebase du client
 * @returns {Promise<Array<Object>>} tableau de recettes complètes
 */
export async function getFavorisComplets(clientId) {
  try {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('getFavorisComplets : clientId invalide.');
    }

    const ids = await getFavoris(clientId);

    // Croisement local — les recettes ne sont JAMAIS lues depuis Firestore
    const recettes = ids
      .map(id => RECETTES.find(r => r.id === id))
      .filter(Boolean); // élimine les undefined si une recette a été supprimée localement

    return recettes;
  } catch (error) {
    console.error('[recetteController] getFavorisComplets :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  UTILITAIRES PRIVÉS
// ─────────────────────────────────────────────────────────────

/**
 * Normalise une chaîne pour la recherche :
 * minuscules + suppression des accents.
 *
 * @param {string} str
 * @returns {string}
 */
function _normaliser(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}
