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
        ? { email, password, username, role: "user" }
        : { email, password };

      const response = await axios.post(url, data);
      if (response.status === 200) {
        console.log(response.data)
        localStorage.setItem('token', response.data.access_token);
        navigate('/home');
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


// //AuthPage.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { motion } from 'framer-motion';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';

// const AuthPage = () => {
//   const [isSignUp, setIsSignUp] = useState(true);
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [username, setUsername] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleToggle = () => {
//     setIsSignUp(!isSignUp);
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       setError('');
//       const url = isSignUp ? 'http://localhost:8000/signup' : 'http://localhost:8000/login';
//       const data = isSignUp
//         ? { email, password, username, role: "user" }
//         : { email, password };

//       const response = await axios.post(url, data);
//       if (response.status === 200) {
//         localStorage.setItem('token', response.data.access_token);
//         navigate('/home');
//       }
//     } catch (err) {
//       setError('Authentication failed. Please try again.');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100 text-black">
//       <div className="bg-black text-white">
//         <Navbar />
//       </div>
//       <motion.div
//         className="flex-grow flex items-center justify-center mt-20"
//         initial={{ opacity: 0, y: -50 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//       >
//         <motion.div
//           className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md"
//           whileHover={{ scale: 1.05 }}
//         >
//           <h1 className="text-2xl font-bold text-center mb-4">{isSignUp ? 'Sign Up' : 'Log In'}</h1>
//           <form className="space-y-4" onSubmit={handleSubmit}>
//             {isSignUp && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700">Username</label>
//                 <motion.input
//                   type="text"
//                   className="w-full p-2 mt-1 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   value={username}
//                   onChange={(e) => setUsername(e.target.value)}
//                   required
//                   whileFocus={{ scale: 1.02 }}
//                 />
//               </div>
//             )}
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Email</label>
//               <motion.input
//                 type="email"
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 required
//                 whileFocus={{ scale: 1.02 }}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">Password</label>
//               <motion.input
//                 type="password"
//                 className="w-full p-2 mt-1 rounded-lg bg-gray-200 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 whileFocus={{ scale: 1.02 }}
//               />
//             </div>
//             {error && <div className="text-red-500 text-center">{error}</div>}
//             <motion.button
//               type="submit"
//               className="w-full p-2 bg-blue-600 rounded-lg hover:bg-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
//               whileHover={{ scale: 1.05 }}
//             >
//               {isSignUp ? 'Sign Up' : 'Log In'}
//             </motion.button>
//           </form>
//           <p className="text-center mt-4">
//             {isSignUp ? 'Already have an account?' : "Don't have an account?"}
//             <motion.button
//               onClick={handleToggle}
//               className="text-blue-400 hover:underline ml-2"
//               whileHover={{ scale: 1.05 }}
//             >
//               {isSignUp ? 'Log In' : 'Sign Up'}
//             </motion.button>
//           </p>
//         </motion.div>
//       </motion.div>
//       <Footer />
//     </div>
//   );
// };

// export default AuthPage;
