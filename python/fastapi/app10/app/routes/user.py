from fastapi import APIRouter,Depends
from sqlalchemy.orm import Session
from ..schemas import user
from ..db import database
from ..controllers.auth import signin as signin_controller, signup as signup_controller

router = APIRouter(prefix="/api/v1/auth", tags=["Auth"])

@router.post("/signup", response_model=user.UserResponse)
def signup(user: user.Signup,db: Session = Depends(database.get_db)):
    return signup_controller(user,db)

@router.post("/signin")
def signin(user: user.UserLogin, db: Session = Depends(database.get_db)):
    return signin_controller(user,db)