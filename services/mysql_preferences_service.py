# EthnicEats — services/mysql_preferences_service.py
# Preferences-related database operations using MySQL
from .mysql_service import get_db_connection

def sauvegarder_preferences(user_id, preferences):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO preferences (user_id, data)
                VALUES (%s, %s)
                ON DUPLICATE KEY UPDATE data=VALUES(data)
            ''', (user_id, str(preferences)))
        conn.commit()
    finally:
        conn.close()

def get_preferences(user_id):
    conn = get_db_connection()
    if not conn:
        return None
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute('SELECT data FROM preferences WHERE user_id = %s', (user_id,))
            row = cur.fetchone()
            return eval(row['data']) if row else None
    finally:
        conn.close()
