import os
import ast
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.agents import Tool,initialize_agent,AgentType
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain.llms import OpenAI

load_dotenv()

memory = ConversationBufferMemory(memory_key="chat_history",return_messages=True)
app = FastAPI()

llm = ChatOpenAI(
    model="llama3-70b-8192",
    openai_api_key=os.getenv("GROQ_API_KEY"),
    openai_api_base="https://api.groq.com/openai/v1",
    temperature=0.2
)

def check_syntax(code:str) -> str:
    try:
        ast.parse(code)
        return "No syntax errors"
    except SyntaxError as e:
        return f"Syntax error: {str(e)}"


syntax_tool = Tool(
    name="Syntax checker",
    func=check_syntax,
    description="Checks for Python syntax errors in code. Input should be raw Python code."
)

tools = [syntax_tool]
agent_executor = initialize_agent(
      tools=tools,
      llm=llm,
      agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
      verbose=True,
      memory=memory,
      handle_parsing_errors=True
)

class CodeInput(BaseModel):
    code: str
    question: str


@app.get("/")
def root():
    return {"message": "Coding agent fastapi server !"}


@app.post("/debug")
def debug_code(input: CodeInput):
     prompt = f"Here is a Python code:\n```python\n{input.code}\n```\n\n{input.question}"
     response = agent_executor.run(prompt)
     return {"response": response}

