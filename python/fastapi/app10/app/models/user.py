from sqlalchemy import Column, Integer, String
from ..db.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key= True, index=True)
    name = Column(String(60))
    email = Column(String(60), index=True, unique=True, nullable=False)
    password = Column(String(255),nullable=False)
    

