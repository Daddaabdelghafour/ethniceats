# MySQL connection service for EthnicEats
import mysql.connector
from mysql.connector import Error

# Update these with your MySQL server details
MYSQL_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'khaoula',
    'database': 'ethniceats'
}

def get_db_connection():
    try:
        conn = mysql.connector.connect(**MYSQL_CONFIG)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
