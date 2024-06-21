import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const FillUp = () => {
  const [illness, setIllness] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');
  const [feeling, setFeeling] = useState(5);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      const token = localStorage.getItem('token');
      const data = new URLSearchParams({
        illness,
        symptoms,
        duration,
        feeling: feeling.toString(),
      }).toString();

      const response = await axios.post(
        'http://localhost:8000/submit_symptoms',
        data,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        // Assuming the API returns a role or severity level
        const { role } = response.data;
        // navigate(`/airesponse?role=${role}`);
        navigate(`/response`);
      }
    } catch (err) {
      setError('Failed to submit symptoms. Please try again.');
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
              <label className="block mb-1 font-medium" htmlFor="illness">Nature of Illness</label>
              <input
                type="text"
                id="illness"
                className="w-full border border-gray-300 p-2 rounded"
                value={illness}
                onChange={(e) => setIllness(e.target.value)}
                required
              />
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
              <label className="block mb-1 font-medium" htmlFor="duration">Duration of Symptoms</label>
              <input
                type="text"
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

export default FillUp;
