from langchain_groq import ChatGroq
import os

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

def get_groq_llm():
    return ChatGroq(api_key=GROQ_API_KEY, model="llama-3.1-8b-instant")