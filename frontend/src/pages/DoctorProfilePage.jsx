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
      formData.append('full_name', fullName); // updated to match backend parameter name
      formData.append('expertise', expertise);
      formData.append('email', email);
      formData.append('experience', experience);
      if (profilePicture) {
        formData.append('profile_picture', profilePicture); // updated to match backend parameter name
      }
  
      const response = await axios.post('http://localhost:8000/doctor', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (response.status === 200) {
        localStorage.removeItem('token');
        navigate('/');
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
    }
  };
  

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <motion.div
        className="flex-grow flex items-center justify-center mt-20"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-2xl font-bold mb-6">Doctor Profile</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium" htmlFor="fullName">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full border border-gray-300 p-2 rounded"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="expertise">Field of Expertise</label>
              <select
                id="expertise"
                className="w-full border border-gray-300 p-2 rounded"
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
              <label className="block mb-1 font-medium" htmlFor="email">Public Email</label>
              <input
                type="email"
                id="email"
                className="w-full border border-gray-300 p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="experience">Experience (Years)</label>
              <input
                type="number"
                id="experience"
                className="w-full border border-gray-300 p-2 rounded"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="profilePicture">Profile Picture</label>
              <input
                type="file"
                id="profilePicture"
                className="w-full border border-gray-300 p-2 rounded"
                onChange={(e) => setProfilePicture(e.target.files[0])}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
            >
              Submit
            </button>
          </form>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default DoctorProfilePage;
