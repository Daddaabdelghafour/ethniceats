/**
 * @file authService.js
 * @description Service d'authentification — EthnicEats
 *
 * Gère l'inscription, la connexion, la déconnexion, la vérification email (OTP),
 * la modification de profil et du mot de passe pour les rôles "client" et "livreur".
 *
 * Authentification uniquement par email + mot de passe (Firebase Auth).
 * La vérification OTP se fait par email via sendEmailVerification().
 * Le numéro telephoneContact du livreur est stocké dans Firestore, jamais utilisé
 * pour l'authentification.
 *
 * Architecture MVC : ce service est consommé par les contrôleurs uniquement.
 * Il n'accède ni au DOM ni aux vues.
 *
 * Dépendances :
 *   - services/firebase.js  (exports : auth, db)
 *   - models/utilisateur.js (validation locale)
 *   - models/client.js
 *   - models/livreur.js
 */

import {
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  verifyBeforeUpdateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  serverTimestamp,
} from "https://www.gstatic.com/firebasejs/11.6.0/firebase-firestore.js";

import { auth, db } from "./firebase.js";

// ─── Constantes ──────────────────────────────────────────────────────────────

/** Collection Firestore qui stocke les profils utilisateurs */
const USERS_COLLECTION = "utilisateurs";

/** Pages de redirection selon le rôle */
const REDIRECT = {
  client:  "/accueil",
  livreur: "/livreur/commandes",
  choixRole: "/",
  verification: "/verification",
};

function _emailVerificationSettings() {
  return {
    url: `${window.location.origin}/verification`,
    handleCodeInApp: false,
  };
}

async function _sendEmailVerification(user) {
  try {
    await sendEmailVerification(user, _emailVerificationSettings());
  } catch (error) {
    const continueUrlErrors = [
      "auth/unauthorized-continue-uri",
      "auth/invalid-continue-uri",
      "auth/missing-continue-uri",
    ];

    if (!continueUrlErrors.includes(error.code)) {
      throw error;
    }

    console.warn(
      "[authService] URL de retour non autorisee par Firebase. " +
      "Envoi de l'email de verification sans continueUrl.",
      error.code
    );
    await sendEmailVerification(user);
  }
}

// ─── Helpers privés ──────────────────────────────────────────────────────────

/**
 * Récupère le document Firestore d'un utilisateur.
 * @param {string} uid
 * @returns {Promise<Object|null>} données du profil ou null si inexistant
 */
async function _getProfilFirestore(uid) {
  const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snap.exists() ? snap.data() : null;
}

/**
 * Redirige la fenêtre courante vers une URL.
 * Isolé ici pour faciliter les tests unitaires (mock facile).
 * @param {string} url
 */
function _rediriger(url) {
  window.location.href = url;
}

// ─── register ────────────────────────────────────────────────────────────────

/**
 * Inscrit un nouvel utilisateur via backend, puis envoie l'email de vérification via Firebase.
 */
async function register(nomComplet, email, motDePasse, role, numeroContact = null) {
  try {
    const payload = {
      nomComplet,
      email,
      motDePasse,
      role,
      telephone: numeroContact,
    };
    // 1. Inscription côté backend (MySQL)
    const response = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await response.json();
    if (!data.success) return data;

    // 2. Créer un compte temporaire Firebase uniquement pour la vérification email
    const auth = getAuth();
    let firebaseUser;
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, motDePasse);
      firebaseUser = cred.user;
    } catch (e) {
      // Si l'utilisateur existe déjà dans Firebase, on le récupère
      const signIn = await import("https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js");
      const cred = await signIn.signInWithEmailAndPassword(auth, email, motDePasse);
      firebaseUser = cred.user;
    }
    await sendEmailVerification(firebaseUser);
    return { success: true, message: "Inscription réussie. Vérifiez votre email." };
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors de l'inscription ou de la vérification email.",
    };
  }
}

// ─── login ───────────────────────────────────────────────────────────────────

/**
 * Connecte un utilisateur existant par email + mot de passe.
 *
 * Étapes :
 *  1. Connexion Firebase Auth.
 *  2. Vérification que l'email est bien validé (OTP confirmé).
 *  3. Récupération du rôle depuis Firestore.
 *  4. Redirection vers l'interface correspondant au rôle.
 *
 * @param {string} email
 * @param {string} motDePasse
 * @returns {Promise<{ success: boolean, role: string|null, message: string }>}
 */
async function login(email, motDePasse) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, motDePasse);
    const user = userCredential.user;

    // ── Vérification email obligatoire ────────────────────────────────────
    if (!user.emailVerified) {
      // Renvoyer l'email de vérification si nécessaire
      await _sendEmailVerification(user);
      await signOut(auth); // on déconnecte pour éviter un état partiel
      return {
        success: false,
        role: null,
        message:
          "Votre email n'est pas encore vérifié. Un nouveau lien de vérification vient d'être envoyé.",
      };
    }

    // ── Récupération du profil Firestore ──────────────────────────────────
    const profil = await _getProfilFirestore(user.uid);
    if (!profil) {
      await signOut(auth);
      return {
        success: false,
        role: null,
        message: "Profil introuvable. Veuillez contacter le support.",
      };
    }

    const role = profil.role;

    // ── Vérification que le rôle choisi correspond au rôle du compte ──────
    const roleChoisi = localStorage.getItem("roleChoisi");
    if (roleChoisi && roleChoisi !== role) {
      await signOut(auth);
      const roleLabel = role === "client" ? "client" : "livreur";
      const roleChoisiLabel = roleChoisi === "client" ? "client" : "livreur";
      return {
        success: false,
        role: null,
        message: `Ce compte est un compte ${roleLabel}. Vous avez choisi le rôle ${roleChoisiLabel}. Veuillez retourner en arrière et choisir le bon rôle.`,
      };
    }

    // ── Mise à jour du champ emailVerifie dans Firestore si nécessaire ────
    if (!profil.emailVerifie) {
      await updateDoc(doc(db, USERS_COLLECTION, user.uid), { emailVerifie: true });
    }

    // ── Redirection selon le rôle ─────────────────────────────────────────
    const destination = REDIRECT[role] ?? REDIRECT.choixRole;
    _rediriger(destination);

    return { success: true, role, message: `Connexion réussie en tant que ${role}.` };

  } catch (error) {
    const message = _traduireErreurAuth(error);
    console.error("[authService.login]", error.code, error.message);
    return { success: false, role: null, message };
  }
}

// ─── logout ──────────────────────────────────────────────────────────────────

/**
 * Déconnecte l'utilisateur courant et redirige vers le choix du rôle.
 *
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function logout() {
  try {
    await signOut(auth);
    sessionStorage.clear(); // nettoie les données temporaires de session
    _rediriger(REDIRECT.choixRole);
    return { success: true, message: "Déconnexion réussie." };
  } catch (error) {
    console.error("[authService.logout]", error.message);
    return { success: false, message: "Erreur lors de la déconnexion. Veuillez réessayer." };
  }
}

// ─── verifierEmail ───────────────────────────────────────────────────────────

/**
 * Vérifie que l'email de l'utilisateur a été validé (lien OTP cliqué).
 *
 * Firebase ne fournit pas d'API pour "saisir un code" côté client :
 * la vérification se fait en rechargeant le token Auth après que
 * l'utilisateur a cliqué sur le lien reçu par email.
 *
 * Comportement :
 *  - Recharge le token Firebase (user.reload()) pour obtenir l'état à jour.
 *  - Si l'email est vérifié → met à jour Firestore puis retourne { vérifié: true }.
 *  - Sinon → retourne { vérifié: false } + un message d'attente.
 *
 * La redirection (preferences / accueil / commandes) est gérée par le contrôleur
 * `authController.handleVerificationOTP()` et non ici.
 *
 * Appelé par le contrôleur de la page verification.html (bouton "Vérifier"
 * ou check automatique après retour de l'email de vérification).
 *
 * @returns {Promise<{ success: boolean, role: string|null, vérifié: boolean, message: string }>}
 */
async function verifierEmail() {
  try {
    const user = auth.currentUser;
    if (!user) {
      return {
        success: false,
        role: null,
        vérifié: false,
        message: "Aucun utilisateur connecté. Veuillez vous reconnecter.",
      };
    }

    // Recharge l'état Firebase pour obtenir emailVerified à jour
    await user.reload();

    if (!user.emailVerified) {
      return {
        success: true,
        role: null,
        vérifié: false,
        message:
          "Email non encore vérifié. Cliquez sur le lien reçu dans votre boîte mail, puis réessayez.",
      };
    }

    // ── Mise à jour Firestore ─────────────────────────────────────────────
    const profil = await _getProfilFirestore(user.uid);
    if (profil && !profil.emailVerifie) {
      await updateDoc(doc(db, USERS_COLLECTION, user.uid), { emailVerifie: true });
    }

    const role = profil?.role ?? sessionStorage.getItem("ee_role_pending");

    return {
      success: true,
      role: role ?? null,
      vérifié: true,
      message: "Email vérifié avec succès.",
    };

  } catch (error) {
    console.error("[authService.verifierEmail]", error.message);
    return {
      success: false,
      role: null,
      vérifié: false,
      message: "Erreur lors de la vérification : " + error.message,
    };
  }
}

// ─── modifierProfil ──────────────────────────────────────────────────────────

/**
 * Modifie le profil de l'utilisateur connecté.
 *
 * Règles métier (conformes à la description de l'application) :
 *  - Modification du nom seul (et/ou telephoneContact pour livreur) :
 *      → mise à jour directe dans Firestore, sans OTP.
 *  - Modification de l'email :
 *      → envoie un email de vérification au NOUVEL email via verifyBeforeUpdateEmail().
 *      → Firestore est mis à jour après que l'utilisateur aura cliqué le lien
 *         (géré par verifierEmail() lors du prochain appel).
 *      → redirige vers l'écran de vérification.
 *
 * @param {string} userId   - UID Firebase de l'utilisateur
 * @param {Object} données  - Champs à mettre à jour :
 *                              { nomComplet?, email?, telephoneContact? }
 * @returns {Promise<{ success: boolean, emailChange: boolean, message: string }>}
 */
async function modifierProfil(userId, données = {}) {
  try {
    const user = auth.currentUser;
    if (!user || user.uid !== userId) {
      throw new Error("Utilisateur non authentifié ou identifiant incorrect.");
    }

    const miseAJourFirestore = {};
    let emailChange = false;

    // ── Modification du nom complet ───────────────────────────────────────
    if (données.nomComplet !== undefined) {
      const nom = données.nomComplet.trim();
      if (nom.length < 2) {
        throw new Error("Le nom complet doit contenir au moins 2 caractères.");
      }
      miseAJourFirestore.nomComplet = nom;
    }

    // ── Modification du numéro de contact (livreur uniquement) ───────────
    if (données.telephoneContact !== undefined) {
      const tel = données.telephoneContact.trim();
      if (!/^\+?[\d\s\-()]{8,15}$/.test(tel)) {
        throw new Error(`Numéro de contact invalide : "${tel}".`);
      }
      miseAJourFirestore.telephoneContact = tel;
    }

    // ── Modification de l'email ───────────────────────────────────────────
    if (données.email !== undefined) {
      const nouvelEmail = données.email.trim().toLowerCase();
      if (nouvelEmail === user.email) {
        // Pas de changement réel → on ignore silencieusement
      } else {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(nouvelEmail)) {
          throw new Error(`Email invalide : "${nouvelEmail}".`);
        }

        // verifyBeforeUpdateEmail envoie un lien au NOUVEL email.
        // Firebase ne met à jour l'email Auth qu'après clic sur le lien.
        await verifyBeforeUpdateEmail(user, nouvelEmail);

        // On marque emailVerifie = false en attendant la confirmation
        miseAJourFirestore.emailVerifie    = false;
        miseAJourFirestore.emailEnAttente  = nouvelEmail;

        emailChange = true;
      }
    }

    // ── Persistance Firestore ─────────────────────────────────────────────
    if (Object.keys(miseAJourFirestore).length > 0) {
      await updateDoc(doc(db, USERS_COLLECTION, userId), miseAJourFirestore);
    }

    // ── Redirection si changement d'email ─────────────────────────────────
    if (emailChange) {
      sessionStorage.setItem("ee_role_pending", (await _getProfilFirestore(userId))?.role ?? "");
      _rediriger(REDIRECT.verification);
      return {
        success: true,
        emailChange: true,
        message:
          "Un email de vérification a été envoyé à votre nouvelle adresse. " +
          "Cliquez sur le lien pour finaliser la modification.",
      };
    }

    return {
      success: true,
      emailChange: false,
      message: "Modifications enregistrées avec succès.",
    };

  } catch (error) {
    const message = _traduireErreurAuth(error);
    console.error("[authService.modifierProfil]", error.code ?? "", error.message);
    return { success: false, emailChange: false, message };
  }
}

// ─── modifierMotDePasse ──────────────────────────────────────────────────────

/**
 * Modifie le mot de passe de l'utilisateur connecté.
 *
 * Règles métier :
 *  - Vérifie l'ancien mot de passe via ré-authentification Firebase.
 *  - Met à jour le mot de passe sans étape OTP supplémentaire.
 *
 * @param {string} ancienMdp   - Mot de passe actuel (pour ré-authentification)
 * @param {string} nouveauMdp  - Nouveau mot de passe (≥ 6 caractères)
 * @returns {Promise<{ success: boolean, message: string }>}
 */
async function modifierMotDePasse(ancienMdp, nouveauMdp) {
  try {
    const user = auth.currentUser;
    if (!user) {
      throw new Error("Aucun utilisateur connecté.");
    }

    if (!nouveauMdp || nouveauMdp.length < 6) {
      throw new Error("Le nouveau mot de passe doit contenir au moins 6 caractères.");
    }

    // ── Ré-authentification pour valider l'ancien mot de passe ────────────
    const credential = EmailAuthProvider.credential(user.email, ancienMdp);
    await reauthenticateWithCredential(user, credential);

    // ── Mise à jour du mot de passe ───────────────────────────────────────
    await updatePassword(user, nouveauMdp);

    return { success: true, message: "Mot de passe modifié avec succès." };

  } catch (error) {
    const message = _traduireErreurAuth(error);
    console.error("[authService.modifierMotDePasse]", error.code ?? "", error.message);
    return { success: false, message };
  }
}

// ─── getCurrentUser ──────────────────────────────────────────────────────────

/**
 * Retourne l'utilisateur actuellement connecté avec son rôle Firestore.
 *
 * Résout l'état Auth de manière fiable en attendant l'initialisation Firebase
 * (évite le flash "null" au premier chargement).
 *
 * @returns {Promise<{ uid: string, email: string, role: string,
 *                     nomComplet: string, emailVerifie: boolean,
 *                     profil: Object } | null>}
 *          null si aucun utilisateur connecté
 */
async function getCurrentUser() {
  return new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      unsubscribe(); // on écoute une seule fois

      if (!user) {
        resolve(null);
        return;
      }

      try {
        const profil = await _getProfilFirestore(user.uid);
        if (!profil) {
          resolve(null);
          return;
        }

        resolve({
          uid:          user.uid,
          email:        user.email,
          role:         profil.role,
          nomComplet:   profil.nomComplet,
          emailVerifie: user.emailVerified,
          profil,        // profil Firestore complet (pour les contrôleurs)
        });
      } catch (err) {
        console.error("[authService.getCurrentUser]", err.message);
        resolve(null);
      }
    });
  });
}


async function renvoyerEmailVerification() {
  const user = auth.currentUser;

  if (!user) {
    return {
      success: false,
      message: "Aucun utilisateur connecte. Veuillez vous reconnecter.",
    };
  }

  try {
    await _sendEmailVerification(user);
    sessionStorage.setItem("ee_email_pending", user.email || "");
    return {
      success: true,
      message: "Email de verification envoye.",
    };
  } catch (error) {
    const message = _traduireErreurAuth(error);
    console.error("[authService.renvoyerEmailVerification]", error.code ?? "", error.message);
    return { success: false, message };
  }
}


// ─── _traduireErreurAuth ─────────────────────────────────────────────────────

/**
 * Traduit les codes d'erreur Firebase Auth en messages français lisibles.
 * @param {Error} error
 * @returns {string}
 */
function _traduireErreurAuth(error) {
  const codes = {
    "auth/email-already-in-use":     "Cette adresse email est déjà utilisée par un autre compte.",
    "auth/invalid-email":            "L'adresse email saisie est invalide.",
    "auth/weak-password":            "Le mot de passe est trop faible (minimum 6 caractères).",
    "auth/user-not-found":           "Aucun compte trouvé avec cet email.",
    "auth/wrong-password":           "Mot de passe incorrect.",
    "auth/invalid-credential":       "Identifiants incorrects. Vérifiez votre email et mot de passe.",
    "auth/too-many-requests":        "Trop de tentatives. Compte temporairement bloqué. Réessayez plus tard.",
    "auth/network-request-failed":   "Erreur réseau. Vérifiez votre connexion internet.",
    "auth/user-disabled":            "Ce compte a été désactivé.",
    "auth/requires-recent-login":    "Cette action requiert une reconnexion récente. Veuillez vous reconnecter.",
    "auth/operation-not-allowed":    "Cette opération n'est pas autorisée.",
    "auth/unauthorized-continue-uri": "Le domaine de redirection n'est pas autorise dans Firebase Authentication.",
    "auth/invalid-continue-uri":      "L'URL de verification email est invalide.",
    "auth/missing-continue-uri":      "L'URL de verification email est manquante.",
  };

  if (error.code && codes[error.code]) {
    return codes[error.code];
  }

  // Erreur locale (validation) ou message inconnu
  return error.message || "Une erreur inattendue est survenue. Veuillez réessayer.";
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export {
  register,
  login,
  logout,
  verifierEmail,
  modifierProfil,
  modifierMotDePasse,
  getCurrentUser,
  renvoyerEmailVerification,
};
