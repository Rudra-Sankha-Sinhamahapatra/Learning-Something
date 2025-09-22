from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..schemas.ticket import TicketCreate, TicketResponse
from ..controllers.ticket import create_ticket as create_ticket_controller,get_tickets as get_tickets_controller
from ..middleware.auth import get_current_user
from ..db.database import get_db
from ..models.user import User

router = APIRouter(prefix="/api/v1/tickets", tags=["Tickets"])

@router.post("/create", response_model=TicketResponse)
def create_ticket(
    ticket: TicketCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
): 
    return create_ticket_controller(ticket, current_user.id, db)

@router.get("/getall", response_model=list[TicketResponse])
def list_tickets(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return get_tickets_controller(current_user.id,db)

