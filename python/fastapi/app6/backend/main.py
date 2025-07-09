from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from langchain.chat_models import ChatOpenAI
from langchain.schema import AIMessage, HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

llm = ChatOpenAI(
    streaming=True,
    temperature=0.7,
    model="llama3-70b-8192",  
    openai_api_key=os.getenv("GROQ_API_KEY"),
    openai_api_base="https://api.groq.com/openai/v1"
)

@app.get("/")
def root():
    return {"message": "Streaming Chat Agent Ready!"}

@app.get("/stream")
async def stream_response(message: str):
    async def event_generator():
        async for chunk in llm.astream([HumanMessage(content=message)]):
            yield chunk.content

    return StreamingResponse(event_generator(), media_type="text/plain")
