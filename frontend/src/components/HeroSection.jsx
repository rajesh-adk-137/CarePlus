import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import heroImage from "../assets/images/reflect.png";

const HeroSection = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        const token = localStorage.getItem('token');
        const userRole = localStorage.getItem('role');
        
        if (token) {
            navigate(userRole === 'patient' ? '/fillup' : userRole === 'doctor' ? '/doctor' : '/');
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className="bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 min-h-screen flex items-center">
            <div className="container mx-auto px-6 py-12 md:py-24">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    <motion.div 
                        className="md:w-1/2 mb-12 md:mb-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <img 
                            src={heroImage} 
                            alt="AI in Healthcare" 
                            className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
                        />
                    </motion.div>
                    <motion.div 
                        className="md:w-1/2 md:pl-12"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <motion.h2 
                            className="text-3xl font-semibold text-blue-600 mb-2"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Intelligent Care for a Healthier You
                        </motion.h2>
                        <motion.h1 
                            className="text-5xl font-bold text-gray-800 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Smart Health Guidance
                        </motion.h1>
                        <motion.p 
                            className="text-xl mb-8 text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            Discover the Future of Health with AI: Experience personalized health guidance and proactive care recommendations driven by advanced AI technology, tailored just for you.
                        </motion.p>
                        <motion.button
                            onClick={handleGetStarted}
                            className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg flex items-center hover:bg-blue-700 transition duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                            <FaArrowRight className="ml-2" />
                        </motion.button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;



// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { FaArrowRight } from 'react-icons/fa';
// import heroImage from "../assets/images/reflect.png";

// const HeroSection = () => {
//     const navigate = useNavigate();

//     const handleGetStarted = () => {
//         const token = localStorage.getItem('token');
//         const userRole = localStorage.getItem('role');
        
//         if (token) {
//             navigate(userRole === 'patient' ? '/fillup' : userRole === 'doctor' ? '/doctor' : '/');
//         } else {
//             navigate('/auth');
//         }
//     };

//     return (
//         <div className="bg-gradient-to-br from-blue-100 to-blue-200 min-h-screen flex items-center">
//             <div className="container mx-auto px-6 py-12 md:py-24">
//                 <div className="flex flex-col md:flex-row items-center justify-between">
//                     <motion.div 
//                         className="md:w-1/2 mb-12 md:mb-0"
//                         initial={{ opacity: 0, x: -50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.6 }}
//                     >
//                         <img 
//                             src={heroImage} 
//                             alt="AI in Healthcare" 
//                             className="rounded-lg shadow-xl w-full h-auto max-w-md mx-auto"
//                         />
//                     </motion.div>
//                     <motion.div 
//                         className="md:w-1/2 md:pl-12"
//                         initial={{ opacity: 0, x: 50 }}
//                         animate={{ opacity: 1, x: 0 }}
//                         transition={{ duration: 0.6, delay: 0.2 }}
//                     >
//                         <motion.h2 
//                             className="text-3xl font-semibold text-blue-600 mb-2"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.4, duration: 0.5 }}
//                         >
//                             Intelligent Care for a Healthier You
//                         </motion.h2>
//                         <motion.h1 
//                             className="text-5xl font-bold text-gray-800 mb-6"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.2, duration: 0.5 }}
//                         >
//                             Smart Health Guidance
//                         </motion.h1>
//                         <motion.p 
//                             className="text-xl mb-8 text-gray-600"
//                             initial={{ opacity: 0 }}
//                             animate={{ opacity: 1 }}
//                             transition={{ delay: 0.6, duration: 0.5 }}
//                         >
//                             Discover the Future of Health with AI: Experience personalized health guidance and proactive care recommendations driven by advanced AI technology, tailored just for you.
//                         </motion.p>
//                         <motion.button
//                             onClick={handleGetStarted}
//                             className="bg-blue-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg flex items-center hover:bg-blue-700 transition duration-300"
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                         >
//                             Get Started
//                             <FaArrowRight className="ml-2" />
//                         </motion.button>
//                     </motion.div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HeroSection;