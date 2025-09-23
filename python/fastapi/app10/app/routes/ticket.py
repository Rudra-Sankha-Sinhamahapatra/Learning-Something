from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from ..schemas.ticket import TicketCreate, TicketResponse, TicketUpdate, TicketDeleteResponse
from ..controllers.ticket import (
    create_ticket as create_ticket_controller,
    get_tickets as get_tickets_controller,
    update_ticket as update_ticket_controller, delete_ticket as delete_ticket_controller
)
from ..middleware.auth import get_current_user
from ..db.database import get_db
from ..models.user import User
from ..core.ai import ai_resolve_ticket

router = APIRouter(prefix="/api/v1/tickets", tags=["Tickets"])


@router.post("/create", response_model=TicketResponse)
def create_ticket(
    ticket: TicketCreate,
    background_tasks: BackgroundTasks,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    new_ticket = create_ticket_controller(ticket,current_user.id,db)
    background_tasks.add_task(ai_resolve_ticket,new_ticket.id,db)
    return new_ticket


@router.get("/getall", response_model=list[TicketResponse])
def list_tickets(
    db: Session = Depends(get_db), current_user: User = Depends(get_current_user)
):
    return get_tickets_controller(current_user.id, db)


@router.put("/update/{ticket_id}", response_model=TicketResponse)
def update_ticket(
    ticket_id: str,
    ticket_update: TicketUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ticket = update_ticket_controller(
        ticket_id, ticket_update.status, ticket_update.answer, current_user.id, db
    )
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

@router.delete("/delete/{ticket_id}", response_model=TicketDeleteResponse)
def delete_ticket(
    ticket_id: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    ticket = delete_ticket_controller(
        ticket_id, current_user.id, db
    )
    if not ticket:
        raise HTTPException(status_code=404, detail="Ticket not found")
    return ticket

