from pydantic import BaseModel, EmailStr, constr

class UserCreate(BaseModel):
    name: constr(max_length=60) # type: ignore
    email: EmailStr
    password: constr(max_length=72) # type: ignore

class UserLogin(BaseModel):
    email: EmailStr
    password: constr(max_length=72) # type: ignore