import os
from fastapi import FastAPI
from pydantic import BaseModel
from langchain_community.vectorstores import Chroma
from langchain.chains import ConversationalRetrievalChain
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain_community.document_loaders import TextLoader
from dotenv import load_dotenv

load_dotenv()

os.environ["OPENAI_API_KEY"] = os.getenv("GROQ_API_KEY")
os.environ["OPENAI_BASE_URL"] = "https://api.groq.com/openai/v1"

app = FastAPI()

embedding_model = HuggingFaceEmbeddings(model_name = "BAAI/bge-small-en-v1.5")

persist_directory = './chroma'
os.makedirs(persist_directory, exist_ok=True)

vectordb = Chroma(persist_directory=persist_directory,embedding_function=embedding_model)
memory = ConversationBufferMemory(memory_key='chat_history', return_messages=True)

llm = ChatOpenAI(model="llama3-70b-8192", temperature=0.7)

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
    response = qa_chain.run(user_input.message)
    return {"user": user_input.message, "response": response}