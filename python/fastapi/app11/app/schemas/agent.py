from typing_extensions import TypedDict

class AgentState(TypedDict):
    query: str
    user_id: str
    docs: list
    context: str
    answer: str