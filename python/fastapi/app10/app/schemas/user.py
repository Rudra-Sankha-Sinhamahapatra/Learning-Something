from pydantic import BaseModel, EmailStr

class User(BaseModel):
    name: str
    email: str
    password: str

class Signup(BaseModel):
    name: str
    email: EmailStr
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr

    class Config:
        orm_mode = True
