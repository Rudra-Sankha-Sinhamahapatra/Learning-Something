from fastapi import APIRouter,Depends
from app.api.controllers.user import register_user, login_user
from app.schemas.user import UserCreate, UserLogin
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    return register_user(user,db)

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    return login_user(user,db)
