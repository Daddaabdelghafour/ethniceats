# EthnicEats — services/mysql_user_service.py
# User-related database operations using MySQL
import json
from typing import Any, Dict, Optional

from werkzeug.security import check_password_hash, generate_password_hash

from .mysql_service import get_db_connection


JSON_FIELDS = {"favoris", "adresseLivraison"}


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


def _sanitize_utilisateur(row: Optional[Dict[str, Any]]) -> Optional[Dict[str, Any]]:
    if not row:
        return None
    row = dict(row)
    row.pop("motDePasse", None)
    if "telephone" in row and "telephoneContact" not in row:
        row["telephoneContact"] = row.get("telephone")
    for field in JSON_FIELDS:
        if field in row:
            row[field] = _parse_json(row[field])
    return row


def create_utilisateur(user_data: Dict[str, Any]) -> bool:
    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor() as cur:
            mot_de_passe = user_data.get("motDePasse") or ""
            mot_de_passe_hash = generate_password_hash(mot_de_passe)
            cur.execute(
                '''
                INSERT INTO utilisateurs (
                    uid, email, motDePasse, emailVerifie, nomComplet, telephone,
                    budgetMax, preferencesDefinies, priorite, role, sourcePreferee,
                    favoris, adresseLivraison, creeLe, ville, adresse,
                    gainsTotaux, nbLivraisons, statutActuel, permisImage, verificationToken
                )
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                ''',
                (
                    user_data.get("uid"),
                    user_data.get("email"),
                    mot_de_passe_hash,
                    user_data.get("emailVerifie", False),
                    user_data.get("nomComplet"),
                    user_data.get("telephone"),
                    user_data.get("budgetMax", 0),
                    user_data.get("preferencesDefinies", False),
                    user_data.get("priorite"),
                    user_data.get("role"),
                    user_data.get("sourcePreferee"),
                    _serialize_json(user_data.get("favoris")),
                    _serialize_json(user_data.get("adresseLivraison")),
                    user_data.get("creeLe"),
                    user_data.get("ville"),
                    user_data.get("adresse"),
                    user_data.get("gainsTotaux", 0),
                    user_data.get("nbLivraisons", 0),
                    user_data.get("statutActuel", "disponible"),
                    user_data.get("permisImage"),
                    user_data.get("verificationToken"),
                ),
            )
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()


def email_exists(email: str) -> bool:
    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute("SELECT uid FROM utilisateurs WHERE email = %s", (email,))
            return cur.fetchone() is not None
    finally:
        conn.close()


def get_utilisateur(user_id: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute("SELECT * FROM utilisateurs WHERE uid = %s", (user_id,))
            row = cur.fetchone()
            return _sanitize_utilisateur(row)
    finally:
        conn.close()


def get_utilisateur_by_email(email: str) -> Optional[Dict[str, Any]]:
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute("SELECT * FROM utilisateurs WHERE email = %s", (email,))
            row = cur.fetchone()
            if not row:
                return None
            for field in JSON_FIELDS:
                if field in row:
                    row[field] = _parse_json(row[field])
            return row
    finally:
        conn.close()


def verify_password(email: str, mot_de_passe: str) -> Optional[Dict[str, Any]]:
    utilisateur = get_utilisateur_by_email(email)
    if not utilisateur:
        return None
    mot_de_passe_hash = utilisateur.get("motDePasse")
    if not mot_de_passe_hash or not check_password_hash(mot_de_passe_hash, mot_de_passe):
        return None
    return _sanitize_utilisateur(utilisateur)


def update_utilisateur(user_id: str, updates: Dict[str, Any]) -> bool:
    if not updates:
        return False
    allowed = {
        "email": "email",
        "motDePasse": "motDePasse",
        "emailVerifie": "emailVerifie",
        "nomComplet": "nomComplet",
        "telephone": "telephone",
        "budgetMax": "budgetMax",
        "preferencesDefinies": "preferencesDefinies",
        "priorite": "priorite",
        "role": "role",
        "sourcePreferee": "sourcePreferee",
        "favoris": "favoris",
        "adresseLivraison": "adresseLivraison",
        "ville": "ville",
        "adresse": "adresse",
        "gainsTotaux": "gainsTotaux",
        "nbLivraisons": "nbLivraisons",
        "statutActuel": "statutActuel",
        "permisImage": "permisImage",
        "verificationToken": "verificationToken",
        "resetToken": "resetToken",
        "resetTokenExpires": "resetTokenExpires",
    }

    fields = []
    values = []
    for key, column in allowed.items():
        if key not in updates:
            continue
        value = updates[key]
        if key == "motDePasse":
            value = generate_password_hash(value)
        if key in JSON_FIELDS:
            value = _serialize_json(value)
        fields.append(f"{column} = %s")
        values.append(value)

    if not fields:
        return False

    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor() as cur:
            cur.execute(
                f"UPDATE utilisateurs SET {', '.join(fields)} WHERE uid = %s",
                (*values, user_id),
            )
        conn.commit()
        return True
    finally:
        conn.close()


def set_email_verified(user_id: str) -> bool:
    return update_utilisateur(user_id, {"emailVerifie": True, "verificationToken": None})


def set_reset_token(email: str, token: str, expires_at) -> bool:
    utilisateur = get_utilisateur_by_email(email)
    if not utilisateur:
        return False
    return update_utilisateur(utilisateur["uid"], {"resetToken": token, "resetTokenExpires": expires_at})


def clear_reset_token(user_id: str) -> bool:
    return update_utilisateur(user_id, {"resetToken": None, "resetTokenExpires": None})


def get_preferences(user_id: str) -> Optional[Dict[str, Any]]:
    utilisateur = get_utilisateur(user_id)
    if not utilisateur:
        return None
    return {
        "budgetMax": utilisateur.get("budgetMax"),
        "sourcePreferee": utilisateur.get("sourcePreferee"),
        "priorite": utilisateur.get("priorite"),
    }


def set_preferences(user_id: str, preferences: Dict[str, Any]) -> bool:
    updates = {
        "budgetMax": preferences.get("budgetMax"),
        "sourcePreferee": preferences.get("sourcePreferee"),
        "priorite": preferences.get("priorite"),
        "preferencesDefinies": True,
    }
    return update_utilisateur(user_id, updates)


def get_favoris(user_id: str) -> list:
    utilisateur = get_utilisateur(user_id)
    favoris = utilisateur.get("favoris") if utilisateur else []
    return favoris if isinstance(favoris, list) else []


def add_favori(user_id: str, recette_id: str) -> list:
    favoris = get_favoris(user_id)
    if recette_id not in favoris:
        favoris.append(recette_id)
        update_utilisateur(user_id, {"favoris": favoris})
    return favoris


def remove_favori(user_id: str, recette_id: str) -> list:
    favoris = get_favoris(user_id)
    if recette_id in favoris:
        favoris = [fav for fav in favoris if fav != recette_id]
        update_utilisateur(user_id, {"favoris": favoris})
    return favoris
