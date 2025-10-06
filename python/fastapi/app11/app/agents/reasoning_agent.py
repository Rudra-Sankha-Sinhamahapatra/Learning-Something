from langgraph.graph import StateGraph, START, END
from langchain.schema import HumanMessage, SystemMessage
from app.core.embeddings import embed_text
from app.models.base import Document
from app.core.llm import get_groq_llm
from sqlalchemy import text
from sqlalchemy.orm import Session

def init_state(query: str, user_id: str):
    return {"query": query, "user_id": user_id, "docs": [], "context": "", "answer": ""}

def retrieve_docs(state: dict, db: Session):
    query_vector = embed_text(state["query"])
    stmt = text("""
        SELECT id, title, content
        FROM documents
        WHERE user_id = :uid
        ORDER BY embedding <-> :query_vec
        LIMIT 3;
    """)
    results = db.execute(stmt, {"uid": state["user_id"], "query_vec": query_vector}).fetchall()
    context = "\n\n".join([r.content for r in results])
    state["docs"] = results
    state["context"] = context
    return state

def generate_answer(state: dict):
    llm = get_groq_llm()
    messages = [
        SystemMessage(content="You are a helpful assistant that uses user’s uploaded documents as knowledge base."),
        HumanMessage(content=f"Context:\n{state['context']}\n\nQuestion: {state['query']}")
    ]
    response = llm.invoke(messages)
    state["answer"] = response.content
    return state

def create_retrieval_graph():
    graph = StateGraph()
    graph.add_node("retrieve", lambda s, db: retrieve_docs(s,db))
    graph.add_node("generate", lambda s: generate_answer(s))
    graph.add_edge(START, "retrieve")
    graph.add_edge("retrieve", "generate")
    graph.add_edge("generate", END)
    return graph