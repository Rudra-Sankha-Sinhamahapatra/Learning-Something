import os
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from docs_load import load_docs_from_url
from llama_index.core import SimpleDirectoryReader,VectorStoreIndex,Settings,Document
from llama_index.llms.openai_like import OpenAILike
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

class WebsiteInput(BaseModel):
    url: str

class QuestionInput(BaseModel):
    url: str
    question: str


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

@app.get("/")
def root():
    return {"message":"Langchain Website Loader FastAPI Server is Running!"}

@app.post("/loadinfo")
def loadall(url_input:WebsiteInput):
 try:
     docs = load_docs_from_url(url_input.url)
     return {"info": docs[0]}
 except Exception as e:
    raise HTTPException(status_code=400,detail=str(e))

@app.post("/metadata")
def metadata(url_input:WebsiteInput):
  try:  
      docs = load_docs_from_url(url_input.url)
      return {"metadata":docs[0].metadata}
  except Exception as e:
      raise HTTPException(status_code=400,detail=str(e))

@app.post("/ask")
def ask_question(input_data: QuestionInput):
    try:
         docs = load_docs_from_url(input_data.url)
         documents = [Document(text=docs[0].page_content,metadata=docs[0].metadata)]
         index = VectorStoreIndex.from_documents(documents)
         query_engine = index.as_query_engine()
         response = query_engine.query(input_data.question)

         return {
            "question": input_data.question,
            "answer": str(response),
            "source_url": input_data.url
         }
         
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    finally:
      print("hello")