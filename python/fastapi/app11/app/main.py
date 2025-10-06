from fastapi import FastAPI
from app.api.routers.user import router as user_routes
from app.api.routers.documents import router as document_routes
import os
import uvicorn # type: ignore

app = FastAPI(title="AI Personal knowledge base manager")
port = os.getenv("PORT",8000)

app.include_router(user_routes)
app.include_router(document_routes)

@app.get("/")
def root():
    return {"message": "Hello"}

if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=port, reload=True)


