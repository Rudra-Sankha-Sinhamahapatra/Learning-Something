from sqlalchemy.orm import Session
from ..schemas.ticket import TicketCreate,TicketStatus
from ..db.operations import ticket as ticket_ops

def create_ticket(ticket: TicketCreate, user_id: int, db: Session):
    return ticket_ops.create_ticket(ticket, user_id, db)

def get_tickets(user_id: int, db: Session):
    return ticket_ops.get_tickets_for_user(db, user_id)

def update_ticket(ticket_id: str, status: TicketStatus, answer: str, user_id: int, db: Session):
    return ticket_ops.update_ticket(db, ticket_id, status,answer,user_id)

def delete_ticket(ticket_id:str, user_id:int, db: Session):
    return ticket_ops.delete_ticket(db,ticket_id,user_id)