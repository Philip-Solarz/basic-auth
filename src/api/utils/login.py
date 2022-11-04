from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.user import User as UserModel


class InvalidCredentialsError(Exception):
    pass


def login_user(user_data: OAuth2PasswordRequestForm, db: Session):
    user = await db.query(UserModel).filter(UserModel.email == user_data.username).first()
    if not user:
        raise InvalidCredentialsError
    if not user.verify_password(user_data.password):
        raise InvalidCredentialsError
    return user
