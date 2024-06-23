import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';
import heroImage from "../assets/images/hd1.png";

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
                            className="rounded-lg  w-full h-auto max-w-xl mx-auto mb-4" // Adjusted class for larger image and margin-bottom
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
                            CarePlus: Your Personalized Health Companion
                        </motion.h2>
                        <motion.h1 
                            className="text-5xl font-bold text-gray-800 mb-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Intelligent Healthcare, Anytime, Anywhere
                        </motion.h1>
                        <motion.p 
                            className="text-xl mb-8 text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            Empower your health journey with AI-driven insights and personalized care. CarePlus provides you with comprehensive health analysis, immediate remedies, and professional medical support tailored to your needs.
                        </motion.p>
                        <motion.p 
                            className="text-xl mb-8 text-gray-600"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 0.5 }}
                        >
                            Experience the future of healthcare with real-time AI analysis and instant access to the best medical advice.
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