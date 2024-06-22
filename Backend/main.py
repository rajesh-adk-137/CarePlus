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
import json

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
    age: int = Form(...),
    gender: str = Form(...),
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
    response = await classify_and_respond_with_gemini(age, gender, symptoms, duration, feeling)
    print(response)
    print("good")
    response = response.strip("```json\n```")
    print(response)
    return JSONResponse({"response": response})




async def classify_and_respond_with_gemini(age, gender, symptoms, duration, feeling):
    # Generate detailed response based on the severity
    prompt_response = f"""
    Given the following patient information:
    Age: {age}
    Gender: {gender}
    Symptoms: {symptoms} description by the patient, can be symptoms or nature of illness
    Duration: {duration} days
    Pain Rating: {feeling} (scale of 1 to 10, 1 being fine, 10 being extremely bad)
    
    Provide the following details in JSON format as you are talking to the patient as an expert system, strictly provide the JSON format, no extra information please, rememeber you are replying to the patient, also if you don't have respose for each reply field, keep it empty, but never divert from json format:
    - Symptom Analysis 'symptoms_analysis' : A brief overview of the symptoms described and potential cause or disease, in array format in few points
    - Categorize the illness in terms of severity 'severity': mild, severe, extreme.<if you think it is more than mild, just return severe>
    - Immediate Remedies as array of 'immediate_remedies' with following 3 arrays inside:
      - Medications as first array 'medication': Over-the-counter medications or prescribed drugs (leave empty for extreme cases).
      - Home Remedies as second array 'home_remedies': Tips on rest, hydration, and diet (leave empty for extreme cases).
      - Things to Avoid as third array 'avoid': Foods, activities, or behaviors to avoid.
    - Potential Doctor to Consult 'doctor': Types of specialists or primary care physicians relevant to the symptoms from one of these, select one which is closest: Neurology, Cardiology, Pediatrics, Orthopedics, Dermatology, Gastroenterology, Oncology, Psychiatry, Allergist,Ophthalmology,Radiology or General Physician"""

    api_key = os.getenv("API_KEY")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-pro')
    result = model.generate_content(prompt_response)
    print(result)

    # Ensure the result contains the expected structure
    if not result.candidates:
        raise ValueError("No candidates found in the response")
    
    response_detailed = result.text
    return response_detailed
