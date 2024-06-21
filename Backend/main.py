from fastapi import FastAPI, Depends, HTTPException, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from auth import UserCreate, UserLogin, Token, signup, login, get_db, get_current_user
from database import User
import requests
import os
from dotenv import load_dotenv
import google.generativeai as genai

# Load environment variables
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

@app.post("/submit_symptoms")
async def submit_symptoms(
    illness: str = Form(...),
    symptoms: str = Form(...),
    duration: str = Form(...),
    feeling: int = Form(...),
    current_user: User = Depends(get_current_user)
):
    input_data = {
        "user": {"role": current_user.role},
        "action": "submit",
        "resource": "symptoms"
    }
    if not check_permissions(input_data):
        pass
        # raise HTTPException(status_code=403, detail="Not authorized to submit symptoms")
    
    # Use Gemini AI to classify severity
    severity = await classify_severity_with_gemini(illness, symptoms, duration, feeling)
    print("good")
    print(severity)
    return JSONResponse({"severity": severity})

async def classify_severity_with_gemini(illness, symptoms, duration, feeling):
    prompt = f"""
    Given the following patient information:
    Illness: {illness}
    Symptoms: {symptoms}
    Duration: {duration}
    Pain Rating: {feeling}
    Classify the severity of the condition into one of the following categories: mild, severe, extreme.
    """
    
    api_key = os.getenv("API_KEY")
    genai.configure(api_key=api_key)
    model=genai.GenerativeModel('gemini-1.5-flash')
    response=model.generate_content(prompt)
    return response.text

# You can define other routes here based on your requirements
