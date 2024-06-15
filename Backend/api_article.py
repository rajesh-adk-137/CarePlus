from fastapi import FastAPI, Depends, HTTPException, status, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from llmware.models import ModelCatalog
from passlib.context import CryptContext
from jose import JWTError, jwt
from datetime import datetime, timedelta
from pydantic import BaseModel
from bs4 import BeautifulSoup
import requests
from urllib.parse import urlparse
import secrets


# Database setup
DATABASE_URL = "sqlite:///./test.db"
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Models
class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)

Base.metadata.create_all(bind=engine)

# Utility functions
SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# FastAPI setup
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class UserCreate(BaseModel):
    username: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str

# Authentication routes
@app.post("/signup", response_model=Token)
async def signup(user: UserCreate, db: Session = Depends(get_db)):
    hashed_password = get_password_hash(user.password)
    db_user = User(username=user.username, email=user.email, hashed_password=hashed_password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

@app.post("/login", response_model=Token)
async def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()
    if not db_user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    
    access_token = create_access_token(data={"sub": db_user.email})
    return {"access_token": access_token, "token_type": "bearer"}

# Generalized scraping function
def scrape_article(url):
    parsed_url = urlparse(url)
    domain = parsed_url.netloc

    if 'dev.to' in domain:
        return scrape_dev_article(url)
    elif 'medium.com' in domain or 'levelup.gitconnected.com' in domain:
        return scrape_medium_article(url)
    else:
        return None, 'Unsupported website', '', ''

def scrape_dev_article(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title_tag = soup.find('h1')
        title = title_tag.get_text() if title_tag else 'No title found'

        content_div = soup.find('div', class_='crayons-article__main')
        paragraphs = content_div.find_all('p') if content_div else []
        content = ''
        for paragraph in paragraphs:
            content += paragraph.get_text() + '\n\n'

        comments_divs = soup.find_all('div', class_='comment__body')
        comments = ''
        for comment_div in comments_divs:
            comments += comment_div.get_text() + '\n\n'

        likes = 'Likes information not extracted'

        lines = content.splitlines()
        filtered_lines = []

        remove_words_first_20 = ["Sign up", "Sign in", "Follow", "Listen", "Share"]
        remove_words_last_25 = [
            "--", "Building. Author of “Feeling Great About My Butt.” Previously: Creators @Medium, Product @embedly, Research @NECSI. http://whichlight.com.",
            "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech", "Teams"
        ]

        for i, line in enumerate(lines):
            if i < 20 and any(word in line for word in remove_words_first_20):
                continue
            filtered_lines.append(line)

        final_filtered_lines = []
        for i, line in enumerate(filtered_lines):
            if i >= len(filtered_lines) - 25 and any(word in line for word in remove_words_last_25):
                continue
            final_filtered_lines.append(line)

        filtered_content = '\n'.join(final_filtered_lines)

        return title, filtered_content, comments, likes
    else:
        return None, f'Error: Unable to fetch the article. Status code: {response.status_code}', '', ''

def scrape_medium_article(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')
        title_tag = soup.find('h1')
        title = title_tag.get_text() if title_tag else 'No title found'
        
        content = ''
        article_body = soup.find_all('p')
        for paragraph in article_body:
            content += paragraph.get_text() + '\n\n'
        
        comments_section = soup.find_all('div', class_='comment')
        likes_section = soup.find('button', class_='likeButton')
        
        comments = ''
        if comments_section is None or not comments_section:
            comments = ''
        else:
            for comment in comments_section:
                comments += comment.get_text() + '\n\n'
            
        likes = likes_section.get_text() if likes_section else 'No likes information found'
        
        lines = content.splitlines()
        filtered_lines = []
        
        remove_words_first_20 = ["Sign up", "Sign in", "Follow", "Listen", "Share"]
        remove_words_last_25 = [
            "--", "Building. Author of “Feeling Great About My Butt.” Previously: Creators @Medium, Product @embedly, Research @NECSI. http://whichlight.com.",
            "Help", "Status", "About", "Careers", "Press", "Blog", "Privacy", "Terms", "Text to speech", "Teams"
        ]
        
        for i, line in enumerate(lines):
            if i < 20 and any(word in line for word in remove_words_first_20):
                continue
            filtered_lines.append(line)
        
        final_filtered_lines = []
        for i, line in enumerate(filtered_lines):
            if i >= len(filtered_lines) - 25 and any(word in line for word in remove_words_last_25):
                continue
            final_filtered_lines.append(line)
        
        filtered_content = '\n'.join(final_filtered_lines)
        
        return title, filtered_content, comments, likes
    else:
        return None, f'Error: Unable to fetch the article. Status code: {response.status_code}', '', ''

# LLMware Models (assuming these functions are defined and working)
def get_summary(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-summary-tool") 
        response = slim_model.function_call(text, params=["key points (3)"], function="summarize")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_tags(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-tags-tool")
        response = slim_model.function_call(text, params=["tags"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_sentiment(comments):
    if comments != '':
        slim_model = ModelCatalog().load_model("slim-sentiment-tool")
        response = slim_model.function_call(comments, params=["sentiment"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_topic(text):
    if text is not None:
        slim_model = ModelCatalog().load_model("slim-topics-tool")
        response = slim_model.function_call(text, params=["topics"], function="classify")
        return response["llm_response"]
    else:
        return "Invalid text"

def get_answer(text, question):
    if text is not None and question is not None:
        slim_model = ModelCatalog().load_model("slim-qa-tool")
        response = slim_model.function_call(text, params=["answer"], function="answer")
        return response["llm_response"]
    else:
        return "Invalid text or question"

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

@app.post("/get_answer/")
async def get_answer_route(url: str = Form(...), question: str = Form(...)):
    title, content, comments, likes = scrape_article(url)
    if title:
        text = '"' + content + '"'

        if not question:
            raise HTTPException(status_code=400, detail="Question parameter is required for get_answer function")

        answer = get_answer(text, question)
        return JSONResponse({"answer": answer})
    else:
        raise HTTPException(status_code=400, detail="Error scraping the article.")
