import time
import requests
from fastapi import FastAPI, Depends, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from auth import UserCreate, UserLogin, Token, signup, login, get_db, get_current_user
from database import User  # Import User model
from scraping import scrape_article
from llmwar import get_summary, get_tags, get_sentiment, get_topic, get_answer
import os
from dotenv import load_dotenv

load_dotenv()
app = FastAPI()

origins = [
    "http://localhost:5173",
    # Add other origins if needed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def check_permissions(input_data):
    try:
        response = requests.post("http://opal_client:8181/v1/data/authz/allow", json={"input": input_data})
        response.raise_for_status()
        result = response.json()
        return result.get("result", False)
    except Exception as e:
        print(f"Error checking permissions: {e}")
        return False


@app.post("/signup", response_model=Token)
async def signup_route(user: UserCreate, db: Session = Depends(get_db)):
    return await signup(user, db)

@app.post("/login", response_model=Token)
async def login_route(user: UserLogin, db: Session = Depends(get_db)):
    return await login(user, db)

@app.post("/get_all/")
async def get_all(url: str = Form(...), current_user: User = Depends(get_current_user)):
    input_data = {
        "user": {"role": current_user.role},
        "action": "read",
        "resource": "article"
    }
    print("Input data sent to OPA:", input_data)
    if not check_permissions(input_data):
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")

    title, content, comments, likes = scrape_article(url)
    if title:
        text = '"' + content + '"'
        summary = "dummy_summary"
        tags = "dummy_tags"
        sentiment = "dummy_sentiment"
        topic = "dummy_topic"
        return JSONResponse({"summary": summary, "tags": tags, "sentiment": sentiment, "topic": topic})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")

@app.post("/get_answer/")
async def get_answer_route(url: str = Form(...), question: str = Form(...), current_user: User = Depends(get_current_user)):
    input_data = {
        "user": {"role": current_user.role},
        "action": "read",
        "resource": "answer"
    }
    if not check_permissions(input_data):
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")

    title, content, comments, likes = scrape_article(url)
    if title:
        text = '"' + content + '"'

        if not question:
            raise HTTPException(status_code=400, detail="Question parameter is required for get_answer function")

        return JSONResponse({"answer": "answer"})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")
