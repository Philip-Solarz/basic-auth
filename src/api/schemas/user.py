from pydantic import BaseModel
from pydantic.schema import Optional


class User(BaseModel):
    id: Optional[int]
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    is_verified: Optional[bool]
    is_admin: Optional[bool]

    class Config:
        orm_mode = True


class OnCreateUser(BaseModel):
    first_name: Optional[str]
    last_name: Optional[str]
    email: Optional[str]
    password: Optional[str]
    confirm_password: Optional[str]

    class Config:
        orm_mode = True

class OnVerifyUser(BaseModel):
    verification_code: Optional[str]

    class Config:
        orm_mode = True