import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      setError('');
      const url = isSignUp ? 'http://localhost:8000/signup' : 'http://localhost:8000/login';
      const data = isSignUp
        ? { email, password, username, role }
        : { email, password };

      const response = await axios.post(url, data);
      if (response.status === 200) {
        const { access_token, role: userRole } = response.data;
        localStorage.setItem('token', access_token);
        localStorage.setItem('role', userRole);

        if (userRole === 'patient') {
          navigate('/fillup');
        } else if (userRole === 'doctor') {
          navigate('/doctor');
        } else {
          navigate('/');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
    } finally {
      setLoading(false);
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
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
          <h2 className="text-3xl font-bold mb-6 text-center text-[#1a237e]">
            {isSignUp ? 'Sign Up' : 'Log In'}
          </h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div>
                  <label className="block mb-2 font-medium text-gray-700" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium text-gray-700" htmlFor="role">Role</label>
                  <select
                    id="role"
                    className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    required
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                  </select>
                </div>
              </>
            )}
            <div>
              <label className="block mb-2 font-medium text-gray-700" htmlFor="email">Email</label>
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
              <label className="block mb-2 font-medium text-gray-700" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Log In')}
            </button>
          </form>
          <button
            className="mt-4 text-blue-600 hover:underline font-medium block w-full text-center"
            onClick={handleToggle}
          >
            {isSignUp ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
          </button>
          {loading && (
            <motion.div
              className="flex justify-center items-center mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="loader text-blue-500">Authenticating...</div>
            </motion.div>
          )}
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AuthPage;



