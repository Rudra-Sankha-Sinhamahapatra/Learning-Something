from fastapi import APIRouter, Depends, UploadFile, File, Query
from app.api.controllers.document import upload_document,search_query,run_langgraph_query
from app.core.security import get_current_user
from sqlalchemy.orm import Session
from app.db.session import get_db

router = APIRouter(prefix="/documents/createdoc", tags=["Documents"])

@router.post("/")
def create_doc(file: UploadFile = File(...), user = Depends(get_current_user),db: Session = Depends(get_db)):
    return upload_document(file, user, db)


@router.get("/search")
def search(q: str = Query(...), user = Depends(get_current_user)):
    return search_query(q, user)

@router.get("/ask")
def ask(q: str = Query(...), user = Depends(get_current_user), db: Session = Depends(get_db)):
    return run_langgraph_query(q, user, db)
