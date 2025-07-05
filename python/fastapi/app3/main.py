import os 
from fastapi import FastAPI
from pydantic import BaseModel
from llama_index.core import SimpleDirectoryReader, VectorStoreIndex, Settings
from llama_index.llms.openai_like import OpenAILike
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class QueryInput(BaseModel):
    prompt: str


llm = OpenAILike(
    model="llama3-70b-8192", 
    api_base="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.7,
    context_window=8000,
    is_chat_model=True,
)


embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")


Settings.llm = llm
Settings.embed_model = embed_model


reader = SimpleDirectoryReader('./data')
documents = reader.load_data()
index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()

@app.get("/")
def root():
    return {"message": "PDF RAG agent is up and running with Groq!"}

@app.post("/ask")
def ask_pdf(query: QueryInput):
    response = query_engine.query(query.prompt)
    return {"prompt": query.prompt, "response": str(response)}