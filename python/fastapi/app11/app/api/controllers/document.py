from app.core.embeddings import embed_text
from app.agents.reasoning_agent import create_retrieval_graph, init_state
from app.models.base import Document
import uuid
from datetime import datetime
from sqlalchemy import text
from sqlalchemy.orm import Session
from app.core.llm import get_groq_llm
from app.core.file_parser import extract_text_from_file

def upload_document(file, user, db: Session):
    content = extract_text_from_file(file.file, file.filename)
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
    stmt = text("""
    SELECT id, title, content
    FROM documents
    WHERE user_id = :uid
    ORDER BY embedding <-> (:query_vec)::vector
    LIMIT 5;
""")

    results = db.execute(stmt, {"uid": user.id, "query_vec": q_emb}).fetchall()

    llm = get_groq_llm()
    context = "\n\n".join([r.content for r in results])
    answer = llm.invoke([{"role": "user", "content": f"Given these documents:\n{context}\nAnswer: {q}"}])
    return {"answer": answer.content, "sources": [str(r.id) for r in results]}

def run_langgraph_query(query: str, user,db: Session):
    graph_builder = create_retrieval_graph(db)
    graph = graph_builder.compile()
    state = init_state(query, user.id)
    result = graph.invoke(state)
    db.close()
    return {"answer": result["answer"], "sources": [r.title for r in result["docs"]]}