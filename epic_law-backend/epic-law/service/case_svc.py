from sqlalchemy.orm import Session
from fastapi import UploadFile
from google.cloud import storage
from google.oauth2 import service_account
from typing import List


from ..models import entities, schema

import uuid
from datetime import datetime

DOC_DIR = "./uploads/"
credentials = service_account.Credentials.from_service_account_file('./cis-class-375520-5b4fc8d182f4.json')
client = storage.Client(project='cis-class-375520', credentials=credentials)
bucketName = "epic-law"

def create_case(case: schema.Case, db: Session):
    case_val = entities.Case(**case.dict())
    case_val.id = getId()
    id = case_val.id
    case_val.create_date = datetime.now()

    db.add(case_val)
    db.commit()
    db.refresh(case_val)

    chat = entities.CaseChat(id=getId(), case_id=case_val.id, systemMessages=["Welcome to chat"], userMessages=[])
    db.add(chat)
    db.commit()
    db.refresh(chat)
    return db.query(entities.Case).filter(entities.Case.id == id).first()


def get_cases(db: Session):
    return db.query(entities.Case).all()


def uploadDoc(caseDoc: entities.CaseDoc, db: Session):
    db.add(caseDoc)
    db.commit()
    db.refresh(caseDoc)
    return caseDoc


def upload_to_gcp(caseDoc: entities.CaseDoc, db: Session):
    localPath = caseDoc.directory + "/" + caseDoc.fileName
    bucket = client.get_bucket(bucketName)
    blob = bucket.blob(caseDoc.case_id + "/" + caseDoc.fileName)
    blob.upload_from_filename(localPath)


def get_case_files(case_id: str, db: Session):
    return db.query(entities.CaseDoc).filter(entities.CaseDoc.case_id == case_id).all()



def get_case_chat(case_id: str, db: Session):
    chat: entities.CaseChat
    chat = db.query(entities.CaseChat).filter(entities.CaseChat.case_id == case_id).first()
    chatResponse = schema.CaseChatResponse(id=chat.id, case_id=chat.case_id, messages=[])
    totalMessages = len(chat.systemMessages) + len(chat.userMessages)
    resultMessages = [schema.Message(role="", content="") for _ in range(totalMessages)]

    i = 0
    for message in chat.systemMessages:
        resultMessages[i] = schema.Message(role="system", content=message)
        i = i + 2


    i = 1
    for message in chat.userMessages:
        resultMessages[i] = schema.Message(role="user", content=message)
        i = i + 2

    chatResponse.messages = resultMessages
    return chatResponse


def post_chat_message(chat_id: str, type: str, chat: schema.ChatInput, db: Session):
    currChat: entities.CaseChat
    currChat = db.query(entities.CaseChat).filter(entities.CaseChat.id == chat_id).first()

    if type == "system":
        currChat.systemMessages.append(chat.userMessage)
        db.query(entities.CaseChat).filter(entities.CaseChat.id == chat_id).update({entities.CaseChat.systemMessages: currChat.systemMessages})
    else:
        currChat.userMessages.append(chat.userMessage)
        db.query(entities.CaseChat).filter(entities.CaseChat.id == chat_id).update({entities.CaseChat.userMessages: currChat.userMessages})

    print(currChat.userMessages)

    

    db.commit()
    db.refresh(currChat)
    return currChat

def start_processing(case_id: str, db: Session):
    case_files = get_case_files(case_id, db)
    


def getId():
    return str(uuid.uuid4())