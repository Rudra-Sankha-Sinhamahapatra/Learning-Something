import os
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_chroma import Chroma
from langchain.chains import ConversationalRetrievalChain
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_openai import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from dotenv import load_dotenv
import random

load_dotenv()

os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OPENAI_API_KEY"] = os.getenv("GROQ_API_KEY")
os.environ["OPENAI_BASE_URL"] = "https://api.groq.com/openai/v1"

app = FastAPI()

embedding_model = HuggingFaceEmbeddings(model_name = "BAAI/bge-small-en-v1.5")


AVAILABLE_MODELS = [
    "groq/compound-mini",
    "llama-3.1-8b-instant",
    "gemma2-9b-it"
]

persist_directory = './chroma'
os.makedirs(persist_directory, exist_ok=True)

vectordb = Chroma(persist_directory=persist_directory,embedding_function=embedding_model)
memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

selected_model = random.choice(AVAILABLE_MODELS)
llm = ChatOpenAI(model=selected_model, temperature=0.7)

qa_chain = ConversationalRetrievalChain.from_llm(
    llm = llm,
    retriever = vectordb.as_retriever(),
    memory=memory
)

class ChatInput(BaseModel):
    message: str

@app.get("/")
def root():
    return {"message": "LangChain Chatbot with Vector Memory is running!"}

@app.post("/chat")
def chat_with_memory(user_input: ChatInput):
    result = qa_chain.invoke({"question": user_input.message})
    response = result['answer']
    return {"user": user_input.message, "response": response}