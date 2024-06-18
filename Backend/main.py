from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from auth import UserCreate, UserLogin, Token, signup, login, get_db, get_current_user
from database import User  # Import User model
from scraping import scrape_article
from llmwar import get_summary, get_tags, get_sentiment, get_topic, get_answer

# Load environment variables
import os
import requests
from dotenv import load_dotenv
load_dotenv()

OPA_SERVER_URL = os.getenv("OPA_SERVER_URL", "http://opa:8181")

def check_permissions(input_data):
    url = f"{OPA_SERVER_URL}/v1/data/authz/allow"
    response = requests.post(url, json={"input": input_data})
    if response.status_code == 200:
        print("potato")
        result = response.json()
        print("OPA response:", result)
        return result.get("result", False)
    else:
        print('tomato')
        print(f"OPA error response: {response.status_code} - {response.text}")
        return False

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

@app.post("/signup", response_model=Token)
async def signup_route(user: UserCreate, db: Session = Depends(get_db)):
    return await signup(user, db)

@app.post("/login", response_model=Token)
async def login_route(user: UserLogin, db: Session = Depends(get_db)):
    return await login(user, db)



@app.post("/get_all/")
async def get_all(url: str = Form(...), current_user: User = Depends(get_current_user)):
    # Check permissions using OPA
    input_data = {
        "user": {"role": current_user.role},  # Hardcoding role for testing
        "action": "read",
        "resource": "article"
    }
    print("Input data sent to OPA:", input_data)  # Debug print
    if not check_permissions(input_data):
        raise HTTPException(status_code=403, detail="Not authorized to access this resource")

    title, content, comments, likes = scrape_article(url)
    if title:
        text = '"' + content + '"'
        # For now just passing dummy answer, because these models are too large to run frequently.
        summary = "dummy_summary"  # Replace with get_summary(text) when models are available
        tags = "dummy_tags"        # Replace with get_tags(text) when models are available
        sentiment = "dummy_sentiment"  # Replace with get_sentiment(comments) when models are available
        topic = "dummy_topic"          # Replace with get_topic(text) when models are available
        return JSONResponse({"summary": summary, "tags": tags, "sentiment": sentiment, "topic": topic})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")


@app.post("/get_answer/")
async def get_answer_route(url: str = Form(...), question: str = Form(...), current_user: User = Depends(get_current_user)):
    # Check permissions using OPA
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

        # answer = get_answer(text, question)
        return JSONResponse({"answer": "answer"})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")
