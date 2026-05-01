# EthnicEats — services/mysql_favoris_service.py
# Favoris-related database operations using MySQL
from .mysql_service import get_db_connection

def ajouter_favori(user_id, recette_id):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute('INSERT INTO favoris (user_id, recette_id) VALUES (%s, %s)', (user_id, recette_id))
        conn.commit()
    finally:
        conn.close()

def supprimer_favori(user_id, recette_id):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute('DELETE FROM favoris WHERE user_id = %s AND recette_id = %s', (user_id, recette_id))
        conn.commit()
    finally:
        conn.close()

def get_favoris(user_id):
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute('SELECT recette_id FROM favoris WHERE user_id = %s', (user_id,))
            return [row['recette_id'] for row in cur.fetchall()]
    finally:
        conn.close()
