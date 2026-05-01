// ============================================================
//  EthnicEats — services/realtimeService.js
//  Synchronisation temps réel via Firebase Realtime Database
//
//  Responsabilités :
//    • Écouter les changements de statut d'une commande (côté client)
//    • Mettre à jour le statut d'une commande (côté livreur)
//    • Écouter les nouvelles commandes disponibles (côté livreur)
//    • Écouter l'assignation et les infos du livreur (côté client)
//    • Gérer l'arrêt propre des listeners actifs
//
//  Dépendances :
//    • services/firebase.js  — exporte `rtdb` (Realtime Database)
//    • models/commande.js    — fournit Commande.STATUTS pour validation
//
//  Structure RTDB utilisée :
//    commandes/
//      {commandeId}/
//        statut          : string   — statut courant
//        livreurId       : string   — uid du livreur assigné
//        tempsEstime     : number   — minutes (mis à jour à la confirmation)
//    livreurs/
//      {livreurId}/
//        nom             : string
//        telephone       : string
//    commandesDisponibles/
//      {commandeId}      : true     — index des commandes en attente d'acceptation
// ============================================================

import { rtdb }                          from './firebase.js';
import {
  ref,
  onValue,
  off,
  set,
  get,
  remove,
  serverTimestamp,
  update,
}                                        from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js';
import Commande                          from '../models/commande.js';

// ─── Chemins RTDB ─────────────────────────────────────────────────────────────

/**
 * Retourne la référence RTDB d'une commande.
 * @param {string} commandeId
 * @returns {import('firebase/database').DatabaseReference}
 */
const _refCommande = (commandeId) => ref(rtdb, `commandes/${commandeId}`);

/**
 * Retourne la référence RTDB du statut d'une commande.
 * @param {string} commandeId
 * @returns {import('firebase/database').DatabaseReference}
 */
const _refStatut = (commandeId) => ref(rtdb, `commandes/${commandeId}/statut`);

/**
 * Retourne la référence RTDB de l'id du livreur assigné à une commande.
 * @param {string} commandeId
 * @returns {import('firebase/database').DatabaseReference}
 */
const _refLivreurId = (commandeId) => ref(rtdb, `commandes/${commandeId}/livreurId`);

/**
 * Retourne la référence RTDB du profil d'un livreur.
 * @param {string} livreurId
 * @returns {import('firebase/database').DatabaseReference}
 */
const _refLivreur = (livreurId) => ref(rtdb, `livreurs/${livreurId}`);

/**
 * Référence de l'index des commandes disponibles (en attente d'acceptation).
 */
const _refCommandesDisponibles = ref(rtdb, 'commandesDisponibles');

// ─── API publique ──────────────────────────────────────────────────────────────

/**
 * Écoute en temps réel le statut d'une commande (côté client).
 *
 * Comportements automatiques gérés par le callback :
 *  - Dès que statut === "confirmee"   → le client peut appeler ecouterInfosLivreur()
 *  - Dès que statut === "arrive"      → déclencher la pop-up notification côté UI
 *  - Dès que statut === "livree"      → retirer la commande du suivi actif (UI)
 *
 * @param {string}   commandeId  - identifiant de la commande (ex : "ORD-1024")
 * @param {Function} callback    - appelé à chaque changement : callback(statut: string | null, erreur?: Error)
 * @returns {import('firebase/database').DatabaseReference} référence active (passer à stopperEcoute pour arrêter)
 */
export function ecouterStatutCommande(commandeId, callback) {
  if (!commandeId || typeof commandeId !== 'string') {
    throw new Error('ecouterStatutCommande : commandeId est obligatoire.');
  }
  if (typeof callback !== 'function') {
    throw new Error('ecouterStatutCommande : callback doit être une fonction.');
  }

  const refStatut = _refStatut(commandeId);

  onValue(
    refStatut,
    (snapshot) => {
      const statut = snapshot.val();

      // Valider que le statut reçu est connu (guard contre des données corrompues)
      if (statut !== null && !Commande.STATUTS.includes(statut)) {
        console.warn(
          `ecouterStatutCommande [${commandeId}] : statut inconnu reçu → "${statut}". Ignoré.`
        );
        return;
      }

      callback(statut, null);
    },
    (erreur) => {
      console.error(`ecouterStatutCommande [${commandeId}] erreur :`, erreur);
      callback(null, erreur);
    }
  );

  return refStatut;
}

/**
 * Met à jour le statut d'une commande dans la Realtime Database (côté livreur).
 *
 * Valide le statut avant l'écriture.
 * Cette fonction ne modifie pas l'objet Commande local — le contrôleur
 * doit appeler commande.synchroniserStatut() séparément si nécessaire.
 *
 * @param {string} commandeId - identifiant de la commande
 * @param {string} statut     - nouveau statut (doit appartenir à Commande.STATUTS)
 * @returns {Promise<void>}
 * @throws {Error} si le statut est invalide
 */
export async function mettreAJourStatutRealtime(commandeId, statut) {
  if (!commandeId || typeof commandeId !== 'string') {
    throw new Error('mettreAJourStatutRealtime : commandeId est obligatoire.');
  }
  if (!Commande.STATUTS.includes(statut)) {
    throw new Error(
      `mettreAJourStatutRealtime : statut invalide → "${statut}". ` +
      `Valeurs acceptées : ${Commande.STATUTS.join(', ')}.`
    );
  }

  const miseAJour = { statut };

  // Quand la commande est livrée, on horodate la fin pour l'historique
  if (statut === 'livree') {
    miseAJour.dateLivraison = serverTimestamp();
  }

  await update(_refCommande(commandeId), miseAJour);

  // Quand la commande est livrée, on la retire de l'index des commandes disponibles
  // (elle ne devrait plus y être à ce stade, mais on nettoie par sécurité)
  if (statut === 'livree') {
    await _retirerCommandeDisponible(commandeId);
  }
}

/**
 * Écoute en temps réel les nouvelles commandes disponibles (côté livreur).
 *
 * Chaque nouvelle commande passée par un client est indexée dans
 * `commandesDisponibles/{commandeId}`. Le callback reçoit la liste
 * complète des ids disponibles à chaque changement.
 *
 * Le livreur peut ensuite charger les détails de chaque commande
 * depuis Firestore via le contrôleur.
 *
 * @param {Function} callback - appelé à chaque changement :
 *                              callback(commandeIds: string[], erreur?: Error)
 * @returns {import('firebase/database').DatabaseReference} référence active
 */
export function ecouterNouvellesCommandes(callback) {
  if (typeof callback !== 'function') {
    throw new Error('ecouterNouvellesCommandes : callback doit être une fonction.');
  }

  onValue(
    _refCommandesDisponibles,
    (snapshot) => {
      const data = snapshot.val();
      // data est un objet { commandeId: true, ... } ou null si vide
      const commandeIds = data ? Object.keys(data) : [];
      callback(commandeIds, null);
    },
    (erreur) => {
      console.error('ecouterNouvellesCommandes erreur :', erreur);
      callback([], erreur);
    }
  );

  return _refCommandesDisponibles;
}

/**
 * Écoute en temps réel les informations du livreur assigné à une commande (côté client).
 *
 * Processus :
 *  1. Écoute `commandes/{commandeId}/livreurId`
 *  2. Dès qu'un livreurId est disponible (statut "confirmee"),
 *     charge les infos du livreur depuis `livreurs/{livreurId}`
 *  3. Appelle le callback avec { nom, telephone } ou null si pas encore assigné
 *
 * @param {string}   commandeId - identifiant de la commande
 * @param {Function} callback   - appelé à chaque changement :
 *                                callback(infosLivreur: { nom: string, telephone: string } | null, erreur?: Error)
 * @returns {import('firebase/database').DatabaseReference} référence active sur livreurId (passer à stopperEcoute)
 */
export function ecouterInfosLivreur(commandeId, callback) {
  if (!commandeId || typeof commandeId !== 'string') {
    throw new Error('ecouterInfosLivreur : commandeId est obligatoire.');
  }
  if (typeof callback !== 'function') {
    throw new Error('ecouterInfosLivreur : callback doit être une fonction.');
  }

  const refLivreurId = _refLivreurId(commandeId);

  onValue(
    refLivreurId,
    async (snapshot) => {
      const livreurId = snapshot.val();

      // Pas encore de livreur assigné
      if (!livreurId) {
        callback(null, null);
        return;
      }

      // Charger les infos du livreur en one-shot (get)
      try {
        const snapshotLivreur = await get(_refLivreur(livreurId));
        if (!snapshotLivreur.exists()) {
          console.warn(`ecouterInfosLivreur : aucun profil trouvé pour livreurId="${livreurId}".`);
          callback(null, null);
          return;
        }

        const { nom = '', telephone = '' } = snapshotLivreur.val();
        callback({ nom, telephone }, null);
      } catch (erreur) {
        console.error('ecouterInfosLivreur — chargement livreur :', erreur);
        callback(null, erreur);
      }
    },
    (erreur) => {
      console.error(`ecouterInfosLivreur [${commandeId}] erreur :`, erreur);
      callback(null, erreur);
    }
  );

  return refLivreurId;
}

/**
 * Arrête un listener Realtime Database actif.
 *
 * Passer la référence retournée par l'une des fonctions d'écoute.
 * Sans argument, la fonction est sans effet.
 *
 * @param {import('firebase/database').DatabaseReference | null} reference
 */
export function stopperEcoute(reference) {
  if (!reference) return;
  off(reference);
}

// ─── Helpers internes ──────────────────────────────────────────────────────────

/**
 * Publie une commande dans l'index `commandesDisponibles` pour qu'elle
 * soit visible des livreurs. Appelé par le contrôleur lors du checkout.
 *
 * @param {string} commandeId
 * @returns {Promise<void>}
 */
export async function publierCommandeDisponible(commandeId) {
  if (!commandeId || typeof commandeId !== 'string') {
    throw new Error('publierCommandeDisponible : commandeId est obligatoire.');
  }
  await set(ref(rtdb, `commandesDisponibles/${commandeId}`), true);
}

/**
 * Retire une commande de l'index `commandesDisponibles`.
 * Appelé quand un livreur accepte la commande ou qu'elle est livrée.
 *
 * @param {string} commandeId
 * @returns {Promise<void>}
 */
export async function retirerCommandeDisponible(commandeId) {
  await _retirerCommandeDisponible(commandeId);
}

/**
 * Initialise (ou écrase) le nœud Realtime d'une commande au moment du checkout.
 * Appelé par le contrôleur juste après la création de la commande dans Firestore.
 *
 * @param {string} commandeId
 * @param {string} [statutInitial='commande_passee']
 * @returns {Promise<void>}
 */
export async function initialiserCommandeRealtime(commandeId, statutInitial = 'commande_passee') {
  if (!commandeId || typeof commandeId !== 'string') {
    throw new Error('initialiserCommandeRealtime : commandeId est obligatoire.');
  }
  if (!Commande.STATUTS.includes(statutInitial)) {
    throw new Error(`initialiserCommandeRealtime : statut invalide → "${statutInitial}".`);
  }

  await set(_refCommande(commandeId), {
    statut:      statutInitial,
    livreurId:   '',
    dateCreation: serverTimestamp(),
  });
}

/**
 * Assigne un livreur à une commande dans la Realtime Database.
 * Met également à jour le statut à "confirmee".
 * Retire la commande de l'index `commandesDisponibles`.
 *
 * @param {string} commandeId
 * @param {string} livreurId
 * @returns {Promise<void>}
 */
export async function assignerLivreurRealtime(commandeId, livreurId) {
  if (!commandeId || typeof commandeId !== 'string') {
    throw new Error('assignerLivreurRealtime : commandeId est obligatoire.');
  }
  if (!livreurId || typeof livreurId !== 'string') {
    throw new Error('assignerLivreurRealtime : livreurId est obligatoire.');
  }

  await update(_refCommande(commandeId), {
    livreurId,
    statut: 'confirmee',
  });

  await _retirerCommandeDisponible(commandeId);
}

// ─── Utilitaire privé ──────────────────────────────────────────────────────────

/**
 * @param {string} commandeId
 * @returns {Promise<void>}
 */
async function _retirerCommandeDisponible(commandeId) {
  await remove(ref(rtdb, `commandesDisponibles/${commandeId}`));
}
