from fastapi import HTTPException
from sqlalchemy.orm import Session
from .. import bcrypt
from ..schemas.user import Signup,UserLogin
from ..db.operations.user import get_user_by_email,create_user
from ..core.jwt import create_access_token 

def signup(user: Signup, db: Session):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    hashed_pw = bcrypt.hash_password(user.password).decode('utf-8')
    new_user = create_user(user, hashed_pw, db)

    access_token = create_access_token({"user_id": new_user.id})
    
    return {
        "id": new_user.id,
        "name": new_user.name,
        "email": new_user.email,
        "access_token": access_token,
        "token_type": "bearer"
    }

def signin(user: UserLogin, db: Session):
    db_user = get_user_by_email(db,user.email)
    if not db_user or not bcrypt.verify_password(user.password,db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
     
    access_token = create_access_token({"user_id": db_user.id})
    
    return {
        "message": "Login Successful",
        "user": db_user.email,
        "access_token": access_token,

        }