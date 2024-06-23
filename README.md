---
# CarePlus: AI-Powered Healthcare Management System

<p align="center">
  <a href="https://github.com/rajesh-adk-137/CarePlus/" target="blank"><img src="https://img.shields.io/github/watchers/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Watchers"/></a>
  <a href="https://github.com/rajesh-adk-137/CarePlus/fork" target="blank"><img src="https://img.shields.io/github/forks/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Forks"/></a>
  <a href="https://github.com/rajesh-adk-137/CarePlus/stargazers" target="blank"><img src="https://img.shields.io/github/stars/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Star"/></a>
</p>
<p align="center">
  <a href="https://github.com/rajesh-adk-137/CarePlus/issues" target="blank"><img src="https://img.shields.io/github/issues/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Issue"/></a>
  <a href="https://github.com/rajesh-adk-137/CarePlus/pulls" target="blank"><img src="https://img.shields.io/github/issues-pr/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/></a>
</p>
<p align="center">
  <a href="https://github.com/rajesh-adk-137/CarePlus/blob/master/LICENSE" target="blank"><img src="https://img.shields.io/github/license/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="License" /></a>
</p>

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
  - [Virtual Environment Setup](#virtual-environment-setup)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Overview

CarePlus is an innovative healthcare management system that leverages AI to provide personalized medical advice and connect patients with appropriate healthcare professionals. The system caters to both patients and doctors, offering a seamless experience for symptom analysis, severity assessment, and doctor-patient communication.

## Key Features

- **User Role-Based Access**: Separate signup and login processes for patients and doctors.
- **Doctor Profile Management**: Allows doctors to create and manage their professional profiles.
- **Symptom Analysis**: Utilizes Gemini AI to analyze patient symptoms and provide tailored advice.
- **Severity Assessment**: Categorizes health issues as mild, severe, or extreme, with appropriate responses for each level.
- **Immediate Remedies**: Offers medication suggestions, home remedies, and precautions based on symptom severity.
- **Doctor Recommendations**: Matches patients with suitable doctors based on their symptoms and doctor specialties.
- **Real-time Policy Enforcement**: Implements OPAL for dynamic access control and policy management.

## Technologies Used

- Frontend: React
- Backend: FastAPI
- Database: SQLite
- AI Integration: Google Gemini API
- Authorization: OPAL (Open Policy Administration Layer)
- Containerization: Docker
- Authentication: JWT (JSON Web Tokens)

## Getting Started

To get started with CarePlus, you'll need to set up both the frontend and backend components of the application.

## Installation

### Virtual Environment Setup

Setting up a virtual environment is recommended before proceeding with Docker setup:

1. Install `virtualenv` if you haven't already:
   ```bash
   pip install virtualenv
   ```

2. Create a virtual environment:
   ```bash
   virtualenv venv
   ```

3. Activate the virtual environment:
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```
   - On macOS and Linux:
     ```bash
     source venv/bin/activate
     ```

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/rajesh-adk-137/CarePlus.git
   ```

2. Navigate to the frontend directory:
   ```bash
   cd CarePlus/frontend
   ```

3. Install dependencies:
   ```bash
   yarn install
   ```

4. Start the development server:
   ```bash
   yarn run dev
   ```

### Backend Setup

1. Ensure you have Docker installed on your system. For Windows users, install Docker Desktop.

2. Navigate to the backend directory:
   ```bash
   cd CarePlus/backend
   ```

3. Create a `.env` file in the backend directory with the following content:
   ```
   DATABASE_URL=sqlite:///./test.db
   SECRET_KEY=thiswillalsowork
   OPAL_SERVER_URL=http://opal_server:7002
   OPA_SERVER_URL=http://opa:8181
   API_KEY=YOUR_GEMINI_API_KEY
   ```
   Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

4. Build and start the Docker containers:
   ```bash
   docker compose up --build
   ```

   For subsequent runs, you can simply use:
   ```bash
   docker compose up
   ```

   To stop the containers:
   ```bash
   docker compose down
   ```

## Usage

1. Access the frontend application by opening your browser and navigating to `http://localhost:5173`.
2. Sign up as either a patient or a doctor.
3. Log in to access the features specific to your role.
4. For patients:
   - Submit symptoms and receive AI-powered analysis and advice.
   - View doctor recommendations based on your symptoms.
5. For doctors:
   - Create and manage your professional profile.
   - View patient inquiries and respond to them.

## Contributing

We welcome contributions to CarePlus! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the [MIT License](LICENSE).

---
