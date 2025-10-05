from passlib.context import CryptContext # type: ignore
import jwt,os 
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET","supersecret")
ALGORITHM = "HS256"

def hash_password(password: str) -> str:
    password = password[:72]
    return pwd_context.hash(password)

def verify_password(password: str, hashed: str) -> bool:
    password = password[:72]
    return pwd_context.verify(password,hashed)

def create_jwt_token(data: dict, expires_delta: timedelta = timedelta(hours=24)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode,SECRET_KEY, algorithm=ALGORITHM)
