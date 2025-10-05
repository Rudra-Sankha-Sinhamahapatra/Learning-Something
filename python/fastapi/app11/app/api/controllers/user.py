from app.models.base import User
from app.schemas.user import UserCreate,UserLogin
from app.core.security import hash_password, verify_password, create_jwt_token
from fastapi import HTTPException
from sqlalchemy.orm import Session

def register_user(user: UserCreate, db: Session):
    if db.query(User).filter(User.email == user.email).first():
        raise HTTPException(status_code=400, detail="Email already registered")
    new_user = User(email=user.email, password_hash=hash_password(user.password))
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully", "user_id": str(new_user.id)}


def login_user(user: UserLogin,db: Session):
    existing = db.query(User).filter(User.email == user.email).first()
    if not existing or not verify_password(user.password, existing.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = create_jwt_token({"sub": str(existing.id)})
    return {"access_token": token}