from sqlalchemy.orm import Session
from ...models.ticket import Ticket,TicketStatus
from ...schemas.ticket import TicketCreate
from fastapi import Depends
from .. import database
from ...core.ticket_ai  import ai_resolve_ticket

def get_tickets_for_user(db: Session, user_id: int):
    return db.query(Ticket).filter(Ticket.user_id == user_id).all()

def create_ticket(ticket:TicketCreate, user_id:int, db : Session = Depends(database.get_db)):
    new_ticket = Ticket(
        question=ticket.question,
        answer=None,
        status=TicketStatus.PENDING,
        user_id=user_id
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket


def update_ticket(db: Session, ticket_id: str, user_id: int):
    ticket = db.query(Ticket).filter(
        Ticket.id == ticket_id,
        Ticket.user_id == user_id
    ).first()
    if not ticket:
        return None
    
    if (ticket.status in [TicketStatus.PENDING, TicketStatus.FAIL]):
        try:
            ai_resolve_ticket(ticket.id, db)  
        except Exception as e:
            print("AI retry in update_ticket failed:", e)
            ticket.status = TicketStatus.FAIL
            ticket.answer = ticket.answer or "AI could not generate an answer"
    else:
          ticket.status = TicketStatus.FAIL
          ticket.answer = "AI could not generate an answer"
    db.commit()
    db.refresh(ticket)
    return ticket

def delete_ticket(db: Session, ticket_id: str, user_id:int):
    ticket = db.query(Ticket).filter(
        Ticket.id == ticket_id,
        Ticket.user_id == user_id
    ).first()
    if not ticket:
        return None
    db.delete(ticket)
    db.commit()
    return {
        "message": "Ticket Deleted Successfully",
        "ticket": ticket  
    }

def get_ticket_by_id(db: Session, ticket_id: str, user_id: int):
    return db.query(Ticket).filter(
        Ticket.id == ticket_id,
        Ticket.user_id == user_id
    ).first()
