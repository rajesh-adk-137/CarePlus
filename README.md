---
# CarePlus: AI-Powered Healthcare Management System

<p align="center">
  <a href="https://github.com/rajesh-adk-137/CarePlus/" target="blank">
    <img src="https://img.shields.io/github/watchers/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Watchers"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/CarePlus/fork" target="blank">
    <img src="https://img.shields.io/github/forks/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Forks"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/CarePlus/stargazers" target="blank">
    <img src="https://img.shields.io/github/stars/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Star"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/rajesh-adk-137/CarePlus/issues" target="blank">
    <img src="https://img.shields.io/github/issues/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Issues"/>
  </a>
  <a href="https://github.com/rajesh-adk-137/CarePlus/pulls" target="blank">
    <img src="https://img.shields.io/github/issues-pr/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="Open Pull Request"/>
  </a>
</p>
<p align="center">
  <a href="https://github.com/rajesh-adk-137/CarePlus/blob/master/LICENSE" target="blank">
    <img src="https://img.shields.io/github/license/rajesh-adk-137/CarePlus?style=for-the-badge&logo=appveyor" alt="License" />
  </a>
</p>

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
- [Demo](#demo)
- [Technical Demo](#technical-demo)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)

## Overview

CarePlus is an innovative healthcare management system that leverages AI to provide personalized medical advice and connect patients with appropriate healthcare professionals. The system caters to both patients and doctors, offering a seamless experience for symptom analysis, severity assessment, and doctor-patient communication.

## Key Features

- **User Authentication**: Signup and login processes for all users.
- **User Role based Access**: Different action for users based on thier role.
- **Doctor Profile Management**: Allows doctors to create and manage their professional profiles.
- **Patient Illness Analysis**: Allows patients to submit their illness with natural langauge description.
- **Symptom Analysis**: Utilizes LLMs to analyze patient symptoms and provide tailored advice.
- **Severity Assessment**: Categorizes health issues as mild, severe, or extreme, and grant access to different components based on polciy.
- **Immediate Remedies**: Offers medication suggestions, home remedies, and precautions based on symptom severity.
- **Doctor Recommendations**: Matches patients with suitable doctors based on their symptoms and doctor specialties.
- **Real-time Policy Enforcement**: Implements OPAL for dynamic access control and policy management.

## Technologies Used

- **Frontend**: React
- **Backend**: FastAPI
- **Database**: SQLite
- **AI Integration**: Google Gemini 
- **Authorization**: OPAL (Open Policy Administration Layer)
- **Containerization**: Docker
- **Authentication**: JWT (JSON Web Tokens)

## Getting Started

To get started with CarePlus, you'll need to set up both the frontend and backend components of the application.

## Installation

### Clone the Repository

```bash
git clone https://github.com/rajesh-adk-137/CarePlus.git
```

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd CarePlus/frontend
   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Start the development server:

   ```bash
   yarn run dev
   ```

### Backend Setup

1. Ensure you have Docker installed on your system and running. Windows users may install Docker Desktop.

2. Navigate to the backend directory:

   ```bash
   cd CarePlus/backend
   ```

3. Setting up a virtual environment (recommended):

   - Install virtualenv if you haven't already:

     ```bash
     pip install virtualenv
     ```

   - Create a virtual environment:

     ```bash
     virtualenv venv
     ```

   - Activate the virtual environment:
     - On Windows:

       ```bash
       venv\Scripts\activate
       ```

     - On macOS and Linux:

       ```bash
       source venv/bin/activate
       ```

4. Initialize Policies folder as a Git repository (For Opal configuration):

   ```bash
   cd policies
   git init
   git add .
   git commit -m "Initial commit"
   cd ..
   ```

5. Create a `.env` file in the backend directory with the following content:

   ```
   DATABASE_URL=sqlite:///./test.db
   SECRET_KEY=thiswillalsowork
   OPAL_SERVER_URL=http://opal_server:7002
   OPA_SERVER_URL=http://opa:8181
   API_KEY=YOUR_GEMINI_API_KEY
   ```

   Replace `YOUR_GEMINI_API_KEY` with your actual Gemini API key.

6. Build and start the Docker containers from backend directory:

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
   - Patient can contact you through the public email you added in your profile.

## Demo

<video src="https://github.com/rajesh-adk-137/CarePlus/assets/89499267/d24c8ff7-2614-414b-b85f-5ef1a7979360" controls></video>

## Technical Demo

## Screenshots

Landing Page:
![landing_page](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/93a13d24-d000-47fc-896e-5ad84e995f24)
about Page:
![about_page](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/8cdc8d93-e75e-424b-884b-a0a1b25bdd7a)

about app:
![about_app](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/29c97ff9-ff00-429f-ae19-798aa75d630e)

response for mild cases:
![response_for_mild_case](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/00af038e-1c78-425e-94e0-b9672962e0dd)

response for severe cases:
![response_for_severe_case](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/a382886f-e120-4ea3-90a8-ccfc7cd1865b)

response for extreme cases:
![response_for_extreme_case](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/8dd4e801-99d1-4d12-b00c-2868085185cd)


doctor card:
![doctor_card](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/35073fe6-8a9f-4c9e-827b-9a26e6d5f745)

illness form:
![illness_form](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/5e9851b2-7585-4123-91c9-9789e509dc55)


doctor form:
![doctor_form](https://github.com/rajesh-adk-137/CarePlus/assets/89499267/6ed7dc7a-e034-48b5-9d9c-1c968a7dfd79)


## Contributing

We welcome contributions to CarePlus! If you'd like to contribute, please follow these steps:

1. **Fork the repository**
2. **Create your feature branch**:

   ```bash
   git checkout -b feature/AmazingFeature
   ```

3. **Commit your changes**:

   ```bash
   git commit -m 'Add some AmazingFeature'
   ```

4. **Push to the branch**:

   ```bash
   git push origin feature/AmazingFeature
   ```

5. **Open a Pull Request**

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Google Gemini API](https://ai.google.com/gemini) for AI-powered symptom analysis
- [React](https://reactjs.org/) for the frontend framework
- [FastAPI](https://fastapi.tiangolo.com/) for the backend framework
- [OPAL](https://www.opal.ac/) for dynamic access control
- [Docker](https://www.docker.com/) for containerization
- [SQLite](https://www.sqlite.org/index.html) for the database

---