import re
from schemas.user import OnCreateUser as OnCreateUserSchema
from models.user import User as UserModel
from sqlalchemy.orm import Session
import bcrypt

class PasswordNotValidError(Exception):
    pass


class PasswordsNotMatchingError(Exception):
    pass


class UserAlreadyExistsError(Exception):
    pass


def validate_password(password: str):
    """
    Contain at minimum 8 characters
    Include at least 1 character and 1 number
    :param password:
    :return:
    """
    if not re.match(r"^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$", password):
        raise PasswordNotValidError
    return True


def match_passwords(password: str, confirm_password: str):
    if password != confirm_password:
        raise PasswordsNotMatchingError
    return True


def create_user(user_data: OnCreateUserSchema, db: Session):
    password_hash = bcrypt.hashpw(password=user_data.password.encode(), salt=bcrypt.gensalt()).decode()

    user = UserModel(
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        email=user_data.email,
        password_hash=password_hash
    )
    if await db.query(UserModel).filter(UserModel.email == user.email).first():
        raise UserAlreadyExistsError
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
