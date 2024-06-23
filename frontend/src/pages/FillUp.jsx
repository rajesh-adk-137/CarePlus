import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const FillUp = () => {
  const [age, setAge] = useState(20);
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState(0);
  const [feeling, setFeeling] = useState(5);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('age', age);
      formData.append('gender', gender);
      formData.append('symptoms', symptoms);
      formData.append('duration', duration);
      formData.append('feeling', feeling);

      const response = await axios.post(
        'http://localhost:8000/submit_symptoms',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const responsedData = JSON.parse(response.data.response);
        console.log(responsedData)
        navigate(`/response`, { state: { responsedData } });
      }
    } catch (err) {
      setError('Failed to submit symptoms. Please try again.');
    } finally {
      setLoading(false);
    }
  };
 return (
    <div className="min-h-screen flex flex-col  bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
      <Navbar />
      <motion.div
        className="flex-grow flex items-center justify-center py-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1a237e]">Describe Your Illness</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="symptoms">Description of Symptoms</label>
              <textarea
                id="symptoms"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="duration">Duration of Symptoms (in days)</label>
              <input
                type="number"
                id="duration"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="feeling">Current Feeling (1-10)</label>
              <input
                type="range"
                id="feeling"
                min="1"
                max="10"
                className="w-full accent-blue-500"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
              />
              <div className="text-center text-gray-700 font-bold mt-2">{feeling}</div>
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500  text-white p-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
          {loading && (
            <motion.div
              className="flex justify-center items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="loader text-blue-500">Loading Response...</div>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default FillUp;