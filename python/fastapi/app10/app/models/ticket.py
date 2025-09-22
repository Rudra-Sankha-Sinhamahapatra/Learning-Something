from sqlalchemy import Column,String,Integer,ForeignKey, Enum as SqlEnum
from sqlalchemy.orm import relationship
from ..db.database import Base
from enum import Enum as PyEnum
import uuid
from sqlalchemy.dialects.postgresql import UUID

class TicketStatus(PyEnum):
    COMPLETED = "COMPLETED"
    FAIL = "FAIL"
    PENDING = "PENDING"
    SKIP = "SKIP"

class Ticket(Base):
    __tablename__="tickets"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    question = Column(String(500), nullable=False)
    answer = Column(String,nullable=True)
    status = Column(SqlEnum(TicketStatus), nullable=False, default=TicketStatus.PENDING)
    
    user_id = Column(Integer, ForeignKey("users.id",ondelete="CASCADE"),nullable=False)
    user = relationship("User", back_populates="tickets")

