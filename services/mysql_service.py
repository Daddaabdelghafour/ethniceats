# MySQL connection service for EthnicEats
import os

import mysql.connector
from mysql.connector import Error


def _env(*names, default=None):
    for name in names:
        value = os.environ.get(name)
        if value:
            return value
    return default


# Env-first configuration (Aiven/MySQL)
MYSQL_CONFIG = {
    'host': _env('AIVEN_MYSQL_HOST', 'MYSQL_HOST', default='localhost'),
    'port': int(_env('AIVEN_MYSQL_PORT', 'MYSQL_PORT', default='3306')),
    'user': _env('AIVEN_MYSQL_USER', 'MYSQL_USER', default='root'),
    'password': _env('AIVEN_MYSQL_PASSWORD', 'MYSQL_PASSWORD', default=''),
    'database': _env('AIVEN_MYSQL_DATABASE', 'MYSQL_DATABASE', default='ethniceats'),
}

ssl_ca = _env('AIVEN_MYSQL_SSL_CA', 'MYSQL_SSL_CA')
if ssl_ca:
    MYSQL_CONFIG['ssl_ca'] = ssl_ca
    MYSQL_CONFIG['ssl_verify_cert'] = True

def get_db_connection():
    try:
        conn = mysql.connector.connect(**MYSQL_CONFIG)
        return conn
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
