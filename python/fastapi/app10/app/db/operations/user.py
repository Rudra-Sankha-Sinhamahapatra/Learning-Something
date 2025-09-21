from sqlalchemy.orm import Session

from .. import database
from ...schemas.user import Signup
from ...models.user import User
from fastapi import Depends

def get_user_by_email(db: Session, email: str):
   return db.query(User).filter(User.email == email).first()

def create_user(user: Signup, hashed_pw: str, db: Session = Depends(database.get_db)):
   new_user = User(
      name = user.name,
      email = user.email,
      password = hashed_pw
   )
   db.add(new_user)
   db.commit()
   db.refresh(new_user)
   return new_user