import os
import requests
import random
from sqlalchemy.orm import Session
from ..models.ticket import Ticket, TicketStatus

GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


AVAILABLE_MODELS = [
    "groq/compound-mini",
    "llama-3.1-8b-instant",
    "gemma2-9b-it"
]


def generate_answer(question: str) -> str:
    if not GROQ_API_KEY:
        return "AI service not configured."

    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    payload_base = {
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an AI support assistant for our platform w8w, "
                    "an automated workflow platform similar to n8n. "
                    "You help users with integrations, automations, troubleshooting, and best practices. "
                    "Be concise and professional. If unsure, escalate or say you don’t know."
                ),
            },
            {"role": "user", "content": question}
        ],
        "temperature": 0.4
    }

    models_to_try = random.sample(AVAILABLE_MODELS, len(AVAILABLE_MODELS))
    for model in models_to_try:
        try:
            payload = {"model": model, **payload_base}
            response = requests.post(GROQ_API_URL, headers=headers, json=payload)
            response.raise_for_status()
            data = response.json()
            
            answer = data.get("choices", [{}])[0].get("message", {}).get("content")
            if answer:
                return answer
        except requests.exceptions.HTTPError as e:
            print(f"Model {model} failed: {e}, response: {getattr(e.response,'text',None)}")
            
        except Exception as e:
            print(f"Unexpected error for model {model}: {e}")
           

    return "Sorry, unable to generate an answer right now."


def ai_resolve_ticket(ticket_id: str, db: Session):
    ticket = db.query(Ticket).filter(Ticket.id == ticket_id).first()
    if ticket and ticket.status == TicketStatus.PENDING:
        ai_answer = generate_answer(ticket.question)
        ticket.answer = ai_answer or "AI could not generate an answer"
        ticket.status = TicketStatus.COMPLETED if ai_answer else TicketStatus.FAIL
        db.commit()
        db.refresh(ticket)
