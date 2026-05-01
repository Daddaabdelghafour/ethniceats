# EthnicEats — services/mysql_commande_service.py
# Commande-related database operations using MySQL
from .mysql_service import get_db_connection

def sauvegarder_commande(commande):
    conn = get_db_connection()
    if not conn:
        return
    try:
        with conn.cursor() as cur:
            cur.execute('''
                INSERT INTO commandes (id, user_id, statut, livreur_id, temps_estime)
                VALUES (%s, %s, %s, %s, %s)
                ON DUPLICATE KEY UPDATE
                    user_id=VALUES(user_id),
                    statut=VALUES(statut),
                    livreur_id=VALUES(livreur_id),
                    temps_estime=VALUES(temps_estime)
            ''', (
                commande.get('id'),
                commande.get('user_id'),
                commande.get('statut'),
                commande.get('livreur_id'),
                commande.get('temps_estime')
            ))
        conn.commit()
    finally:
        conn.close()

def get_commandes_client(client_id):
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute('SELECT * FROM commandes WHERE user_id = %s ORDER BY created_at DESC', (client_id,))
            return cur.fetchall()
    finally:
        conn.close()

def get_commandes_disponibles():
    conn = get_db_connection()
    if not conn:
        return []
    try:
        with conn.cursor(dictionary=True) as cur:
            cur.execute('SELECT * FROM commandes WHERE statut = %s AND (livreur_id IS NULL OR livreur_id = "") ORDER BY created_at ASC', ("commande_passee",))
            return cur.fetchall()
    finally:
        conn.close()

def mettre_a_jour_statut_commande(commande_id, statut):
    conn = get_db_connection()
    if not conn:
        return
    try:
        archivee = True if statut == "livree" else False
        with conn.cursor() as cur:
            cur.execute('UPDATE commandes SET statut = %s, archivee = %s WHERE id = %s', (statut, archivee, commande_id))
        conn.commit()
    finally:
        conn.close()
