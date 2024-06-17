from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
import os
from dotenv import load_dotenv
from auth import UserCreate, UserLogin, Token, signup, login, get_db
from scraping import scrape_article
from llmwar import get_summary, get_tags, get_sentiment, get_topic, get_answer_route

# Load environment variables
load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
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
async def get_all(url: str = Form(...)):
    title, content, comments, likes = scrape_article(url)
    if title:
        text = '"' + content + '"'
        summary = get_summary(text)
        tags = get_tags(text)
        sentiment = get_sentiment(comments)
        topic = get_topic(text)
        return JSONResponse({"summary": summary, "tags": tags, "sentiment": sentiment, "topic": topic})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")

# API endpoints for processing articles
# @app.post("/get_all")
# async def get_all(url: str, db: Session = Depends(get_db)):
#     title, content, comments, likes = scrape_article(url)
    
#     if not content:
#         raise HTTPException(status_code=400, detail="Unsupported or failed to fetch content")

#     summary = get_summary(content)
#     tags = get_tags(content)
#     sentiment = get_sentiment(content)
#     topics = get_topics(content)

#     return {
#         "title": title,
#         "content": content,
#         "comments": comments,
#         "likes": likes,
#         "summary": summary,
#         "tags": tags,
#         "sentiment": sentiment,
#         "topics": topics
#     }


@app.post("/get_answer")
async def get_answer_route(url: str, question: str, db: Session = Depends(get_db)):
    title, content, comments, likes = scrape_article(url)
    if not content:
        raise HTTPException(status_code=400, detail="Unsupported or failed to fetch content")
    answer = get_answer_route(content, question)
    return {
        "title": title,
        "content": content,
        "comments": comments,
        "likes": likes,
        "answer": answer
    }
