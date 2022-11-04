import sqlalchemy as sql
from db import Base
import bcrypt


class User(Base):
    __tablename__ = "users"
    id = sql.Column(sql.Integer, primary_key=True, index=True)

    first_name = sql.Column(sql.String)
    last_name = sql.Column(sql.String)

    email = sql.Column(sql.String, unique=True)
    password_hash = sql.Column(sql.String)

    is_verified = sql.Column(sql.Boolean, default=False)
    email_verification_hash = sql.Column(sql.String)
    email_verification_expiry = sql.Column(sql.DateTime)

    is_admin = sql.Column(sql.Boolean, default=False)

    def verify_password(self, password: str):
        return bcrypt.checkpw(password.encode(), self.password_hash.encode())

    def verify_email(self, email_verification_code: str):
        return bcrypt.checkpw(email_verification_code.encode(), self.email_verification_hash.encode())
