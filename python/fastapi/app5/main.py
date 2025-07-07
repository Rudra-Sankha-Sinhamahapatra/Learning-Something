from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from docs_load import load_docs_from_url

app = FastAPI()

class WebsiteInput(BaseModel):
    url: str

@app.get("/")
def root():
    return {"message":"Langchain Document Loader FastAPI Server is Running!"}

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
