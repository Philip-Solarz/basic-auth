from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from models.user import User as UserModel
from services.auth import get_user_by_email


class InvalidCredentialsError(Exception):
    pass


async def login_user(user_data: OAuth2PasswordRequestForm, db: Session):
    user = await get_user_by_email(user_data.username, db)
    if not user:
        raise InvalidCredentialsError
    if not user.verify_password(user_data.password):
        raise InvalidCredentialsError
    return user
