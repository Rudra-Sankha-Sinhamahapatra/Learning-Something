from fastapi import FastAPI
from .db.database import engine
from .models.user import User
from .db.database import Base
from .routes import user

Base.metadata.create_all(bind=engine)


app = FastAPI()

@app.get("/")
def root():
    return {"msg":"Hello"}

app.include_router(user.router)

