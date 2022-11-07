import random
import string
from datetime import datetime, timedelta
from schemas.user import User as UserSchema
from models.user import User as UserModel
from sqlalchemy.orm import Session
from services.auth import get_user_by_email
from fastapi import HTTPException
from sqlalchemy.exc import NoResultFound
import bcrypt
from fastapi_mail import ConnectionConfig, FastMail, MessageSchema, MessageType
from settings import MAIL_PASSWORD
from fastapi_mail.errors import ConnectionErrors

conf = ConnectionConfig(
    MAIL_USERNAME="philipsolarz.dev@gmail.com",
    MAIL_PASSWORD=MAIL_PASSWORD,
    MAIL_FROM="philipsolarz.dev@gmail.com",
    MAIL_PORT=465,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_STARTTLS=False,
    MAIL_SSL_TLS=True,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)


async def send_verification_request(user_data: UserSchema, db: Session):
    verification_code = ''.join(random.choice(string.digits) for i in range(6))
    verification_code_expiry_time = datetime.now() + timedelta(minutes=15)
    if user_data.is_verified:
        raise HTTPException(status_code=400, detail="Email already verified")
    try:
        user: UserModel = await get_user_by_email(user_data.email, db)
    except NoResultFound:
        raise HTTPException(status_code=400, detail="No user with that email exists")
    user.email_verification_hash = bcrypt.hashpw(password=verification_code.encode(), salt=bcrypt.gensalt()).decode()
    user.email_verification_expiry = verification_code_expiry_time
    db.commit()
    db.refresh(user)

    html = f"""
        Your verification code is {verification_code}
    
        This code will expire in one hour.
    
        If you did not request this verification code, then please ignore this message.
        """

    message = MessageSchema(
        subject="Verify your account",
        recipients=[user_data.email],
        body=html,
        subtype=MessageType.html)

    fm = FastMail(conf)
    await fm.send_message(message)
    return True


async def verify_email(verification_code: str, user_data: UserSchema, db: Session):
    if user_data.is_verified:
        raise HTTPException(
            status_code=400,
            detail="Email already verified"
        )

    try:
        user: UserModel = await get_user_by_email(user_data.email, db)
    except NoResultFound:
        raise HTTPException(status_code=400, detail="No user with that email exists")

    if not user.verify_email(verification_code):
        raise HTTPException(
            status_code=400,
            detail="Invalid verification code"
        )
    user.is_verified = True
    user.email_verification_hash = None
    user.email_verification_expiry = None
    db.commit()
    db.refresh(user)
    return True
