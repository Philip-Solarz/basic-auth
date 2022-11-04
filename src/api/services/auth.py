import jwt
from settings import JWT_SECRET, JWT_ALGORITHM
from schemas.user import User as UserSchema
from fastapi.security import OAuth2PasswordBearer
from fastapi import Depends, HTTPException
from pydantic import ValidationError

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")


def create_access_token(user: UserSchema):
    payload = user
    access_token = jwt.encode(payload, JWT_SECRET)
    return access_token


def get_current_user(access_token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(access_token, JWT_SECRET, [JWT_ALGORITHM])
    except jwt.exceptions.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Invalid token")
    try:
        user = UserSchema.parse_obj(payload)
    except ValidationError:
        raise HTTPException(status_code=400, detail="Invalid token")
    return user