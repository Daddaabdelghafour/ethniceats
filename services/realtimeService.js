// ============================================================
//  EthnicEats — services/realtimeService.js
//  Polling simple via API Flask (remplacement Firebase RTDB)
// ============================================================

const POLL_INTERVAL_MS = 3000;

async function _fetchJson(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json", ...(options.headers || {}) },
    ...options,
  });
  try {
    const data = await res.json();
    return { ok: res.ok, data };
  } catch (error) {
    console.warn("[realtimeService] Réponse JSON invalide", error);
    return { ok: false, data: {} };
  }
}

function _createPoller(fn) {
  let active = true;
  const tick = async () => {
    if (!active) return;
    try {
      await fn();
    } catch (error) {
      console.error("[realtimeService] Polling error", error);
    }
  };
  tick();
  const id = setInterval(tick, POLL_INTERVAL_MS);
  return {
    type: "interval",
    id,
    stop() {
      active = false;
      clearInterval(id);
    },
  };
}

// ─── API publique ──────────────────────────────────────────────────────────────

export function ecouterStatutCommande(commandeId, callback) {
  if (!commandeId || typeof commandeId !== "string") {
    throw new Error("ecouterStatutCommande : commandeId est obligatoire.");
  }
  if (typeof callback !== "function") {
    throw new Error("ecouterStatutCommande : callback doit être une fonction.");
  }

  let dernierStatut = null;

  return _createPoller(async () => {
    const { ok, data } = await _fetchJson(`/api/commandes/${commandeId}`);
    if (!ok || !data.success || !data.commande) {
      callback(null, new Error("Commande introuvable."));
      return;
    }
    const statut = data.commande.statut ?? null;
    if (statut !== dernierStatut) {
      dernierStatut = statut;
      callback(statut, null);
    }
  });
}

export async function mettreAJourStatutRealtime(commandeId, statut) {
  if (!commandeId || typeof commandeId !== "string") {
    throw new Error("mettreAJourStatutRealtime : commandeId est obligatoire.");
  }
  const { ok, data } = await _fetchJson(`/api/commandes/${commandeId}`, {
    method: "PUT",
    body: JSON.stringify({ statut }),
  });
  if (!ok || !data.success) {
    throw new Error(data.message || "Erreur lors de la mise à jour du statut.");
  }
}

export function ecouterNouvellesCommandes(callback) {
  if (typeof callback !== "function") {
    throw new Error("ecouterNouvellesCommandes : callback doit être une fonction.");
  }

  return _createPoller(async () => {
    const { ok, data } = await _fetchJson("/api/commandes/disponibles");
    if (!ok || !data.success) {
      callback([], new Error("Impossible de charger les commandes disponibles."));
      return;
    }
    const ids = (data.commandes ?? []).map((commande) => commande.id);
    callback(ids, null);
  });
}

export function ecouterInfosLivreur(idOrLivreurId, callback) {
  if (!idOrLivreurId || typeof idOrLivreurId !== "string") {
    throw new Error("ecouterInfosLivreur : identifiant requis.");
  }
  if (typeof callback !== "function") {
    throw new Error("ecouterInfosLivreur : callback doit être une fonction.");
  }

  const isCommandeId = idOrLivreurId.startsWith("ORD-");

  return _createPoller(async () => {
    let livreurId = idOrLivreurId;

    if (isCommandeId) {
      const { ok, data } = await _fetchJson(`/api/commandes/${idOrLivreurId}`);
      if (!ok || !data.success || !data.commande?.livreurId) {
        callback(null, null);
        return;
      }
      livreurId = data.commande.livreurId;
    }

    const { ok, data } = await _fetchJson(`/api/users/${livreurId}`);
    if (!ok || !data.success || !data.user) {
      callback(null, null);
      return;
    }
    const { nomComplet, telephone } = data.user;
    callback({ nomComplet, telephoneContact: telephone }, null);
  });
}

export function stopperEcoute(reference) {
  if (!reference) return;
  if (typeof reference.stop === "function") {
    reference.stop();
  } else if (reference.type === "interval") {
    clearInterval(reference.id);
  }
}

export async function publierCommandeDisponible() {
  return;
}

export async function retirerCommandeDisponible() {
  return;
}

export async function initialiserCommandeRealtime() {
  return;
}

export async function assignerLivreurRealtime(commandeId, livreurId) {
  if (!commandeId || typeof commandeId !== "string") {
    throw new Error("assignerLivreurRealtime : commandeId est obligatoire.");
  }
  if (!livreurId || typeof livreurId !== "string") {
    throw new Error("assignerLivreurRealtime : livreurId est obligatoire.");
  }

  const { ok, data } = await _fetchJson(`/api/commandes/${commandeId}`, {
    method: "PUT",
    body: JSON.stringify({ livreurId, statut: "confirmee" }),
  });

  if (!ok || !data.success) {
    throw new Error(data.message || "Impossible d'assigner le livreur.");
  }
}
