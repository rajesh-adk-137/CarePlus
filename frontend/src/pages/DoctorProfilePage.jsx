import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const DoctorProfilePage = () => {
  const [fullName, setFullName] = useState('');
  const [expertise, setExpertise] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Authentication failed. Please log in again.');
        return;
      }

      const formData = new FormData();
      formData.append('full_name', fullName);
      formData.append('expertise', expertise);
      formData.append('email', email);
      formData.append('experience', experience);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture);
      }

      const response = await axios.post('http://localhost:8000/doctor', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.status === 200) {
        localStorage.removeItem('token');
        setSuccess(true);
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <Navbar />
      <motion.div
        className="flex-grow flex items-center justify-center py-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {!success ? (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#1a237e]">Doctor Profile</h2>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="expertise">Field of Expertise</label>
                <select
                  id="expertise"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  required
                >
                  <option value="">Select Expertise</option>
                  <option value="General Physician">General Physician</option>
                  <option value="Cardiology">Cardiology</option>
                  <option value="Neurology">Neurology</option>
                  <option value="Pediatrics">Pediatrics</option>
                  <option value="Orthopedics">Orthopedics</option>
                  <option value="Dermatology">Dermatology</option>
                  <option value="Gastroenterology">Gastroenterology</option>
                  <option value="Oncology">Oncology</option>
                  <option value="Psychiatry">Psychiatry</option>
                  <option value="Allergist">Allergist</option>
                  <option value="Ophthalmology">Ophthalmology</option>
                  <option value="Radiology">Radiology</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="email">Public Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="experience">Experience (Years)</label>
                <input
                  type="number"
                  id="experience"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-medium text-gray-700" htmlFor="profilePicture">Profile Picture</label>
                <input
                  type="file"
                  id="profilePicture"
                  className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onChange={(e) => setProfilePicture(e.target.files[0])}
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Submit
              </button>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <h2 className="text-3xl font-bold mb-4 text-green-500">Success!</h2>
            <p className="mb-6">Your information is successfully included in the database.</p>
            <button
              className="bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              onClick={() => navigate('/')}
            >
              Go Back
            </button>
          </div>
        )}
      </motion.div>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;
