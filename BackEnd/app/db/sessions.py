import psycopg2
from app.utils.logging import getLogger
from app.core.config import DB_HOST, DB_NAME, DB_USER, DB_PASSWORD


def get_db_connection():
    cl = getLogger()
    ser = "local"
    cl.info(f"Get DB Connection || With the database server Type is :{ser}")
    return psycopg2.connect(
        host=DB_HOST,
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )
