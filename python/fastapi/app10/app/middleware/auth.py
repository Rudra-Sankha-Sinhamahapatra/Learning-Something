from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from ..core.jwt import verify_access_token
from ..db.database import get_db
from sqlalchemy.orm import Session
from .. import models

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/v1/auth/signin")


def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    payload = verify_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )
    
    user_id: int = payload.get("user_id")
    if user_id is None:
        raise HTTPException(status_code=401, detail="Token missing user_id")
    
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user