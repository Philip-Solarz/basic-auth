from fastapi import APIRouter, Depends, HTTPException
from schemas.user import OnCreateUser as OnCreateUserSchema
from schemas.user import User as UserSchema
from sqlalchemy.orm import Session
from db import get_db
from email_validator import validate_email, EmailNotValidError
from utils.signup import validate_password, match_passwords, create_user, PasswordNotValidError, \
    PasswordsNotMatchingError, UserAlreadyExistsError
from utils.login import login_user, InvalidCredentialsError
from services.auth import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from services.auth import get_current_user

router = APIRouter()


@router.post("/signup")
async def signup(user_data: OnCreateUserSchema, db: Session = Depends(get_db)):
    try:
        validate_email(email=user_data.email, check_deliverability=True)
    except EmailNotValidError:
        raise HTTPException(status_code=400, detail="Email is not valid")
    try:
        validate_password(password=user_data.password)
    except PasswordNotValidError:
        raise HTTPException(status_code=400, detail="Password is not valid")
    try:
        match_passwords(password=user_data.password, confirm_password=user_data.confirm_password)
    except PasswordsNotMatchingError:
        raise HTTPException(status_code=400, detail="Passwords do not match")
    try:
        user = await create_user(user_data, db)
    except UserAlreadyExistsError:
        raise HTTPException(status_code=400, detail="User already exists")
    return {
        "access_token": create_access_token(UserSchema.from_orm(user)),
        "token_type": "bearer"
    }


@router.post("/login")
async def login(user_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    try:
        user = login_user(user_data, db)
    except InvalidCredentialsError:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {
        "access_token": create_access_token(UserSchema.from_orm(user)),
        "token_type": "bearer"
    }

@router.post("/refresh")
async def refresh(user: UserSchema = Depends(get_current_user)):
    return {"access_token": await create_access_token(user), "token_type": "bearer"}


@router.post("/identify")
async def identify(user: UserSchema = Depends(get_current_user)):
    return user


@router.get("/verify")
async def verify():
    pass


@router.post("/verify")
async def verify():
    pass
