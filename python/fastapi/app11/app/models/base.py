from app.db.session import Base
from sqlalchemy import Column, String, DateTime, ForeignKey, Enum, JSON, Table, Float
from sqlalchemy.dialects.postgresql import UUID, ARRAY
from sqlalchemy.orm import relationship
from datetime import datetime
from pgvector.sqlalchemy import Vector
import uuid

user_interests = Table(
    "user_interests",
    Base.metadata,
    Column("user_id", UUID(as_uuid=True), ForeignKey("users.id"), primary_key=True),
    Column("interest_id", UUID(as_uuid=True), ForeignKey("interests.id"), primary_key=True),
)

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String, unique=True, nullable=False)
    password_hash = Column(String, nullable=False)

    documents = relationship("Document", back_populates="user")
    interests = relationship("Interest", secondary=user_interests, back_populates="users")

class Document(Base):
    __tablename__ = "documents"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    title = Column(String)
    content = Column(String)
    source_type = Column(Enum("pdf","url","tweet","note",name="source_types"))
    document_metadata = Column(JSON)
    created_at = Column(DateTime, default=datetime.utcnow)

    embedding = Column(Vector(1536))

    user = relationship("User", back_populates="documents")

class Interest(Base):
    __tablename__ = "interests"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    topic = Column(String, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", secondary=user_interests, back_populates="interests")