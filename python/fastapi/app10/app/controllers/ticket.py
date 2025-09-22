from sqlalchemy.orm import Session
from ..schemas.ticket import TicketCreate
from ..db.operations import ticket as ticket_ops

def create_ticket(ticket: TicketCreate, user_id: int, db: Session):
    return ticket_ops.create_ticket(ticket, user_id, db)

def get_tickets(user_id: int, db: Session):
    return ticket_ops.get_tickets_for_user(db, user_id)

