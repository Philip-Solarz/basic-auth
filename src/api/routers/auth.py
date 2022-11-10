from fastapi import APIRouter, Depends, HTTPException
from schemas.user import OnCreateUser as OnCreateUserSchema
from schemas.user import User as UserSchema
from schemas.user import OnVerifyUser as OnVerifyUserSchema
from sqlalchemy.orm import Session
from db import get_db
from email_validator import validate_email, EmailNotValidError
from utils.signup import validate_password, match_passwords, create_user, PasswordNotValidError, \
    PasswordsNotMatchingError, UserAlreadyExistsError
from utils.login import login_user, InvalidCredentialsError
from services.auth import create_access_token
from fastapi.security import OAuth2PasswordRequestForm
from services.auth import get_current_user
from utils.verify import send_verification_request, verify_email

router = APIRouter()


class ExtendedOAuth2PasswordRequestForm(OAuth2PasswordRequestForm):
    remember_me: bool


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
async def login(user_data: ExtendedOAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    remember_me = True if user_data.scopes[0] == "true" else False
    try:
        user = await login_user(user_data, db)
    except InvalidCredentialsError:
        raise HTTPException(status_code=400, detail="Invalid credentials")
    return {
        "access_token": create_access_token(UserSchema.from_orm(user)),
        "token_type": "bearer",
        "remember_me": remember_me
    }


@router.get("/refresh")
async def refresh(user: UserSchema = Depends(get_current_user)):
    return {"access_token": create_access_token(user), "token_type": "bearer"}


@router.post("/identify")
async def identify(user: UserSchema = Depends(get_current_user)):
    return user


@router.get("/verify")
async def verify(user: UserSchema = Depends(get_current_user), db: Session = Depends(get_db)):
    await send_verification_request(user, db)
    return {
        "detail": "A message containing your verification code has been sent to your email."
    }


@router.post("/verify")
async def verify(verification_data: OnVerifyUserSchema, user: UserSchema = Depends(get_current_user),
                 db: Session = Depends(get_db)):
    verification_code = verification_data.verification_code
    await verify_email(verification_code, user, db)
    return {"detail": "Email has been verified successfully."}
