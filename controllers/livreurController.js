// ============================================================
//  EthnicEats — controllers/livreurController.js
//  Contrôleur MVC pour l'interface livreur
//
//  Responsabilités :
//    • Récupérer les commandes disponibles, en cours et l'historique
//    • Gérer l'acceptation d'une commande et la notification au client
//    • Faire avancer le statut d'une commande étape par étape
//    • Fournir les stats et le profil du livreur
//    • Générer les points de collecte selon les préférences client
//    • Écouter les nouvelles commandes en temps réel
//
//  Règles :
//    • Toutes les fonctions sont async avec try/catch
//    • Le contrôleur ne manipule pas le DOM
//    • La synchronisation temps réel passe par realtimeService.js
//    • Les modèles (Livreur, Commande) gèrent la logique métier pure
//
//  Dépendances :
//    • models/livreur.js
//    • models/commande.js
//    • services/firestoreService.js
//    • services/realtimeService.js
// ============================================================

import Livreur  from '../models/livreur.js';
import Commande from '../models/commande.js';

import {
  getUtilisateur,
  sauvegarderUtilisateur,
  getCommandesDisponibles   as fsGetCommandesDisponibles,
  getHistoriqueLivreur,
  mettreAJourStatutCommande,
  sauvegarderCommande,
}                                        from '../services/firestoreService.js';

import {
  ecouterNouvellesCommandes,
  mettreAJourStatutRealtime,
  assignerLivreurRealtime,
  stopperEcoute,
}                                        from '../services/realtimeService.js';

// ─── Constantes ───────────────────────────────────────────────────────────────

/**
 * Sources d'approvisionnement selon le type d'ingrédient.
 * Utilisé par genererPointsCollecte().
 */
const SOURCES_PAR_TYPE = {
  legumes:  'souk',
  fruits:   'souk',
  viande:   'souk',
  poisson:  'souk',
  epices:   'souk',
  laitiers: 'supermarche',
  emballes: 'supermarche',
  cereales: 'supermarche',
  boissons: 'supermarche',
};

/**
 * Labels lisibles des points de collecte.
 */
const LABELS_SOURCE = {
  souk:         'Souk / marché local',
  supermarche:  'Supermarché',
};

// ─── 1. Commandes disponibles ──────────────────────────────────────────────────

/**
 * Récupère toutes les nouvelles commandes disponibles à accepter (statut "commande_passee",
 * sans livreur assigné). Triées par date de création croissante (plus ancienne en premier).
 *
 * @returns {Promise<Array<Object>>} tableau de plain objects commande
 */
export async function getCommandesDisponibles() {
  try {
    const données = await fsGetCommandesDisponibles();
    return données;
  } catch (erreur) {
    console.error('[livreurController] getCommandesDisponibles :', erreur);
    throw erreur;
  }
}

// ─── 2. Écoute temps réel des nouvelles commandes ─────────────────────────────

/**
 * Écoute en temps réel l'arrivée de nouvelles commandes disponibles.
 *
 * À chaque changement dans l'index `commandesDisponibles` de la Realtime Database,
 * le callback reçoit la liste des ids de commandes disponibles.
 * La vue peut alors appeler getCommandesDisponibles() pour charger les détails.
 *
 * @param {Function} callback - appelé à chaque changement :
 *                              callback(commandeIds: string[], erreur?: Error)
 * @returns {import('firebase/database').DatabaseReference} référence active
 *          (passer à stopperEcouteCommandes() pour arrêter)
 */
export function ecouterNouvellesCommandesLivreur(callback) {
  try {
    if (typeof callback !== 'function') {
      throw new Error('ecouterNouvellesCommandesLivreur : callback doit être une fonction.');
    }
    return ecouterNouvellesCommandes(callback);
  } catch (erreur) {
    console.error('[livreurController] ecouterNouvellesCommandesLivreur :', erreur);
    throw erreur;
  }
}

/**
 * Arrête un listener de commandes précédemment démarré.
 *
 * @param {import('firebase/database').DatabaseReference | null} reference
 */
export function stopperEcouteCommandes(reference) {
  stopperEcoute(reference);
}

// ─── 3. Accepter une commande ──────────────────────────────────────────────────

/**
 * Accepte une commande disponible au nom d'un livreur.
 *
 * Processus :
 *  1. Charge le profil livreur depuis Firestore
 *  2. Instancie le modèle Livreur et appelle accepterCommande()
 *  3. Assigne le livreur à la commande dans la Realtime Database
 *     (met le statut à "confirmee" + retire de commandesDisponibles)
 *  4. Met à jour la commande dans Firestore (livreurId + statut "confirmee")
 *  5. Met à jour le statut du livreur dans Firestore (statutActuel "en_livraison")
 *
 * Les infos du livreur (nom + telephoneContact) sont envoyées au client via
 * le nœud RTDB `livreurs/{livreurId}` par assignerLivreurRealtime().
 *
 * @param {string} livreurId  - UID du livreur
 * @param {string} commandeId - identifiant de la commande (ex : "ORD-1024")
 * @returns {Promise<void>}
 * @throws {Error} si le livreur est déjà en livraison ou indisponible
 */
export async function accepterCommande(livreurId, commandeId) {
  try {
    if (!livreurId  || typeof livreurId  !== 'string') throw new Error('accepterCommande : livreurId invalide.');
    if (!commandeId || typeof commandeId !== 'string') throw new Error('accepterCommande : commandeId invalide.');

    // 1. Charger le profil livreur
    const donnéesLivreur = await getUtilisateur(livreurId);
    if (!donnéesLivreur) throw new Error(`accepterCommande : livreur introuvable (id="${livreurId}").`);

    // 2. Instancier le modèle — lève une erreur si déjà en livraison / indisponible
    const livreur = Livreur.depuisObjet(donnéesLivreur);
    livreur.accepterCommande(commandeId); // met statutActuel = "en_livraison"

    // 3. Synchroniser dans RTDB :
    //    - commandes/{commandeId} → livreurId + statut "confirmee"
    //    - retire de commandesDisponibles
    //    - écrit dans livreurs/{livreurId} les infos visibles par le client
    await assignerLivreurRealtime(commandeId, livreurId);

    // Publier les infos du livreur dans RTDB pour le client (nom + telephoneContact)
    await _publierInfosLivreurRTDB(livreurId, livreur.nomComplet, livreur.telephoneContact);

    // 4. Mettre à jour la commande dans Firestore
    await mettreAJourStatutCommande(commandeId, 'confirmee');
    await sauvegarderCommande({ id: commandeId, livreurId, statut: 'confirmee' });

    // 5. Mettre à jour le statut du livreur dans Firestore
    await sauvegarderUtilisateur(livreurId, livreur.versObjet());

  } catch (erreur) {
    console.error('[livreurController] accepterCommande :', erreur);
    throw erreur;
  }
}

// ─── 4. Commandes en cours ─────────────────────────────────────────────────────

/**
 * Récupère les commandes actuellement en cours pour un livreur donné.
 * Sont considérées "en cours" les commandes dont le statut n'est pas
 * "commande_passee", "livree" et dont le livreurId correspond.
 *
 * Note : la query Firestore principale filtre par livreurId + statuts actifs.
 *
 * @param {string} livreurId
 * @returns {Promise<Array<Object>>} tableau de plain objects commande
 */
export async function getCommandesEnCours(livreurId) {
  try {
    if (!livreurId || typeof livreurId !== 'string') {
      throw new Error('getCommandesEnCours : livreurId invalide.');
    }

    // Tous les statuts intermédiaires (après acceptation, avant livraison)
    const statutsEnCours = ['confirmee', 'en_preparation', 'en_livraison', 'arrive'];

    const { collection, query, where, getDocs, orderBy } =
      await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js');
    const { db } = await import('../services/firebase.js');

    const q    = query(
      collection(db, 'commandes'),
      where('livreurId', '==', livreurId),
      where('statut',    'in', statutsEnCours),
      orderBy('dateCreation', 'asc'),
    );
    const snap = await getDocs(q);

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));

  } catch (erreur) {
    console.error('[livreurController] getCommandesEnCours :', erreur);
    throw erreur;
  }
}

// ─── 5. Passer à l'étape suivante ─────────────────────────────────────────────

/**
 * Fait avancer le statut d'une commande vers l'étape suivante du cycle de vie.
 *
 * Cycle : confirmee → en_preparation → en_livraison → arrive → livree
 *
 * Processus :
 *  1. Calcule le statut suivant via Commande.STATUTS
 *  2. Met à jour la Realtime Database (synchronisation immédiate client)
 *  3. Met à jour Firestore (persistance)
 *  4. Si statut "livree" : enregistre la livraison du livreur (gains + compteur)
 *
 * @param {string} commandeId   - identifiant de la commande
 * @param {string} statutActuel - statut courant avant le changement
 * @returns {Promise<string>} nouveau statut
 * @throws {Error} si le statut actuel est "livree" (déjà final)
 */
export async function passerEtapeSuivante(commandeId, statutActuel) {
  try {
    if (!commandeId   || typeof commandeId   !== 'string') throw new Error('passerEtapeSuivante : commandeId invalide.');
    if (!statutActuel || typeof statutActuel !== 'string') throw new Error('passerEtapeSuivante : statutActuel invalide.');

    // Calculer le statut suivant via le modèle (pas de DOM, logique pure)
    const commandeTemp = new Commande({
      id:          commandeId,
      statut:      statutActuel,
      clientId:    'temp',          // valeurs minimales pour instancier
      ingredients: [{ nom: 'temp' }],
    });
    const nouveauStatut = commandeTemp.synchroniserStatut();

    // 2. Synchronisation temps réel (client voit le changement immédiatement)
    await mettreAJourStatutRealtime(commandeId, nouveauStatut);

    // 3. Persistance Firestore
    await mettreAJourStatutCommande(commandeId, nouveauStatut);

    // 4. Si livraison terminée → enregistrer chez le livreur
    if (nouveauStatut === 'livree') {
      await _enregistrerLivraisonTerminee(commandeId);
    }

    return nouveauStatut;

  } catch (erreur) {
    console.error('[livreurController] passerEtapeSuivante :', erreur);
    throw erreur;
  }
}

// ─── 6. Historique ────────────────────────────────────────────────────────────

/**
 * Récupère l'historique des commandes livrées par un livreur.
 * (statut "livree", triées par date décroissante)
 *
 * @param {string} livreurId
 * @returns {Promise<Array<Object>>} tableau de plain objects commande
 */
export async function getHistorique(livreurId) {
  try {
    if (!livreurId || typeof livreurId !== 'string') {
      throw new Error('getHistorique : livreurId invalide.');
    }
    return await getHistoriqueLivreur(livreurId);
  } catch (erreur) {
    console.error('[livreurController] getHistorique :', erreur);
    throw erreur;
  }
}

// ─── 7. Statistiques ──────────────────────────────────────────────────────────

/**
 * Récupère le total gagné et le nombre de livraisons effectuées par un livreur.
 * Données lues depuis Firestore (profil persisté).
 *
 * @param {string} livreurId
 * @returns {Promise<{ gainsTotaux: number, nbLivraisons: number }>}
 */
export async function getStats(livreurId) {
  try {
    if (!livreurId || typeof livreurId !== 'string') {
      throw new Error('getStats : livreurId invalide.');
    }

    const données = await getUtilisateur(livreurId);
    if (!données) throw new Error(`getStats : livreur introuvable (id="${livreurId}").`);

    const livreur = Livreur.depuisObjet(données);
    const stats   = livreur.consulterStats(); // retourne une Map

    return {
      gainsTotaux:  stats.get('gainsTotaux'),
      nbLivraisons: stats.get('nbLivraisons'),
    };

  } catch (erreur) {
    console.error('[livreurController] getStats :', erreur);
    throw erreur;
  }
}

// ─── 8. Profil livreur ────────────────────────────────────────────────────────

/**
 * Récupère les données du profil d'un livreur.
 * Retourne un plain object prêt à l'affichage (sans motDePasse).
 *
 * @param {string} livreurId
 * @returns {Promise<Object>} données profil livreur
 */
export async function getProfil(livreurId) {
  try {
    if (!livreurId || typeof livreurId !== 'string') {
      throw new Error('getProfil : livreurId invalide.');
    }

    const données = await getUtilisateur(livreurId);
    if (!données) throw new Error(`getProfil : livreur introuvable (id="${livreurId}").`);

    const livreur = Livreur.depuisObjet(données);
    return livreur.versObjet(); // motDePasse exclu par versObjet()

  } catch (erreur) {
    console.error('[livreurController] getProfil :', erreur);
    throw erreur;
  }
}

// ─── 9. Points de collecte ────────────────────────────────────────────────────

/**
 * Génère les points de collecte optimisés pour une commande selon les préférences client.
 *
 * Logique :
 *  - Analyse le type de chaque ingrédient (légume, emballé, etc.)
 *  - Regroupe par source (souk / supermarché)
 *  - Retourne au maximum 2 points de collecte avec les ingrédients associés
 *  - Si préférence client "souk" → tout au souk
 *  - Si préférence client "supermarche" → tout au supermarché
 *  - Si préférence "mix" (ou absente) → répartition selon type d'ingrédient
 *
 * @param {Object} commande    - plain object Commande (doit avoir commande.ingredients)
 * @param {Object} [preferences] - { sourcePreferee: 'souk' | 'supermarche' | 'mix' }
 * @returns {Array<{ source: string, label: string, ingredients: Array<Object> }>}
 *          max 2 éléments
 */
export async function genererPointsCollecte(commande, preferences = {}) {
  try {
    if (!commande || !Array.isArray(commande.ingredients)) {
      throw new Error('genererPointsCollecte : commande invalide ou ingredients manquants.');
    }

    const sourcePreferee = preferences?.sourcePreferee || 'mix';

    // Cas "source unique" → un seul point de collecte
    if (sourcePreferee === 'souk' || sourcePreferee === 'supermarche') {
      return [
        {
          source:      sourcePreferee,
          label:       LABELS_SOURCE[sourcePreferee],
          ingredients: commande.ingredients,
        },
      ];
    }

    // Cas "mix" → répartition par type d'ingrédient
    const groupes = {};

    for (const ingredient of commande.ingredients) {
      const type   = (ingredient.type || 'emballes').toLowerCase();
      const source = SOURCES_PAR_TYPE[type] || 'supermarche';

      if (!groupes[source]) {
        groupes[source] = { source, label: LABELS_SOURCE[source], ingredients: [] };
      }
      groupes[source].ingredients.push(ingredient);
    }

    // Maximum 2 points de collecte (souk + supermarché)
    const points = Object.values(groupes).slice(0, 2);

    // Si tous les ingrédients tombent dans la même source → 1 seul point
    return points;

  } catch (erreur) {
    console.error('[livreurController] genererPointsCollecte :', erreur);
    throw erreur;
  }
}

// ─── Helpers privés ───────────────────────────────────────────────────────────

/**
 * Publie les informations visibles du livreur dans la Realtime Database.
 * Nœud : livreurs/{livreurId} → { nom, telephone }
 * Ces données sont lues par ecouterInfosLivreur() côté client.
 *
 * @param {string} livreurId
 * @param {string} nom
 * @param {string} telephone
 * @returns {Promise<void>}
 */
async function _publierInfosLivreurRTDB(livreurId, nom, telephone) {
  try {
    const { ref, set }  = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js');
    const { rtdb }      = await import('../services/firebase.js');

    await set(ref(rtdb, `livreurs/${livreurId}`), { nom, telephone });
  } catch (erreur) {
    console.error('[livreurController] _publierInfosLivreurRTDB :', erreur);
    throw erreur;
  }
}

/**
 * Enregistre qu'une livraison est terminée :
 *  - Charge la commande pour récupérer les frais de livraison
 *  - Instancie le livreur et appelle enregistrerLivraison()
 *    (incrémente nbLivraisons, cumule gainsTotaux, repasse statutActuel à "disponible")
 *  - Persiste le livreur mis à jour dans Firestore
 *
 * @param {string} commandeId
 * @returns {Promise<void>}
 */
async function _enregistrerLivraisonTerminee(commandeId) {
  try {
    // Charger la commande pour récupérer livreurId et fraisLivraison
    const { doc, getDoc } = await import('https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js');
    const { db }          = await import('../services/firebase.js');

    const snapCommande = await getDoc(doc(db, 'commandes', commandeId));
    if (!snapCommande.exists()) {
      console.warn(`[livreurController] _enregistrerLivraisonTerminee : commande introuvable (id="${commandeId}").`);
      return;
    }

    const donnéesCommande = snapCommande.data();
    const livreurId       = donnéesCommande.livreurId;
    const fraisLivraison  = donnéesCommande.fraisLivraison || 0;

    if (!livreurId) {
      console.warn('[livreurController] _enregistrerLivraisonTerminee : livreurId absent dans la commande.');
      return;
    }

    // Charger et mettre à jour le livreur
    const donnéesLivreur = await getUtilisateur(livreurId);
    if (!donnéesLivreur) return;

    const livreur = Livreur.depuisObjet(donnéesLivreur);
    livreur.enregistrerLivraison(fraisLivraison); // nbLivraisons++, gainsTotaux+, statut→disponible

    await sauvegarderUtilisateur(livreurId, livreur.versObjet());

  } catch (erreur) {
    console.error('[livreurController] _enregistrerLivraisonTerminee :', erreur);
    throw erreur;
  }
}
