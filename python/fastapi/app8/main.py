import os
import ast
from fastapi import FastAPI
from pydantic import BaseModel
from dotenv import load_dotenv
from langchain.agents import Tool,initialize_agent,AgentType
from langchain_community.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory
from langchain_community.llms import OpenAI
from langchain_community.tools import DuckDuckGoSearchResults
from langchain_community.utilities import DuckDuckGoSearchAPIWrapper

load_dotenv()

# Regular search for programming/documentation
regular_search = DuckDuckGoSearchResults(
    api_wrapper=DuckDuckGoSearchAPIWrapper(max_results=6)
)

# News search for latest updates/discussions
news_search = DuckDuckGoSearchResults(
    api_wrapper=DuckDuckGoSearchAPIWrapper(
        backend="news",
        max_results=2
    )
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

docs_tool = Tool(
    name="Documentation Search",
    func=regular_search.run,
    description="Search for programming documentation and solutions."
)

news_tool = Tool(
    name="News Search",
    func=news_search.run,
    description="Search for latest discussions and updates about programming topics."
)

tools = [syntax_tool, docs_tool, news_tool]
llm = ChatOpenAI(
    model="llama3-70b-8192",
    openai_api_key=os.getenv("GROQ_API_KEY"),
    openai_api_base="https://api.groq.com/openai/v1",
    temperature=0.2
)

memory = ConversationBufferMemory(memory_key="chat_history",return_messages=True)

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

class CodeResponse(BaseModel):
    analysis: str
    code_fix: str | None
    relevant_links: list[str]

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Coding agent fastapi server !"}

@app.post("/debug", response_model=CodeResponse)
def debug_code(input: CodeInput):

    syntax_result = check_syntax(input.code)
    
    prompt = f"""Analyze this Python code and question:
    Code: ```python
    {input.code}
    ```
    Question: {input.question}
    Syntax check result: {syntax_result}
    
    Provide a detailed response with:
    1. Analysis of the issue
    2. Complete fixed code that resolves ALL issues (syntax, configuration, missing components)
    3. Relevant documentation links
    
    Format your response with clear sections:
    ANALYSIS: your analysis here
    CODE: ```python
    your complete fixed code here
    ```
    LINKS: your links here
    """
    
    response = agent_executor.run(prompt)
    
    
    code_block = ""
    if "```python" in response:
        code_parts = response.split("```python")
        if len(code_parts) > 1:
            code_block = code_parts[1].split("```")[0].strip()
    
    
    docs_results = regular_search.run(f"python {input.question} documentation")
    links = [link.split(", link: ")[1] for link in docs_results.split(", snippet:") if ", link: " in link]
    
    return CodeResponse(
        analysis=response,
        code_fix=code_block if code_block else None,
        relevant_links=links[:6]  
    )

