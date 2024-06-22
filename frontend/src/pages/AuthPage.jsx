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
  const [role, setRole] = useState('patient'); // Default role set to 'patient'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        localStorage.setItem('role', userRole); // Save the role to local storage

        // Navigate based on role
        if (userRole === 'patient') {
          navigate('/fillup');
        } else if (userRole === 'doctor') {
          navigate('/doctor');
        } else {
          // Handle other roles if needed
          navigate('/');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please try again.');
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
          <h2 className="text-2xl font-bold mb-6">{isSignUp ? 'Sign Up' : 'Log In'}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            {isSignUp && (
              <>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    className="w-full border border-gray-300 p-2 rounded"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="role">Role</label>
                  <select
                    id="role"
                    className="w-full border border-gray-300 p-2 rounded"
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
              <label className="block mb-1 font-medium" htmlFor="email">Email</label>
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
              <label className="block mb-1 font-medium" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                className="w-full border border-gray-300 p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-500"
            >
              {isSignUp ? 'Sign Up' : 'Log In'}
            </button>
          </form>
          <button
            className="mt-4 text-blue-600 hover:underline"
            onClick={handleToggle}
          >
            {isSignUp ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up'}
          </button>
        </div>
      </motion.div>
      <Footer />
    </div>
  );
};

export default AuthPage;
