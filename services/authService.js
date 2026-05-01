/**
 * @file authService.js
 * @description Service d'authentification — EthnicEats (MySQL)
 *
 * Authentification basée sur des endpoints Flask + stockage local.
 */

// ─── Constantes ──────────────────────────────────────────────────────────────

const STORAGE_USER = "ee_current_user";
const SESSION_KEYS = {
  rolePending: "ee_role_pending",
  uidPending: "ee_uid_pending",
  emailPending: "ee_email_pending",
  verificationToken: "ee_verification_token",
};

const REDIRECT = {
  client: "/accueil",
  livreur: "/livreur/commandes",
  choixRole: "/",
  verification: "/verification",
};

function _rediriger(url) {
  window.location.href = url;
}

async function _fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

function _storeUser(user) {
  localStorage.setItem(STORAGE_USER, JSON.stringify(user));
}

function _clearUser() {
  localStorage.removeItem(STORAGE_USER);
}

function _getStoredUser() {
  const raw = localStorage.getItem(STORAGE_USER);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

// ─── register ────────────────────────────────────────────────────────────────

async function register(nomComplet, email, motDePasse, role, numeroContact = null) {
  try {
    const payload = {
      nomComplet,
      email,
      motDePasse,
      role,
      telephone: numeroContact,
    };
    const { ok, data } = await _fetchJson("/api/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Erreur lors de l'inscription." };
    }

    sessionStorage.setItem(SESSION_KEYS.rolePending, role);
    sessionStorage.setItem(SESSION_KEYS.uidPending, data.uid || "");
    sessionStorage.setItem(SESSION_KEYS.emailPending, email || "");
    if (data.verificationToken) {
      sessionStorage.setItem(SESSION_KEYS.verificationToken, data.verificationToken);
    }

    return { success: true, message: "Inscription réussie. Vérifiez votre email." };
  } catch (error) {
    return {
      success: false,
      message: "Erreur lors de l'inscription. Veuillez réessayer.",
    };
  }
}

// ─── login ───────────────────────────────────────────────────────────────────

async function login(email, motDePasse) {
  try {
    const { ok, data } = await _fetchJson("/api/login", {
      method: "POST",
      body: JSON.stringify({ email, motDePasse }),
    });

    if (!ok || !data.success) {
      if (data?.user?.uid) {
        sessionStorage.setItem(SESSION_KEYS.uidPending, data.user.uid);
        sessionStorage.setItem(SESSION_KEYS.rolePending, data.user.role || "");
        sessionStorage.setItem(SESSION_KEYS.emailPending, data.user.email || "");
      }
      return { success: false, role: null, message: data.message || "Connexion impossible." };
    }

    const user = data.user;
    if (!user) {
      return { success: false, role: null, message: "Profil introuvable." };
    }

    const roleChoisi = localStorage.getItem("roleChoisi");
    if (roleChoisi && roleChoisi !== user.role) {
      _clearUser();
      const roleLabel = user.role === "client" ? "client" : "livreur";
      const roleChoisiLabel = roleChoisi === "client" ? "client" : "livreur";
      return {
        success: false,
        role: null,
        message: `Ce compte est un compte ${roleLabel}. Vous avez choisi le rôle ${roleChoisiLabel}. Veuillez retourner en arrière et choisir le bon rôle.`,
      };
    }

    _storeUser(user);
    const destination = REDIRECT[user.role] ?? REDIRECT.choixRole;
    _rediriger(destination);
    return { success: true, role: user.role, message: `Connexion réussie en tant que ${user.role}.` };
  } catch (error) {
    return { success: false, role: null, message: "Erreur lors de la connexion." };
  }
}

// ─── logout ──────────────────────────────────────────────────────────────────

async function logout() {
  _clearUser();
  sessionStorage.clear();
  _rediriger(REDIRECT.choixRole);
  return { success: true, message: "Déconnexion réussie." };
}

// ─── verifierEmail ───────────────────────────────────────────────────────────

async function verifierEmail() {
  try {
    const uid = sessionStorage.getItem(SESSION_KEYS.uidPending);
    if (!uid) {
      return {
        success: false,
        role: null,
        vérifié: false,
        message: "Aucun utilisateur en attente de vérification.",
      };
    }

    const { ok, data } = await _fetchJson("/api/email/verify", {
      method: "POST",
      body: JSON.stringify({ uid }),
    });

    if (!ok || !data.success) {
      return {
        success: false,
        role: null,
        vérifié: false,
        message: data.message || "Erreur lors de la vérification.",
      };
    }

    if (data.user) {
      _storeUser(data.user);
    }

    return {
      success: true,
      role: data.role ?? null,
      vérifié: true,
      message: "Email vérifié avec succès.",
    };
  } catch (error) {
    return {
      success: false,
      role: null,
      vérifié: false,
      message: "Erreur lors de la vérification.",
    };
  }
}

// ─── modifierProfil ──────────────────────────────────────────────────────────

async function modifierProfil(userId, données = {}) {
  try {
    const { ok, data } = await _fetchJson(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(données),
    });

    if (!ok || !data.success) {
      return { success: false, emailChange: false, message: data.message || "Mise à jour impossible." };
    }

    if (data.user) {
      _storeUser(data.user);
    }

    if (data.emailChange) {
      sessionStorage.setItem(SESSION_KEYS.rolePending, data.user?.role || "");
      sessionStorage.setItem(SESSION_KEYS.uidPending, data.user?.uid || userId);
      _rediriger(REDIRECT.verification);
      return {
        success: true,
        emailChange: true,
        message: "Un email de vérification a été envoyé à votre nouvelle adresse.",
      };
    }

    return { success: true, emailChange: false, message: "Modifications enregistrées avec succès." };
  } catch (error) {
    return { success: false, emailChange: false, message: "Erreur lors de la modification." };
  }
}

// ─── modifierMotDePasse ──────────────────────────────────────────────────────

async function modifierMotDePasse(ancienMdp, nouveauMdp) {
  try {
    const user = _getStoredUser();
    if (!user) {
      return { success: false, message: "Aucun utilisateur connecté." };
    }

    const { ok, data } = await _fetchJson(`/api/users/${user.uid}/password`, {
      method: "PUT",
      body: JSON.stringify({ ancienMdp, nouveauMdp }),
    });

    if (!ok || !data.success) {
      return { success: false, message: data.message || "Impossible de modifier le mot de passe." };
    }

    return { success: true, message: "Mot de passe modifié avec succès." };
  } catch (error) {
    return { success: false, message: "Erreur lors de la modification du mot de passe." };
  }
}

// ─── getCurrentUser ──────────────────────────────────────────────────────────

async function getCurrentUser() {
  const user = _getStoredUser();
  if (!user) return null;

  const { ok, data } = await _fetchJson(`/api/users/${user.uid}`);
  if (ok && data.user) {
    _storeUser(data.user);
    return data.user;
  }

  return user;
}

async function renvoyerEmailVerification() {
  const uid = sessionStorage.getItem(SESSION_KEYS.uidPending);

  if (!uid) {
    return {
      success: false,
      message: "Aucun utilisateur en attente. Veuillez vous reconnecter.",
    };
  }

  const { ok, data } = await _fetchJson("/api/email/resend", {
    method: "POST",
    body: JSON.stringify({ uid }),
  });

  if (!ok || !data.success) {
    return { success: false, message: data.message || "Erreur lors du renvoi." };
  }

  if (data.verificationToken) {
    sessionStorage.setItem(SESSION_KEYS.verificationToken, data.verificationToken);
  }

  return { success: true, message: "Email de verification envoye." };
}

async function demanderResetMotDePasse(email) {
  const { ok, data } = await _fetchJson("/api/password/reset-request", {
    method: "POST",
    body: JSON.stringify({ email }),
  });

  if (!ok || !data.success) {
    return { success: false, message: data.message || "Erreur lors de la demande." };
  }

  return { success: true, message: data.message || "Demande envoyée." };
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
  demanderResetMotDePasse,
};
