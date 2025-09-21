import bcrypt

def hash_password(password: str) -> bytes:
    salt = bcrypt.gensalt()

    hashed_bytes = bcrypt.hashpw(password.encode('utf-8'),salt)
    return hashed_bytes


def verify_password(password: str, hashed_password: bytes):
    encoded_password = password.encode('utf-8')
    if isinstance(hashed_password,str):
        hashed_password = hashed_password.encode('utf-8')
    return bcrypt.checkpw(encoded_password,hashed_password)