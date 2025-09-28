from langgraph.graph import StateGraph
from .doc_loader import build_vectorstore
from ..models.ticket import Ticket,TicketStatus
from ..schemas.ticket import TicketState
from sqlalchemy.orm import Session
from langchain_groq import ChatGroq
import os

os.environ["TOKENIZERS_PARALLELISM"] = "false"

llm = ChatGroq(
    model="llama-3.1-8b-instant",  
    groq_api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.4
)

vectorstore = build_vectorstore()

def get_text(result):
    return result.content if hasattr(result, "content") else str(result)


def classify_ticket(state: TicketState):
    q = state.question
    result = llm.invoke(f"Classify this ticket (bug, feature, support, billing): {q}")
    state.category = get_text(result)
    return state

def retrieve_context(state: TicketState):
    q = state.question
    docs = vectorstore.similarity_search(q, k=3)
    state.context = "\n\n".join([d.page_content for d in docs])
    return state

def generate_answer(state: TicketState):
    q = state.question
    context = state.context or ""
    category = state.category or ""
    result = llm.invoke(
        f"Answer this ticket professionally.\n"
        f"Question: {q}\nCategory: {category}\nDocs:\n{context}"
    )
    state.answer = get_text(result)
    return state

workflow = StateGraph(TicketState)
workflow.add_node("classify",classify_ticket)
workflow.add_node("retrieve", retrieve_context)
workflow.add_node("answer", generate_answer)
workflow.set_entry_point("classify")
workflow.add_edge("classify", "retrieve")
workflow.add_edge("retrieve", "answer")



def ai_resolve_ticket(ticket_id: str, db: Session):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if not ticket or ticket.status not in [TicketStatus.PENDING,TicketStatus.FAIL]:
        return

    try:
        graph = workflow.compile()
        result_dict = graph.invoke({"question": ticket.question})
        result = TicketState(**result_dict) 
        ai_answer = result.answer
    except Exception as e:
        print("LangGraph failed, using fallback:", e)
        ai_answer = "AI could not generate an answer"


    if not ai_answer or "AI could not generate an answer" in str(ai_answer):
        ticket.answer = "AI could not generate an answer"
        ticket.status = TicketStatus.FAIL
    else:
        ticket.answer = ai_answer
        ticket.status = TicketStatus.COMPLETED

    db.commit()
    db.refresh(ticket)