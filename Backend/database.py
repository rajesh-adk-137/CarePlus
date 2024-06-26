from sqlalchemy import Column, Integer, String, create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
Base = declarative_base()
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=False, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    role = Column(String)

class DoctorProfile(Base):
    __tablename__ = 'doctor_profiles'
    id = Column(Integer, primary_key=True, index=True)
    full_name = Column(String, nullable=False)
    expertise = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    experience = Column(Integer, nullable=False)
    profile_picture = Column(String, nullable=True)  # Assuming it's a path to the image

Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
