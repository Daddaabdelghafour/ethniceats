# EthnicEats — services/mysql_commande_service.py
# Commande-related database operations using MySQL
import json
import re
from typing import Any, Dict, List, Optional

from .mysql_service import get_db_connection


JSON_FIELDS = {"panier", "pointsCollecte", "adresseLivraison"}


def _validate_columns(fields) -> bool:
    for field in fields:
        column = field.split("=", 1)[0].strip()
        if not re.match(r"^[a-zA-Z_]+$", column):
            return False
    return True


def _serialize_json(value: Any) -> Any:
    if value is None:
        return None
    if isinstance(value, (dict, list)):
        return json.dumps(value)
    return value


def _parse_json(value: Any) -> Any:
    if value is None:
        return None
    if isinstance(value, (dict, list)):
        return value
    try:
        return json.loads(value)
    except Exception:
        return value


def _hydrate_commande(row: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if not row:
        return None
    row = dict(row)
    for field in JSON_FIELDS:
        if field in row:
            row[field] = _parse_json(row[field])
    return row


def create_commande(commande: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor() as cur:
            cur.execute(
                '''
                INSERT INTO commandes (
                    id, clientId, archivee, dateCreation, fraisLivraison, livreurId,
                    livreurNom, livreurTelephone, modePaiement, nbIngredients, panier,
                    pointsCollecte, adresseLivraison, prixTotal, sourcePreferee,
                    sousTotal, statut, tempsEstime, updatedAt
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, NOW())
                ''',
                (
                    commande.get("id"),
                    commande.get("clientId"),
                    commande.get("archivee", False),
                    commande.get("dateCreation"),
                    commande.get("fraisLivraison"),
                    commande.get("livreurId"),
                    commande.get("livreurNom"),
                    commande.get("livreurTelephone"),
                    commande.get("modePaiement"),
                    commande.get("nbIngredients"),
                    _serialize_json(commande.get("panier")),
                    _serialize_json(commande.get("pointsCollecte")),
                    _serialize_json(commande.get("adresseLivraison")),
                    commande.get("prixTotal"),
                    commande.get("sourcePreferee"),
                    commande.get("sousTotal"),
                    commande.get("statut"),
                    commande.get("tempsEstime"),
                ),
            )
        conn.commit()
        return True
    finally:
        conn.close()


def update_commande(commande_id: str, updates: Dict[str, Any]) -> bool:
    if not updates:
        return False

    allowed = {
        "clientId": "clientId",
        "archivee": "archivee",
        "dateCreation": "dateCreation",
        "fraisLivraison": "fraisLivraison",
        "livreurId": "livreurId",
        "livreurNom": "livreurNom",
        "livreurTelephone": "livreurTelephone",
        "modePaiement": "modePaiement",
        "nbIngredients": "nbIngredients",
        "panier": "panier",
        "pointsCollecte": "pointsCollecte",
        "adresseLivraison": "adresseLivraison",
        "prixTotal": "prixTotal",
        "sourcePreferee": "sourcePreferee",
        "sousTotal": "sousTotal",
        "statut": "statut",
        "tempsEstime": "tempsEstime",
    }

    if updates.get("statut") == "livree" and "archivee" not in updates:
        updates = {**updates, "archivee": True}

    fields = []
    values = []
    for key, column in allowed.items():
        if key not in updates:
            continue
        value = updates[key]
        if key in JSON_FIELDS:
            value = _serialize_json(value)
        fields.append(f"{column} = %s")
        values.append(value)

    if not fields:
        return False

    if not _validate_columns(fields):
        return False

    fields.append("updatedAt = NOW()")

    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE commandes SET {', '.join(fields)} WHERE id = %s",
                (*values, commande_id),
            )
        conn.commit()
        return True
    finally:
        conn.close()


def get_commande(commande_id: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute("SELECT * FROM commandes WHERE id = %s", (commande_id,))
            row = cur.fetchone()
            return _hydrate_commande(row)
    finally:
        conn.close()


def get_commandes_client(client_id: str) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                "SELECT * FROM commandes WHERE clientId = %s ORDER BY dateCreation DESC",
                (client_id,),
            )
            return [_hydrate_commande(row) for row in cur.fetchall()]
    finally:
        conn.close()


def get_commandes_disponibles() -> List[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                '''
                SELECT * FROM commandes
                WHERE statut = %s AND (livreurId IS NULL OR livreurId = '')
                ORDER BY dateCreation ASC
                ''',
                ("commande_passee",),
            )
            return [_hydrate_commande(row) for row in cur.fetchall()]
    finally:
        conn.close()


def get_commandes_livreur(livreur_id: str, statuts: Optional[List[str]] = None) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            if statuts:
                placeholders = ", ".join(["%s"] * len(statuts))
                sql = (
                    f"SELECT * FROM commandes WHERE livreurId = %s "
                    f"AND statut IN ({placeholders}) ORDER BY dateCreation ASC"
                )
                cur.execute(sql, (livreur_id, *statuts))
            else:
                cur.execute(
                    "SELECT * FROM commandes WHERE livreurId = %s ORDER BY dateCreation ASC",
                    (livreur_id,),
                )
            return [_hydrate_commande(row) for row in cur.fetchall()]
    finally:
        conn.close()


def get_historique_client(client_id: str) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                '''
                SELECT * FROM commandes
                WHERE clientId = %s AND statut = %s
                ORDER BY dateCreation DESC
                ''',
                (client_id, "livree"),
            )
            return [_hydrate_commande(row) for row in cur.fetchall()]
    finally:
        conn.close()


def get_historique_livreur(livreur_id: str) -> List[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute(
                '''
                SELECT * FROM commandes
                WHERE livreurId = %s AND statut = %s
                ORDER BY dateCreation DESC
                ''',
                (livreur_id, "livree"),
            )
            return [_hydrate_commande(row) for row in cur.fetchall()]
    finally:
        conn.close()
