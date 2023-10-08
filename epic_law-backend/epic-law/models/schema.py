from pydantic import BaseModel
from fastapi import UploadFile
from typing import List

class Case(BaseModel):
    title: str
    case_number: str
    description: str
    client_name: str
    client_email: str
    categories: List[str]
    severity: int

class CaseDoc(BaseModel):
    case_id: str

class CaseQuery(BaseModel):
    query: str
    docId: str

class ChatInput(BaseModel):
    id: str
    case_id: str
    userMessage: str

class Message(BaseModel):
    role: str
    content: str

class CaseChatResponse(BaseModel):
    id: str
    case_id: str
    messages: List[Message]
