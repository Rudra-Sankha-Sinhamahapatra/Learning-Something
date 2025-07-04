import os
from fastapi import FastAPI
from llama_index.llms.openai_like import OpenAILike
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


llm = OpenAILike(
    model="llama-3.3-70b-versatile",  
    api_base="https://api.groq.com/openai/v1",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.7,
    context_window=2000,
    is_chat_model=True,
)

@app.get("/")
async def root():
    return {"message": "FastAPI with LlamaIndex and Groq is running!"}

@app.get("/ask")
async def ask_question(question: str = "Tell me a fun fact about Python."):
    response = llm.complete(question)
    return {"question": question, "response": str(response)}


@app.get("/simple")
async def simple_test():
    response = llm.complete("Tell me a fun fact about Python.")
    return {"response": str(response)}