import os
from os.path import join, dirname
from dotenv import load_dotenv

dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)

JWT_SECRET = os.environ.get("JWT_SECRET")
MAIL_PASSWORD = os.environ.get("MAIL_PASSWORD")
JWT_ALGORITHM = os.environ.get("JWT_ALGORITHM")
#SECRET_KEY = os.environ.get("SECRET_KEY")
#DATABASE_PASSWORD = os.environ.get("DATABASE_PASSWORD")