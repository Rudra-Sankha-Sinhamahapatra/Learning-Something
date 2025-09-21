from fastapi import HTTPException
from sqlalchemy.orm import Session
from .. import bcrypt
from ..schemas.user import Signup,UserLogin
from ..db.operations.user import get_user_by_email,create_user

def signup(user: Signup, db: Session):
    db_user = get_user_by_email(db, user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email is already registered")
    
    hashed_pw = bcrypt.hash_password(user.password).decode('utf-8')
    new_user = create_user(user, hashed_pw, db)
    
    return {"message": "Signup Successful", "newUser": new_user.email}

def signin(user: UserLogin, db: Session):
    db_user = get_user_by_email(db,user.email)
    if not db_user or not bcrypt.verify_password(user.password,db_user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")
    
    return {"message": "Login Successful","user": db_user.email}