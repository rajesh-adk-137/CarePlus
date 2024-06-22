from fastapi import FastAPI, Depends, HTTPException, Form, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from auth import UserCreate, UserLogin, Token, PolicyVerificationRequest, signup, login, get_db, get_current_user
from database import User, DoctorProfile, get_db
import requests
import os
from PIL import Image
from dotenv import load_dotenv
import google.generativeai as genai
import shutil
import base64
from io import BytesIO

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
        "user": {"role": 'patient'},
        "action": "submit",
        "resource": "symptoms"
    }
    if not check_permissions(input_data):
        raise HTTPException(status_code=403, detail="Not authorized to submit symptoms")
    
    # Use Gemini AI to classify severity
    response = await classify_and_respond_with_gemini(age, gender, symptoms, duration, feeling)
    response = response.strip("```json\n```")
    print(response)
    return JSONResponse({"response": response})

async def classify_and_respond_with_gemini(age, gender, symptoms, duration, feeling):
    # Generate detailed response based on the severity
    prompt_response = f"""
    Given the following patient information:
    Age: {age}
    Gender: {gender}
    Symptoms: {symptoms} (description by the patient; can be symptoms or nature of illness)
    Duration: {duration} days
    Pain Rating: {feeling} (scale of 1 to 10, 1 being fine, 10 being feeling extremely bad)
    
    Provide the following details in strict JSON format. You are an expert system responding to the patient, so only provide the JSON format with no extra information. Remember, if you don't have a response for any field, leave it empty but never divert from the JSON format:
    
    {{
      "symptoms_analysis": ["Symptom analysis and potential causes in array format. Each analysis in a separate string."],
      "severity": "Categorize the illness as 'mild', 'severe', or 'extreme'. If it is more than mild, just return 'severe'.",
      "immediate_remedies": {{
        "medication": ["Over-the-counter medications or prescribed drugs. Leave empty for extreme cases."],
        "home_remedies": ["Tips on rest, hydration, and diet. Leave empty for extreme cases."],
        "avoid": ["Foods, activities, or behaviors to avoid."]
      }},
      "doctor": "Types of specialists or primary care physicians relevant to the symptoms. Choose one closest from: Neurology, Cardiology, Pediatrics, Orthopedics, Dermatology, Gastroenterology, Oncology, Psychiatry, Allergist, Ophthalmology, Radiology, General Physician."
    }}
    
    Example of expected JSON format:
    {{
      "symptoms_analysis": ["Possible cause 1", "Possible cause 2"],
      "severity": "severe",
      "immediate_remedies": {{
        "medication": ["Medication 1", "Medication 2"],
        "home_remedies": ["Rest", "Hydration", "Balanced diet"],
        "avoid": ["Avoid spicy foods", "Avoid strenuous activity"]
      }},
      "doctor": "Gastroenterology"
    }}
    """

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

@app.post("/doctor")
async def submit_doctor_profile(
    full_name: str = Form(...),
    expertise: str = Form(...),
    email: str = Form(...),
    experience: int = Form(...),
    profile_picture: UploadFile = File(None),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    input_data = {
        "user": {"role": current_user.role},
        "action": "submit_doctor_info",
        "resource": "doctors_database"
    }
    if not check_permissions(input_data):
       raise HTTPException(status_code=403, detail="Not authorized to submit doctor info")

    existing_profile = db.query(DoctorProfile).filter(DoctorProfile.email == email).first()
    if existing_profile:
        raise HTTPException(status_code=400, detail="Email already registered")

    profile_picture_path = None
    if profile_picture:
        profile_directory = "profiles"
        os.makedirs(profile_directory, exist_ok=True)
        profile_picture_path = os.path.join(profile_directory, profile_picture.filename)
        
        # Save the uploaded image temporarily
        temp_path = os.path.join(profile_directory, "temp_" + profile_picture.filename)
        with open(temp_path, "wb") as buffer:
            shutil.copyfileobj(profile_picture.file, buffer)
        
        # Open the image and resize it
        with Image.open(temp_path) as img:
            img = img.convert("RGB")  # Convert to RGB if necessary
            img = img.resize((120, 120))  # Resize the image to 120x120
            img.save(profile_picture_path)  # Save the resized image
        
        # Remove the temporary file
        os.remove(temp_path)

    doctor_profile = DoctorProfile(
        full_name=full_name,
        expertise=expertise,
        email=email,
        experience=experience,
        profile_picture=profile_picture_path
    )
    db.add(doctor_profile)
    db.commit()
    db.refresh(doctor_profile)

    return {"message": "Doctor profile created successfully"}

@app.get("/doctors")
async def get_doctors(db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    input_data = {
        "user": {"role": current_user.role},
        "action": "view",
        "resource": "doctors_database"
    }
    if not check_permissions(input_data):
       raise HTTPException(status_code=403, detail="Not authorized to view doctors")

    doctors = db.query(DoctorProfile).all()
    
    doctor_list = []
    for doctor in doctors:
        doctor_dict = {
            "id": doctor.id,
            "full_name": doctor.full_name,
            "expertise": doctor.expertise,
            "email": doctor.email,
            "experience": doctor.experience,
            "profile_picture": None
        }
        
        if doctor.profile_picture and os.path.exists(doctor.profile_picture):
            with open(doctor.profile_picture, "rb") as img_file:
                img_data = img_file.read()
                img = Image.open(BytesIO(img_data))
                img = img.convert("RGB")
                img = img.resize((120, 120))
                buffered = BytesIO()
                img.save(buffered, format="JPEG")
                img_str = base64.b64encode(buffered.getvalue()).decode()
                doctor_dict["profile_picture"] = f"data:image/jpeg;base64,{img_str}"
        
        doctor_list.append(doctor_dict)

    return doctor_list

@app.post("/policy_verification")
async def policy_verification(
    request: PolicyVerificationRequest,
    current_user: User = Depends(get_current_user)
):
    input_data = {
        "user": {"role": current_user.role},
        "severity": request.severity,
        "action": "read",
        "resource": request.resource
    }
    if check_permissions(input_data):
        return {"allowed": True}
    else:
        return {"allowed": False}
