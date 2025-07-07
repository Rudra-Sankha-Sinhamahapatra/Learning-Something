from langchain_community.document_loaders import WebBaseLoader
import requests

def load_docs_from_url(url:str):
  try:
      requests.get(url,verify=False)

      loader = WebBaseLoader(url)
      loader.requests_kwargs = {'verify':False}
      docs = loader.load()
      return docs
  except:
     raise Exception("Could not load the website. Please check the URL and try again.")