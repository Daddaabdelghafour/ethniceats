// ============================================================
//  EthnicEats — services/firestoreService.js
//  Couche d'accès MySQL via API Flask
// ============================================================

async function _fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, data };
}

// ─────────────────────────────────────────────────────────────
//  UTILISATEURS
// ─────────────────────────────────────────────────────────────

export async function sauvegarderUtilisateur(userId, données) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("sauvegarderUtilisateur : userId invalide.");
    }
    if (!données || typeof données !== "object") {
      throw new Error("sauvegarderUtilisateur : données invalides.");
    }

    const { ok, data } = await _fetchJson(`/api/users/${userId}`, {
      method: "PUT",
      body: JSON.stringify(données),
    });

    if (!ok || !data.success) {
      throw new Error(data.message || "Erreur lors de la sauvegarde.");
    }
  } catch (error) {
    console.error("[firestoreService] sauvegarderUtilisateur :", error);
    throw error;
  }
}

export async function getUtilisateur(userId) {
  try {
    if (!userId || typeof userId !== "string") {
      throw new Error("getUtilisateur : userId invalide.");
    }

    const { ok, data } = await _fetchJson(`/api/users/${userId}`);
    if (!ok || !data.success) return null;
    return data.user ?? null;
  } catch (error) {
    console.error("[firestoreService] getUtilisateur :", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  COMMANDES
// ─────────────────────────────────────────────────────────────

export async function sauvegarderCommande(commande) {
  try {
    if (!commande || typeof commande !== "object") {
      throw new Error("sauvegarderCommande : commande invalide.");
    }
    if (!commande.id || typeof commande.id !== "string") {
      throw new Error("sauvegarderCommande : commande.id est obligatoire.");
    }

    const isCreate = Boolean(commande.clientId) || Boolean(commande.panier);
    const url = isCreate ? "/api/commandes" : `/api/commandes/${commande.id}`;
    const method = isCreate ? "POST" : "PUT";
    const payload = isCreate ? commande : { ...commande };

    const { ok, data } = await _fetchJson(url, {
      method,
      body: JSON.stringify(payload),
    });

    if (!ok || !data.success) {
      throw new Error(data.message || "Erreur lors de la sauvegarde.");
    }
  } catch (error) {
    console.error("[firestoreService] sauvegarderCommande :", error);
    throw error;
  }
}

export async function getCommande(commandeId) {
  try {
    if (!commandeId || typeof commandeId !== "string") {
      throw new Error("getCommande : commandeId invalide.");
    }
    const { ok, data } = await _fetchJson(`/api/commandes/${commandeId}`);
    if (!ok || !data.success) return null;
    return data.commande ?? null;
  } catch (error) {
    console.error("[firestoreService] getCommande :", error);
    throw error;
  }
}

export async function getCommandesClient(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      throw new Error("getCommandesClient : clientId invalide.");
    }
    const { ok, data } = await _fetchJson(`/api/commandes?clientId=${clientId}`);
    if (!ok || !data.success) return [];
    return data.commandes ?? [];
  } catch (error) {
    console.error("[firestoreService] getCommandesClient :", error);
    throw error;
  }
}

export async function getCommandesDisponibles() {
  try {
    const { ok, data } = await _fetchJson("/api/commandes/disponibles");
    if (!ok || !data.success) return [];
    return data.commandes ?? [];
  } catch (error) {
    console.error("[firestoreService] getCommandesDisponibles :", error);
    throw error;
  }
}

export async function getCommandesLivreurEnCours(livreurId, statuts = null) {
  try {
    if (!livreurId || typeof livreurId !== "string") {
      throw new Error("getCommandesLivreurEnCours : livreurId invalide.");
    }
    const url = statuts && statuts.length
      ? `/api/commandes?livreurId=${livreurId}&statut=${statuts.join(",")}`
      : `/api/commandes/livreur/en-cours?livreurId=${livreurId}`;
    const { ok, data } = await _fetchJson(url);
    if (!ok || !data.success) return [];
    return data.commandes ?? [];
  } catch (error) {
    console.error("[firestoreService] getCommandesLivreurEnCours :", error);
    throw error;
  }
}

export async function mettreAJourStatutCommande(commandeId, statut) {
  try {
    if (!commandeId || typeof commandeId !== "string") {
      throw new Error("mettreAJourStatutCommande : commandeId invalide.");
    }

    const statutsValides = [
      "commande_passee",
      "confirmee",
      "en_preparation",
      "en_livraison",
      "arrive",
      "livree",
    ];
    if (!statutsValides.includes(statut)) {
      throw new Error(`mettreAJourStatutCommande : statut invalide → "${statut}".`);
    }

    const { ok, data } = await _fetchJson(`/api/commandes/${commandeId}`, {
      method: "PUT",
      body: JSON.stringify({ statut }),
    });

    if (!ok || !data.success) {
      throw new Error(data.message || "Erreur lors de la mise à jour.");
    }
  } catch (error) {
    console.error("[firestoreService] mettreAJourStatutCommande :", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  FAVORIS
// ─────────────────────────────────────────────────────────────

export async function ajouterFavori(clientId, recetteId) {
  try {
    if (!clientId || typeof clientId !== "string") throw new Error("ajouterFavori : clientId invalide.");
    if (!recetteId || typeof recetteId !== "string") throw new Error("ajouterFavori : recetteId invalide.");

    const { ok, data } = await _fetchJson(`/api/users/${clientId}/favoris`, {
      method: "POST",
      body: JSON.stringify({ recetteId }),
    });
    if (!ok || !data.success) throw new Error(data.message || "Erreur lors de l'ajout.");
  } catch (error) {
    console.error("[firestoreService] ajouterFavori :", error);
    throw error;
  }
}

export async function supprimerFavori(clientId, recetteId) {
  try {
    if (!clientId || typeof clientId !== "string") throw new Error("supprimerFavori : clientId invalide.");
    if (!recetteId || typeof recetteId !== "string") throw new Error("supprimerFavori : recetteId invalide.");

    const { ok, data } = await _fetchJson(`/api/users/${clientId}/favoris/${recetteId}`, {
      method: "DELETE",
    });
    if (!ok || !data.success) throw new Error(data.message || "Erreur lors de la suppression.");
  } catch (error) {
    console.error("[firestoreService] supprimerFavori :", error);
    throw error;
  }
}

export async function getFavoris(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      throw new Error("getFavoris : clientId invalide.");
    }

    const { ok, data } = await _fetchJson(`/api/users/${clientId}/favoris`);
    if (!ok || !data.success) return [];
    return data.favoris ?? [];
  } catch (error) {
    console.error("[firestoreService] getFavoris :", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  HISTORIQUE
// ─────────────────────────────────────────────────────────────

export async function getHistoriqueClient(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      throw new Error("getHistoriqueClient : clientId invalide.");
    }
    const { ok, data } = await _fetchJson(`/api/commandes/historique?clientId=${clientId}`);
    if (!ok || !data.success) return [];
    return data.commandes ?? [];
  } catch (error) {
    console.error("[firestoreService] getHistoriqueClient :", error);
    throw error;
  }
}

export async function getHistoriqueLivreur(livreurId) {
  try {
    if (!livreurId || typeof livreurId !== "string") {
      throw new Error("getHistoriqueLivreur : livreurId invalide.");
    }
    const { ok, data } = await _fetchJson(`/api/commandes/historique?livreurId=${livreurId}`);
    if (!ok || !data.success) return [];
    return data.commandes ?? [];
  } catch (error) {
    console.error("[firestoreService] getHistoriqueLivreur :", error);
    throw error;
  }
}

// ─────────────────────────────────────────────────────────────
//  PRÉFÉRENCES CLIENT
// ─────────────────────────────────────────────────────────────

export async function sauvegarderPreferences(clientId, preferences) {
  try {
    if (!clientId || typeof clientId !== "string") {
      throw new Error("sauvegarderPreferences : clientId invalide.");
    }
    if (!preferences || typeof preferences !== "object") {
      throw new Error("sauvegarderPreferences : preferences invalides.");
    }

    const { ok, data } = await _fetchJson(`/api/users/${clientId}/preferences`, {
      method: "PUT",
      body: JSON.stringify(preferences),
    });
    if (!ok || !data.success) throw new Error(data.message || "Erreur lors de l'enregistrement.");
  } catch (error) {
    console.error("[firestoreService] sauvegarderPreferences :", error);
    throw error;
  }
}

export async function getPreferences(clientId) {
  try {
    if (!clientId || typeof clientId !== "string") {
      throw new Error("getPreferences : clientId invalide.");
    }

    const { ok, data } = await _fetchJson(`/api/users/${clientId}/preferences`);
    if (!ok || !data.success) return null;
    return data.preferences ?? null;
  } catch (error) {
    console.error("[firestoreService] getPreferences :", error);
    throw error;
  }
}
