// ============================================================
//  EthnicEats — services/api_service.js
//  Pont entre le frontend JavaScript et le backend Python Flask
//
//  Responsabilites :
//    - Appels fetch vers l'API Python deployee sur Render
//    - Gestion des erreurs reseau
//    - Fallback automatique si le backend Python est indisponible
//
//  ⚠️  Toutes les fonctions sont async et retournent des objets
//      { success, data, message } coherents avec le reste du projet.
//
//  Configuration :
//    - Remplace API_BASE_URL par ton URL Render apres deploiement
//    - Ex : "https://ethniceats-api.onrender.com"
// ============================================================

// ─── Configuration ────────────────────────────────────────────────────────────

/**
 * URL de base de l'API Python.
 * En developpement local : "http://localhost:5000"
 * En production (Render)  : remplace par ton URL Render
 */
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : 'https://TON-APP.onrender.com';  // ← Remplace apres deploiement sur Render

/**
 * Timeout pour les appels API en millisecondes (5 secondes).
 */
const API_TIMEOUT_MS = 5000;

// ─── Helper interne ───────────────────────────────────────────────────────────

/**
 * Effectue un appel POST vers l'API Python avec timeout.
 * En cas d'echec, retourne { success: false } sans faire planter l'app.
 *
 * @param {string} endpoint  - ex : "/api/prix/panier"
 * @param {Object} body      - donnees JSON a envoyer
 * @returns {Promise<Object>} reponse JSON ou objet erreur
 */
async function _post(endpoint, body) {
  const controller = new AbortController();
  const timeoutId  = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(body),
      signal:  controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[api_service] ${endpoint} → HTTP ${response.status}`);
      return { success: false, message: `Erreur serveur : ${response.status}` };
    }

    return await response.json();

  } catch (error) {
    clearTimeout(timeoutId);

    if (error.name === 'AbortError') {
      console.warn(`[api_service] ${endpoint} → timeout (${API_TIMEOUT_MS}ms)`);
      return { success: false, message: 'Le serveur Python ne repond pas.' };
    }

    console.warn(`[api_service] ${endpoint} → ${error.message}`);
    return { success: false, message: 'Backend Python indisponible.' };
  }
}

// ─── Prix ─────────────────────────────────────────────────────────────────────

/**
 * Calcule le panier complet via le backend Python.
 * Appelle POST /api/prix/panier
 *
 * Utilise en complement de panierController.js :
 * le JS initialise le panier en local (localStorage),
 * Python valide et confirme les calculs.
 *
 * @param {Object} recette     - objet recette complet depuis data/recettes.js
 * @param {number} nbPortions  - nombre de portions
 * @param {Object} preferences - { sourcePreferee, priorite, budgetMax }
 * @returns {Promise<Object>}  { success, ingredients, sousTotal, fraisLivraison, total, tempsEstime, fourchette, pointsCollecte, message }
 */
export async function calculerPanierPython(recette, nbPortions, preferences) {
  const result = await _post('/api/prix/panier', {
    recette,
    nbPortions,
    preferences,
  });

  if (!result.success) return result;

  // Renommage des cles snake_case Python → camelCase JS
  return {
    success:        result.success,
    ingredients:    result.ingredients    ?? [],
    sousTotal:      result.sous_total     ?? 0,
    fraisLivraison: result.frais_livraison ?? 0,
    total:          result.total          ?? 0,
    tempsEstime:    result.temps_estime   ?? 30,
    fourchette:     result.fourchette     ?? '30-45 min',
    pointsCollecte: result.points_collecte ?? [],
    message:        result.message        ?? '',
  };
}

/**
 * Calcule les frais de livraison et le temps estime via le backend Python.
 * Appelle POST /api/prix/livraison
 *
 * @param {Object} adresse     - { ville: str }
 * @param {Object} preferences - { priorite, sourcePreferee }
 * @returns {Promise<Object>}  { success, fraisLivraison, tempsEstime, fourchette, pointsCollecte, message }
 */
export async function calculerLivraisonPython(adresse, preferences) {
  const result = await _post('/api/prix/livraison', { adresse, preferences });

  if (!result.success) return result;

  return {
    success:        result.success,
    fraisLivraison: result.frais_livraison ?? 20,
    tempsEstime:    result.temps_estime    ?? 30,
    fourchette:     result.fourchette      ?? '30-45 min',
    pointsCollecte: result.points_collecte ?? [],
    message:        result.message         ?? '',
  };
}

// ─── Recherche ────────────────────────────────────────────────────────────────

/**
 * Recherche des recettes via le backend Python (recherche intelligente).
 * Appelle POST /api/recherche
 *
 * @param {Array}  recettes    - toutes les recettes depuis RECETTES (data/recettes.js)
 * @param {string} query       - terme de recherche
 * @param {Object} preferences - { priorite, sourcePreferee }
 * @returns {Promise<Object>}  { success, resultats, nbResultats, message }
 */
export async function rechercherRecettesPython(recettes, query, preferences = null) {
  const result = await _post('/api/recherche', { recettes, query, preferences });

  if (!result.success) return result;

  return {
    success:     result.success,
    resultats:   result.resultats    ?? [],
    nbResultats: result.nb_resultats ?? 0,
    message:     result.message      ?? '',
  };
}

/**
 * Filtre les recettes par categorie via le backend Python.
 * Appelle POST /api/recherche/categorie
 *
 * @param {Array}  recettes    - toutes les recettes
 * @param {string} categorie   - categorie principale
 * @param {Object} preferences - { priorite, sourcePreferee }
 * @returns {Promise<Object>}  { success, resultats, nbResultats, message }
 */
export async function rechercherParCategoriePython(recettes, categorie, preferences = null) {
  const result = await _post('/api/recherche/categorie', { recettes, categorie, preferences });

  if (!result.success) return result;

  return {
    success:     result.success,
    resultats:   result.resultats    ?? [],
    nbResultats: result.nb_resultats ?? 0,
    message:     result.message      ?? '',
  };
}

// ─── Livraison ────────────────────────────────────────────────────────────────

/**
 * Genere le plan de livraison via le backend Python.
 * Appelle POST /api/livraison/plan
 *
 * @param {Object} adresse     - { adresse, ville, telephone }
 * @param {Array}  ingredients - ingredients du panier
 * @param {Object} preferences - { sourcePreferee, priorite }
 * @returns {Promise<Object>}  { success, plan, message }
 */
export async function genererPlanLivraison(adresse, ingredients, preferences) {
  return await _post('/api/livraison/plan', { adresse, ingredients, preferences });
}

/**
 * Valide une adresse de livraison via le backend Python.
 * Appelle POST /api/livraison/valider-adresse
 *
 * @param {Object} adresse - { adresse, ville, telephone }
 * @returns {Promise<Object>}  { success, valide, message }
 */
export async function validerAdresse(adresse) {
  return await _post('/api/livraison/valider-adresse', { adresse });
}

// ─── Sante du backend ─────────────────────────────────────────────────────────

/**
 * Verifie si le backend Python est disponible.
 * Utile pour afficher un indicateur d'etat dans l'UI.
 *
 * @returns {Promise<boolean>} true si le backend repond
 */
export async function backendDisponible() {
  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 3000);

    const response = await fetch(`${API_BASE_URL}/api/health`, {
      signal: controller.signal,
    });

    return response.ok;
  } catch {
    return false;
  }
}
