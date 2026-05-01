// ============================================================
//  EthnicEats — services/firestoreService.js
//  Couche d'accès Firestore — Architecture MVC
//
//  Collections :
//    utilisateurs/{userId}
//    commandes/{commandeId}
//    utilisateurs/{clientId}/favoris/{recetteId}
//    utilisateurs/{clientId}/preferences   (document unique)
//
//  ⚠️  Les recettes sont stockées LOCALEMENT dans data/recettes.js
//      et ne sont PAS persistées dans Firestore.
// ============================================================

import { db } from './firebase.js';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  serverTimestamp,
  orderBy,
} from 'https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js';

// ─────────────────────────────────────────────────────────────
//  UTILISATEURS
// ─────────────────────────────────────────────────────────────

/**
 * Sauvegarde (création ou mise à jour) d'un utilisateur dans Firestore.
 * @param {string} userId  - UID Firebase Auth
 * @param {Object} données - plain object issu de Client.versObjet() ou Livreur.versObjet()
 * @returns {Promise<void>}
 */
export async function sauvegarderUtilisateur(userId, données) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('sauvegarderUtilisateur : userId invalide.');
    }
    if (!données || typeof données !== 'object') {
      throw new Error('sauvegarderUtilisateur : données invalides.');
    }

    const ref = doc(db, 'utilisateurs', userId);
    await setDoc(ref, {
      ...données,
      updatedAt: serverTimestamp(),
    }, { merge: true });

  } catch (error) {
    console.error('[firestoreService] sauvegarderUtilisateur :', error);
    throw error;
  }
}

/**
 * Récupère un utilisateur par son UID.
 * @param {string} userId
 * @returns {Promise<Object|null>} plain object ou null si introuvable
 */
export async function getUtilisateur(userId) {
  try {
    if (!userId || typeof userId !== 'string') {
      throw new Error('getUtilisateur : userId invalide.');
    }

    const ref  = doc(db, 'utilisateurs', userId);
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() };

  } catch (error) {
    console.error('[firestoreService] getUtilisateur :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  COMMANDES
// ─────────────────────────────────────────────────────────────

/**
 * Sauvegarde (création ou mise à jour) d'une commande dans Firestore.
 * @param {Object} commande - plain object issu de Commande.versObjet()
 * @returns {Promise<void>}
 */
export async function sauvegarderCommande(commande) {
  try {
    if (!commande || typeof commande !== 'object') {
      throw new Error('sauvegarderCommande : commande invalide.');
    }
    if (!commande.id || typeof commande.id !== 'string') {
      throw new Error('sauvegarderCommande : commande.id est obligatoire.');
    }

    const ref = doc(db, 'commandes', commande.id);
    await setDoc(ref, {
      ...commande,
      updatedAt: serverTimestamp(),
    }, { merge: true });

  } catch (error) {
    console.error('[firestoreService] sauvegarderCommande :', error);
    throw error;
  }
}

/**
 * Récupère toutes les commandes d'un client donné (actives + historique).
 * @param {string} clientId
 * @returns {Promise<Array<Object>>}
 */
export async function getCommandesClient(clientId) {
  try {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('getCommandesClient : clientId invalide.');
    }

    // La combinaison `where(...) + orderBy(...)` peut nécessiter un index composite.
    // En environnement de démo/dev, cet index n'est pas toujours créé → la requête échoue.
    // Fallback : requête sans orderBy + tri côté client.
    try {
      const q    = query(
        collection(db, 'commandes'),
        where('clientId', '==', clientId),
        orderBy('dateCreation', 'desc')
      );
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() }));
    } catch (error) {
      const msg = String(error?.message || '').toLowerCase();
      const needsIndex = msg.includes('requires an index') || msg.includes('failed_precondition') || msg.includes('failed precondition');
      if (!needsIndex) throw error;

      const q2    = query(
        collection(db, 'commandes'),
        where('clientId', '==', clientId)
      );
      const snap2 = await getDocs(q2);
      const commandes = snap2.docs.map(d => ({ id: d.id, ...d.data() }));

      commandes.sort((a, b) => {
        const da = Date.parse(a.dateCreation || '') || 0;
        const dbb = Date.parse(b.dateCreation || '') || 0;
        return dbb - da;
      });

      return commandes;
    }

  } catch (error) {
    console.error('[firestoreService] getCommandesClient :', error);
    throw error;
  }
}

/**
 * Récupère les commandes disponibles pour les livreurs.
 * Une commande est "disponible" quand son statut est "commande_passee"
 * et qu'aucun livreur n'y est encore assigné (livreurId vide).
 * @returns {Promise<Array<Object>>}
 */
export async function getCommandesDisponibles() {
  try {
    const q    = query(
      collection(db, 'commandes'),
      where('statut', '==', 'commande_passee'),
      where('livreurId', '==', ''),
      orderBy('dateCreation', 'asc')
    );
    const snap = await getDocs(q);

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));

  } catch (error) {
    console.error('[firestoreService] getCommandesDisponibles :', error);
    throw error;
  }
}

/**
 * Met à jour le statut d'une commande.
 * Quand le statut passe à "livree", la commande est automatiquement
 * marquée comme archivée (archivee: true).
 * @param {string} commandeId
 * @param {string} statut - valeur parmi Commande.STATUTS
 * @returns {Promise<void>}
 */
export async function mettreAJourStatutCommande(commandeId, statut) {
  try {
    if (!commandeId || typeof commandeId !== 'string') {
      throw new Error('mettreAJourStatutCommande : commandeId invalide.');
    }

    const statutsValides = [
      'commande_passee',
      'confirmee',
      'en_preparation',
      'en_livraison',
      'arrive',
      'livree',
    ];
    if (!statutsValides.includes(statut)) {
      throw new Error(`mettreAJourStatutCommande : statut invalide → "${statut}".`);
    }

    const ref      = doc(db, 'commandes', commandeId);
    const données  = {
      statut,
      updatedAt: serverTimestamp(),
    };

    // Archivage automatique dès que la commande est livrée
    if (statut === 'livree') {
      données.archivee = true;
    }

    await updateDoc(ref, données);

  } catch (error) {
    console.error('[firestoreService] mettreAJourStatutCommande :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  FAVORIS
// ─────────────────────────────────────────────────────────────

/**
 * Ajoute une recette aux favoris d'un client.
 * Stocké dans : utilisateurs/{clientId}/favoris/{recetteId}
 * @param {string} clientId
 * @param {string} recetteId
 * @returns {Promise<void>}
 */
export async function ajouterFavori(clientId, recetteId) {
  try {
    if (!clientId  || typeof clientId  !== 'string') throw new Error('ajouterFavori : clientId invalide.');
    if (!recetteId || typeof recetteId !== 'string') throw new Error('ajouterFavori : recetteId invalide.');

    const ref = doc(db, 'utilisateurs', clientId, 'favoris', recetteId);
    await setDoc(ref, {
      recetteId,
      ajouteLe: serverTimestamp(),
    });

  } catch (error) {
    console.error('[firestoreService] ajouterFavori :', error);
    throw error;
  }
}

/**
 * Retire une recette des favoris d'un client.
 * @param {string} clientId
 * @param {string} recetteId
 * @returns {Promise<void>}
 */
export async function supprimerFavori(clientId, recetteId) {
  try {
    if (!clientId  || typeof clientId  !== 'string') throw new Error('supprimerFavori : clientId invalide.');
    if (!recetteId || typeof recetteId !== 'string') throw new Error('supprimerFavori : recetteId invalide.');

    const ref = doc(db, 'utilisateurs', clientId, 'favoris', recetteId);
    await deleteDoc(ref);

  } catch (error) {
    console.error('[firestoreService] supprimerFavori :', error);
    throw error;
  }
}

/**
 * Récupère la liste des recetteId mis en favoris par un client.
 * La correspondance avec les objets Recette se fait côté contrôleur
 * en croisant avec data/recettes.js (les recettes ne sont pas dans Firestore).
 * @param {string} clientId
 * @returns {Promise<Array<string>>} tableau de recetteId
 */
export async function getFavoris(clientId) {
  try {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('getFavoris : clientId invalide.');
    }

    const ref  = collection(db, 'utilisateurs', clientId, 'favoris');
    const snap = await getDocs(ref);

    return snap.docs.map(d => d.id); // le doc ID est le recetteId

  } catch (error) {
    console.error('[firestoreService] getFavoris :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  HISTORIQUE
// ─────────────────────────────────────────────────────────────

/**
 * Récupère l'historique des commandes livrées pour un client.
 * (uniquement les commandes au statut "livree")
 * @param {string} clientId
 * @returns {Promise<Array<Object>>}
 */
export async function getHistoriqueClient(clientId) {
  try {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('getHistoriqueClient : clientId invalide.');
    }

    const q    = query(
      collection(db, 'commandes'),
      where('clientId', '==', clientId),
      where('statut',   '==', 'livree'),
      orderBy('dateCreation', 'desc')
    );
    const snap = await getDocs(q);

    return snap.docs.map(d => ({ id: d.id, ...d.data() }));

  } catch (error) {
    console.error('[firestoreService] getHistoriqueClient :', error);
    throw error;
  }
}

/**
 * Récupère l'historique des commandes livrées par un livreur.
 * (commandes au statut "livree" assignées à ce livreur)
 * @param {string} livreurId
 * @returns {Promise<Array<Object>>}
 */
export async function getHistoriqueLivreur(livreurId) {
  try {
    if (!livreurId || typeof livreurId !== 'string') {
      throw new Error('getHistoriqueLivreur : livreurId invalide.');
    }

    const q    = query(
      collection(db, 'commandes'),
      where('livreurId', '==', livreurId),
      where('statut',    '==', 'livree')
    );
    const snap = await getDocs(q);

    const commandes = snap.docs.map(d => ({ id: d.id, ...d.data() }));

    // Tri côté client du plus récent au plus ancien
    commandes.sort((a, b) => {
      const da  = Date.parse(a.dateCreation || '') || 0;
      const db_ = Date.parse(b.dateCreation || '') || 0;
      return db_ - da;
    });

    return commandes;

  } catch (error) {
    console.error('[firestoreService] getHistoriqueLivreur :', error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  PRÉFÉRENCES CLIENT
// ─────────────────────────────────────────────────────────────

/**
 * Sauvegarde les préférences d'achat d'un client.
 * Stocké dans : utilisateurs/{clientId}/preferences (document unique)
 * @param {string} clientId
 * @param {Object} preferences - { budgetMax, sourcePreferee, priorite }
 * @returns {Promise<void>}
 */
export async function sauvegarderPreferences(clientId, preferences) {
  try {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('sauvegarderPreferences : clientId invalide.');
    }
    if (!preferences || typeof preferences !== 'object') {
      throw new Error('sauvegarderPreferences : preferences invalides.');
    }

    const { budgetMax, sourcePreferee, priorite } = preferences;

    if (typeof budgetMax !== 'number' || budgetMax < 0) {
      throw new Error('sauvegarderPreferences : budgetMax invalide.');
    }

    const sourcesValides   = ['souk', 'supermarche', 'mix'];
    const prioritesValides = ['moins_cher', 'plus_rapide', 'plus_frais'];

    if (!sourcesValides.includes(sourcePreferee)) {
      throw new Error(`sauvegarderPreferences : sourcePreferee invalide → "${sourcePreferee}".`);
    }
    if (!prioritesValides.includes(priorite)) {
      throw new Error(`sauvegarderPreferences : priorite invalide → "${priorite}".`);
    }

    const ref = doc(db, 'utilisateurs', clientId, 'preferences', 'prefs');
    await setDoc(ref, {
      budgetMax,
      sourcePreferee,
      priorite,
      updatedAt: serverTimestamp(),
    });

  } catch (error) {
    console.error('[firestoreService] sauvegarderPreferences :', error);
    throw error;
  }
}

/**
 * Récupère les préférences d'achat d'un client.
 * @param {string} clientId
 * @returns {Promise<Object|null>} { budgetMax, sourcePreferee, priorite } ou null
 */
export async function getPreferences(clientId) {
  try {
    if (!clientId || typeof clientId !== 'string') {
      throw new Error('getPreferences : clientId invalide.');
    }

    const ref  = doc(db, 'utilisateurs', clientId, 'preferences', 'prefs');
    const snap = await getDoc(ref);

    if (!snap.exists()) return null;

    const { budgetMax, sourcePreferee, priorite } = snap.data();
    return { budgetMax, sourcePreferee, priorite };

  } catch (error) {
    console.error('[firestoreService] getPreferences :', error);
    throw error;
  }
}
