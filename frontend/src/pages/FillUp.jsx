import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const FillUp = () => {
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState(0);
  const [feeling, setFeeling] = useState(5);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); // Add loading state
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when the form is submitted
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
        const responseData = JSON.parse(response.data.response);
        console.log(responseData)
        navigate(`/response`, { state: { responseData } });
      }
    } catch (err) {
      setError('Failed to submit symptoms. Please try again.');
    } finally {
      setLoading(false); // Set loading to false after the request is finished
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
          <h2 className="text-2xl font-bold mb-6">Fill Up Your Symptoms</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-1 font-medium" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                className="w-full border border-gray-300 p-2 rounded"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="gender">Gender</label>
              <select
                id="gender"
                className="w-full border border-gray-300 p-2 rounded"
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
              <label className="block mb-1 font-medium" htmlFor="symptoms">Description of Symptoms</label>
              <textarea
                id="symptoms"
                className="w-full border border-gray-300 p-2 rounded"
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="duration">Duration of Symptoms (in days)</label>
              <input
                type="number"
                id="duration"
                className="w-full border border-gray-300 p-2 rounded"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="block mb-1 font-medium" htmlFor="feeling">Current Feeling (1-10)</label>
              <input
                type="range"
                id="feeling"
                min="1"
                max="10"
                className="w-full"
                value={feeling}
                onChange={(e) => setFeeling(e.target.value)}
              />
              <div className="text-center">{feeling}</div>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
              disabled={loading} // Disable button when loading
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
              <div className="loader">Loading Response...</div>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default FillUp;
