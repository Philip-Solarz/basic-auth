from pydantic import BaseModel


class User(BaseModel):
    id: int
    first_name: str | None
    last_name: str | None
    email: str | None
    is_verified: bool
    is_admin: bool

    class Config:
        orm_mode = True


class OnCreateUser(BaseModel):
    first_name: str | None
    last_name: str | None
    email: str | None
    password: str | None
    confirm_password: str | None

    class Config:
        orm_mode = True
