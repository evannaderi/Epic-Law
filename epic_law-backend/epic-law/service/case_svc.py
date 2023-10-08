from sqlalchemy.orm import Session
from fastapi import UploadFile
from google.cloud import storage
from google.oauth2 import service_account
from langchain.llms import OpenAI
from typing import List
from langchain.chains.question_answering import load_qa_chain


from ..models import entities, schema
from ..processors import image_parse, pdf_parser

import uuid
import os
from datetime import datetime

DOC_DIR = "./uploads/"
IMG_OUTPUT = "img_output.txt"
api_key = os.getenv("OPENAI_API_KEY")

EMBEDDINGS = None

credentials = service_account.Credentials.from_service_account_file('./intrepid-alloy-401317-038095ed3c75.json')
client = storage.Client(project='intrepid-alloy-401317', credentials=credentials)
bucketName = "pdf-reader-0001"

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


def post_chat_message(case_id: str, type: str, chat: schema.ChatInput, db: Session):
    currChat: entities.CaseChat
    currChat = db.query(entities.CaseChat).filter(entities.CaseChat.case_id == case_id).first()

    if type == "system":
        currChat.systemMessages.append(chat.userMessage)
        db.query(entities.CaseChat).filter(entities.CaseChat.case_id == case_id).update({entities.CaseChat.systemMessages: currChat.systemMessages})
    else:
        currChat.userMessages.append(chat.userMessage)
        db.query(entities.CaseChat).filter(entities.CaseChat.case_id == case_id).update({entities.CaseChat.userMessages: currChat.userMessages})    

    db.commit()
    db.refresh(currChat)
    return currChat


def start_processing(case_id: str, db: Session):
    global EMBEDDINGS
    case_files = get_case_files(case_id, db)
    
    data = []
    for file in case_files:
        if ".jpeg" in file.fileName:
            image_parse.extract_text_from_image(file.directory + "/" + file.fileName, file.directory + "/" + IMG_OUTPUT)
            image_data = image_parse.load_and_convert_txt(file.directory + "/" + IMG_OUTPUT)
            data = data + image_data
        elif ".pdf" in file.fileName:
            pdf_data = pdf_parser.load_and_convert_pdf(file.directory + "/" + file.fileName)
            data = data + pdf_data

    EMBEDDINGS = pdf_parser.process_text_and_get_embeddings(data)


def send_prompt_and_get_response(query):
    global EMBEDDINGS
    
    llm = OpenAI(temperature=0, openai_api_key=api_key)
    chain = load_qa_chain(llm, chain_type="stuff")
    docs = EMBEDDINGS.similarity_search(query)
    res = chain.run(input_documents=docs, question=query)
    print(res)
    return res

def query_case_info(query: schema.QueryInput, case_id: str, db: Session):
    
    currChat = post_chat_message(case_id, "user", schema.ChatInput(id="", case_id="", userMessage=query.query), db)

    res = send_prompt_and_get_response(query)

    currChat = post_chat_message(case_id, "system", schema.ChatInput(id="", case_id="", userMessage=res), db)

    return currChat



def getId():
    return str(uuid.uuid4())