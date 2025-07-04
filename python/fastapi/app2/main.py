import os
import httpx
from fastapi import FastAPI, HTTPException
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_BASE_URL = "https://api.groq.com/openai/v1"

async def call_groq_api(question: str):
    """Direct API call to Groq"""
    if not GROQ_API_KEY:
        raise HTTPException(status_code=500, detail="GROQ_API_KEY not found in environment variables")
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
   
    payload = {
        "model": "llama-3.3-70b-versatile", 
        "messages": [
            {"role": "user", "content": question}
        ],
        "temperature": 0.7
    }
    
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                f"{GROQ_BASE_URL}/chat/completions",
                headers=headers,
                json=payload,
                timeout=30.0
            )
            
   
            if response.status_code != 200:
                error_detail = f"Status: {response.status_code}, Response: {response.text}"
                raise HTTPException(status_code=500, detail=f"API call failed: {error_detail}")
            
            return response.json()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=500, detail=f"HTTP error: {str(e)}")

@app.get("/")
async def root():
    return {"message": "FastAPI with Groq API is running!"}

@app.get("/debug")
async def debug_env():
    """Debug endpoint to check environment variables"""
    return {
        "has_groq_key": bool(GROQ_API_KEY),
        "groq_key_length": len(GROQ_API_KEY) if GROQ_API_KEY else 0,
        "groq_key_prefix": GROQ_API_KEY[:10] + "..." if GROQ_API_KEY and len(GROQ_API_KEY) > 10 else "Not found",
        "current_model": "llama-3.3-70b-versatile"
    }

@app.get("/ask")
async def ask_question(question: str = "Go vs python fun fact"):
    try:
        response = await call_groq_api(question)
        answer = response["choices"][0]["message"]["content"]
        return {"question": question, "response": answer}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))