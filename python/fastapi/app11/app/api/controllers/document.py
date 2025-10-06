from app.core.embeddings import embed_text
from app.agents.reasoning_agent import create_retrieval_graph, init_state
from app.models.base import Document
import uuid
from datetime import datetime
from sqlalchemy.orm import Session
from app.core.llm import get_groq_llm

def upload_document(file, user, db: Session):
    content = file.file.read().decode("utf-8")
    embedding = embed_text(content)
    doc = Document(
        id=uuid.uuid4(), 
        user_id=user.id, 
        title=file.filename,
        content=content,
        embedding=embedding,
        created_at=datetime.utcnow()
        )
    
    db.add(doc)
    db.commit()
    db.refresh(doc)
    return {"doc_id": str(doc.id)}


def search_query(q: str, user,db: Session):
    q_emb = embed_text(q)
    results = db.query(Document).filter(Document.user_id == user.id).order_by(Document.embedding.distance(q_emb)).limit(5).all()
    llm = get_groq_llm()
    context = "\n\n".join([r.content for r in results])
    answer = llm.invoke([{"role": "user", "content": f"Given these documents:\n{context}\nAnswer: {q}"}])
    return {"answer": answer.content, "sources": [str(r.id) for r in results]}

def run_langgraph_query(query: str, user,db: Session):
    graph = create_retrieval_graph()
    state = init_state(query, user.id)
    result = graph.run(state, db=db)
    db.close()
    return {"answer": result["answer"], "sources": [r.title for r in result["docs"]]}