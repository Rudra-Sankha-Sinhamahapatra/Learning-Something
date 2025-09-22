from fastapi import FastAPI
from .db.database import engine
from .db.database import Base
from .routes import user,ticket

Base.metadata.create_all(bind=engine)


app = FastAPI()

@app.get("/")
def root():
    return {"msg":"Hello"}

app.include_router(user.router)
app.include_router(ticket.router)

