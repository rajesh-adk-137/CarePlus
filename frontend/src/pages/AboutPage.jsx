import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div>
                <Navbar />
            </div>
            <main className="flex-1 bg-gradient-to-b from-blue-50 to-green-50">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                    <div className="px-6 md:px-8 space-y-12 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-6 md:gap-12 md:grid-cols-2">
                            <div>
                                <motion.h1 
                                    className="lg:leading-tighter text-4xl md:text-5xl xl:text-6xl font-bold text-[#0d0f2f]"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    Care<span className="text-[#00ff9d]">Plus</span>: Your AI-Powered Health Assistant
                                </motion.h1>
                                <motion.p 
                                    className="mt-4 text-lg text-gray-600"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                >
                                    Experience the future of healthcare with CarePlus, our AI-driven medical assistance app. 
                                    We utilize cutting-edge technology to provide personalized health insights and connect patients with the right care when they need it most.
                                </motion.p>
                            </div>
                            <div className="flex flex-col items-start space-y-6">
                                <motion.div 
                                    className="inline-block rounded-lg bg-green-100 px-4 py-2 text-lg font-semibold text-green-700"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    Key Features
                                </motion.div>
                                <ul className="grid gap-3 py-6">
                                    {[
                                        "AI-powered symptom analysis",
                                        "Severity assessment: mild, severe, or extreme",
                                        "Personalized care recommendations",
                                        "Direct connection to relevant specialists",
                                        "Emergency alerts for critical cases",
                                        "Separate interfaces for patients and doctors"
                                    ].map((feature, index) => (
                                        <motion.li 
                                            key={index} 
                                            className="flex items-center gap-2"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <HealthIcon className="w-6 h-6 text-green-500" />
                                            <span className="text-lg">{feature}</span>
                                        </motion.li>
                                    ))}
                                </ul>
                                <div className="flex flex-wrap gap-4">
                                    <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.3 }}>
                                        <Link
                                            className="inline-flex items-center justify-center rounded-md bg-[#0d0f2f] px-6 py-3 text-lg text-white font-medium shadow-lg transition-colors hover:bg-[#1a1c4a] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0f2f]"
                                            to='/auth'
                                        >
                                            Get Started
                                        </Link>
                                    </motion.div>
                                    <motion.div whileHover={{ scale: 1.005 }} transition={{ duration: 0.3 }}>
                                        <Link
                                            className="inline-flex items-center justify-center rounded-md border border-[#0d0f2f] bg-white px-6 py-3 text-lg font-medium text-[#0d0f2f] shadow-lg transition-colors hover:bg-[#e6e6fa] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0d0f2f]"
                                            to='/'
                                        >
                                            Learn More
                                        </Link>
                                    </motion.div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-6 md:px-8">
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-center text-[#0d0f2f] mb-12"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            How It Works
                        </motion.h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Sign Up", icon: "👤", description: "Create an account as a patient or doctor to access tailored features." },
                                { title: "Input Information", icon: "📝", description: "Patients describe symptoms, doctors provide their medical expertise." },
                                { title: "AI Analysis", icon: "🧠", description: "Our AI processes information to assess severity and provide recommendations." },
                                { title: "Get Care", icon: "👨‍⚕️", description: "Receive personalized advice, connect with specialists, or get emergency alerts." },
                                { title: "Doctor Matching", icon: "🤝", description: "Patients are matched with relevant doctors based on their condition." },
                                { title: "Continuous Support", icon: "🔄", description: "Ongoing access to medical resources and professional help as needed." }
                            ].map((step, index) => (
                                <motion.div 
                                    key={index} 
                                    className="bg-blue-50 rounded-lg p-6 text-center"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="text-4xl mb-4">{step.icon}</div>
                                    <h3 className="text-xl font-semibold text-[#0d0f2f] mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
                    <div className="container mx-auto px-6 md:px-8 text-center">
                        <motion.h2 
                            className="text-3xl md:text-4xl font-bold text-[#0d0f2f] mb-6"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            Your Health, Our Priority
                        </motion.h2>
                        <motion.p 
                            className="max-w-2xl mx-auto text-lg text-gray-600 mb-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            CarePlus is committed to providing accessible, intelligent healthcare solutions. 
                            Our app combines the power of AI with medical expertise to ensure you always have a reliable health partner at your fingertips.
                        </motion.p>
                        <motion.div whileHover={{ scale: 1.004 }} transition={{ duration: 0.3 }}>
                            <Link
                                className="inline-flex items-center justify-center rounded-md bg-[#00ff9d] px-6 py-3 text-lg text-[#0d0f2f] font-medium shadow-lg transition-colors hover:bg-[#00cc7d] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00ff9d]"
                                to='/'
                            >
                                Join CarePlus Today
                            </Link>
                        </motion.div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function HealthIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}
