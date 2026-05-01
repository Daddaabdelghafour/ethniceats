# EthnicEats — services/mysql_user_service.py
# User-related database operations using MySQL
from .mysql_service import get_db_connection

def sauvegarder_utilisateur(user_id, donnees):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO users (firebase_uid, email, password, role, nom, prenom, telephone)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    email=VALUES(email),
                    password=VALUES(password),
                    role=VALUES(role),
                    nom=VALUES(nom),
                    prenom=VALUES(prenom),
                    telephone=VALUES(telephone)
            ''', (
                user_id,
                donnees.get('email'),
                donnees.get('password'),
                donnees.get('role'),
                donnees.get('nom'),
                donnees.get('prenom'),
                donnees.get('telephone')
            ))
        conn.commit()
    finally:
        conn.close()

def get_utilisateur(user_id):
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute('SELECT * FROM users WHERE firebase_uid = %s', (user_id,))
            row = cur.fetchone()
            return row if row else None
    finally:
        conn.close()

def set_email_verified(user_id):
    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor() as cur:
            cur.execute('UPDATE utilisateurs SET emailVerifie = TRUE WHERE uid = %s', (user_id,))
        conn.commit()
        return True
    finally:
        conn.close()

def email_exists(email):
    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute('SELECT uid FROM utilisateurs WHERE email = %s', (email,))
            return cur.fetchone() is not None
    finally:
        conn.close()

def create_utilisateur(user_data):
    conn = get_db_connection()
    if not conn:
        return False
    try:
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO utilisateurs (uid, email, emailVerifie, nomComplet, telephone, budgetMax, preferencesDefinies, priorite, role, sourcePreferee, favoris, adresseLivraison, creeLe, ville, adresse)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ''', (
                user_data.get('uid'),
                user_data.get('email'),
                user_data.get('emailVerifie', False),
                user_data.get('nomComplet'),
                user_data.get('telephone'),
                user_data.get('budgetMax', 0),
                user_data.get('preferencesDefinies', False),
                user_data.get('priorite'),
                user_data.get('role'),
                user_data.get('sourcePreferee'),
                user_data.get('favoris'),
                user_data.get('adresseLivraison'),
                user_data.get('creeLe'),
                user_data.get('ville'),
                user_data.get('adresse')
            ))
        conn.commit()
        return True
    except Exception:
        return False
    finally:
        conn.close()
