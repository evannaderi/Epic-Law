from fastapi import FastAPI, Header, HTTPException, Response
from fastapi.middleware.cors import CORSMiddleware

from .api.routes import case
from .models import responses
from .models.entities import Base
from .core.database import engine

app = FastAPI()
Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(case.router)

@app.get("/", responses={
    200: {"model": responses.Generic_response}})
async def home(response: Response) -> responses.Generic_response:
    return responses.Generic_response(message="Welcome to Epic Law app.")