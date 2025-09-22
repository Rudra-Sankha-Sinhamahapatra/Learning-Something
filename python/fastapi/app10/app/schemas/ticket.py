from pydantic import BaseModel
from uuid import UUID
from ..models.ticket import TicketStatus
from typing import Optional

class TicketCreate(BaseModel):
    question: str

class TicketResponse(BaseModel):
    id: UUID
    question: str
    answer: Optional[str] = None 
    status: TicketStatus
      
    class Config:
        from_attributes = True