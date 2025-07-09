import os
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from llama_index.core import VectorStoreIndex, SimpleDirectoryReader, Settings
from llama_index.llms.openai_like import OpenAILike
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

load_dotenv()


api_key = os.getenv("GROQ_API_KEY")
if not api_key:
    raise ValueError("GROQ_API_KEY not found in environment variables")


llm = OpenAILike(
    model="llama3-70b-8192",
    api_base="https://api.groq.com/openai/v1",
    api_key=api_key,
    is_chat_model=True,
    temperature=0.2,
)

embed_model = HuggingFaceEmbedding(model_name="BAAI/bge-small-en-v1.5")


Settings.llm = llm
Settings.embed_model = embed_model

code_reader = SimpleDirectoryReader(input_dir="./repo", required_exts=[".py", ".ts", ".js"])
documents = code_reader.load_data()


index = VectorStoreIndex.from_documents(documents)
query_engine = index.as_query_engine()


app = FastAPI(
    title="CodeWhisper",
    description="Ask questions about your local codebase and get AI-powered answers",
    version="1.0.0"
)

class CodeQuery(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "CodeWhisper agent is ready!"}

@app.post("/ask")
def ask_codebase(data: CodeQuery):
    response = query_engine.query(data.question)
    return {
        "question": data.question,
        "answer": str(response)
    }    