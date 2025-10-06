from sentence_transformers import SentenceTransformer
from sqlalchemy import text
from langchain_groq import ChatGroq
from langchain.schema import SystemMessage, HumanMessage
from sqlalchemy.orm import Session
import os

embedding_model = SentenceTransformer("all-MiniLM-L6-v2")
llm = ChatGroq(api_key=os.getenv("GROQ_API_KEY"), model="llama-3.1-8b-instant")

def query_knowledge_base(user_id: str, query: str, db: Session):
     try:
          query_vector = embedding_model.encode(query).tolist()


          stmt = text("""
                                  SELECT id, title, content
            FROM documents
            WHERE user_id = :uid
            ORDER BY embedding <-> :query_vec
            LIMIT 3;

                      """)
          results = db.execute(stmt, {"uid": user_id, "query_vec": query_vector}).fetchall()

          context = "\n\n".join([r.content for r in results])

          messages = [
               SystemMessage(content="You are an AI knowledge assistant. Use context to answer the query."),
               HumanMessage(content=f"Context:\n{context}\n\nQuestion: {query}")
          ]
          response = llm.invoke(messages)

          return {"answer": response.content, "retrieved_docs": [r.title for r in results]}
     except Exception as e:
          return {"error": str(e), "retrieved_docs": []}