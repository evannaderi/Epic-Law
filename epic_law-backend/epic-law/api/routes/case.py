from fastapi import APIRouter, Response, HTTPException, Depends, UploadFile, File
from sqlalchemy.orm import Session

from ...models import schema
from ...service import case_svc
from ...core.database import SessionLocal
from ...models import entities

import aiofiles
import uuid
import os


router = APIRouter()
DOC_DIR = "./uploads/"

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create")
async def create_case(case: schema.Case, db: Session = Depends(get_db)):
    try:
        return case_svc.create_case(case, db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.get("/cases")
async def get_cases(db: Session = Depends(get_db)):
    try:
        return case_svc.get_cases(db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.post("/case/{case_id}/upload/{doc_type}")
async def upload_doc(case_id: str, doc_type: str, doc: UploadFile=File(...), db: Session = Depends(get_db)):
    try:
        
        caseDoc = entities.CaseDoc(case_id=case_id, id=str(uuid.uuid4()), type=doc_type)
        caseDoc.directory = DOC_DIR + case_id
        caseDoc.fileName = doc.filename

        if not os.path.exists(caseDoc.directory):
            os.makedirs(caseDoc.directory)

        async with aiofiles.open(caseDoc.directory + "/" + caseDoc.fileName, 'wb') as out_file:
            content = await doc.read()
            await out_file.write(content) 

        response = case_svc.uploadDoc(caseDoc, db)
        case_svc.upload_to_gcp(caseDoc, db)

        return response
    
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.get("/case/{case_id}/files")
async def get_case_files(case_id: str, db: Session = Depends(get_db)):
    try:
        return case_svc.get_case_files(case_id, db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.get("/case/{case_id}/chat")
async def get_case_chat(case_id: str, db: Session = Depends(get_db)):
    try:
        return case_svc.get_case_chat(case_id, db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.post("/chat/{case_id}")
async def post_chat_message(case_id: str, chat: schema.ChatInput, db: Session = Depends(get_db)):
    try:
        return case_svc.post_chat_message(case_id, "user", chat, db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.get("/case/{case_id}/process")
async def start_processing(case_id: str, db: Session = Depends(get_db)):
    try:
        return case_svc.start_processing(case_id, db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)
    

@router.post("/case/{case_id}/query")
async def query_case_info(case_id: str, query: schema.QueryInput, db: Session = Depends(get_db)):
    try:
        return case_svc.query_case_info(query, case_id, db)
    except HTTPException as Error:
        print(Error)
        raise HTTPException(status_code=Error.status_code, detail=Error.detail)