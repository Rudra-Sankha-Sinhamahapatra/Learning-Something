from sqlalchemy.orm import Session
from ...models.ticket import Ticket
from ...schemas.ticket import TicketCreate
from fastapi import Depends
from .. import database
 
def get_tickets_for_user(db: Session, user_id: int):
    return db.query(Ticket).filter(Ticket.user_id == user_id).all()

def create_ticket(ticket:TicketCreate, user_id:int, db : Session = Depends(database.get_db)):
    new_ticket = Ticket(
        question=ticket.question,
        answer=None,
        status="PENDING",
        user_id=user_id
    )
    db.add(new_ticket)
    db.commit()
    db.refresh(new_ticket)
    return new_ticket
