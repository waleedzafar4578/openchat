from dotenv import load_dotenv
import os

# Load .env file
load_dotenv()

# Access variables
DB_HOST = os.getenv("host_")
DB_NAME = os.getenv("dbname_")
DB_USER = os.getenv("user_")
DB_PASSWORD = os.getenv("password_")


