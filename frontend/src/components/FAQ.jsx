import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqData = [
    {
        question: "What is CarePlus?",
        answer: "CarePlus is an AI-powered health assistant app that provides personalized symptom analysis, severity assessment, and connects patients with appropriate medical care."
    },
    {
        question: "How does CarePlus analyze symptoms?",
        answer: "CarePlus uses advanced AI technology, specifically the Gemini API, to analyze patient-reported symptoms, age, gender, and other factors to provide a comprehensive health assessment."
    },
    {
        question: "What types of users can sign up for CarePlus?",
        answer: "CarePlus supports two types of users: patients and doctors. Each user type has access to different features tailored to their needs."
    },
    {
        question: "How does CarePlus determine the severity of a condition?",
        answer: "CarePlus assesses the severity of a condition based on the symptoms reported, their duration, and the patient's self-reported pain level. It categorizes cases as mild, severe, or extreme."
    },
    {
        question: "Can I connect with doctors through CarePlus?",
        answer: "Yes, for severe and extreme cases, CarePlus provides a doctor card component that displays relevant specialists based on your symptoms. You can contact these doctors directly through the app."
    }
];

const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="bg-gradient-to-br from-green-100 via-green-150 to-green-200 rounded-lg mb-4 overflow-hidden shadow-sm"
            initial={false}
            animate={{ backgroundColor: isOpen ? "#d4ebf7" : "#e0f7ff" }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <motion.button
                className="flex justify-between items-center w-full text-left px-6 py-4"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.02 }}
            >
                <motion.span 
                    className="text-md font-medium text-gray-900"
                    whileHover={{ color: "#007bff" }}
                    transition={{ duration: 0.3 }}
                >
                    {question}
                </motion.span>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <FaChevronDown className="text-gray-500" />
                </motion.div>
            </motion.button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="px-6 pb-4 text-sm text-gray-600"
                    >
                        {answer}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const FAQ = () => {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <motion.h2 
                    className="text-3xl font-bold text-gray-900 text-center mb-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <motion.span
                        className="bg-gradient-to-br from-blue-100 via-blue-150 to-blue-200 px-4 py-1 rounded inline-block"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        Frequently Asked Questions
                    </motion.span>
                </motion.h2>
                <div className="flex flex-col lg:flex-row items-start justify-between">
                    <div className="lg:w-3/5 pr-0 lg:pr-8">
                        {faqData.map((item, index) => (
                            <FAQItem key={index} question={item.question} answer={item.answer} />
                        ))}
                    </div>
                    <motion.div 
                        className="lg:w-2/5 mt-8 lg:mt-0 flex justify-center items-start lg:-mt-16"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                    >
                        <motion.img 
                            src="/src/assets/images/freq.svg" 
                            alt="FAQ Illustration" 
                            className="w-full max-w-md h-auto object-contain"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
