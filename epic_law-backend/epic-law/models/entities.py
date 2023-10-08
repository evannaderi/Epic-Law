from sqlalchemy import Column, Integer, String, DateTime, ARRAY, VARCHAR
from sqlalchemy.sql import func
from ..core.database import Base

class Case(Base):
    __tablename__ = "cases"

    id = Column(String, primary_key=True, index=True)
    case_number = Column(Integer, index=True)
    categories = Column(ARRAY(VARCHAR))
    title = Column(String, index=True)
    description = Column(String)
    client_name = Column(String)
    client_email = Column(String)
    severity = Column(Integer)
    create_date = Column(DateTime(timezone=True), server_default=func.now())


class CaseDoc(Base):
    __tablename__ = "case_documents"

    id = Column(String, primary_key=True, index=True)
    type = Column(String)
    fileName = Column(String)
    case_id = Column(String)
    directory = Column(String)


class CaseChat(Base):
    __tablename__ = "case_chat"
    id = Column(String, primary_key=True, index=True)
    case_id = Column(String)
    systemMessages = Column(ARRAY(VARCHAR))
    userMessages = Column(ARRAY(VARCHAR))