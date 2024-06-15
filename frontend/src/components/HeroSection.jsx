import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import heroImage from "../assets/images/learning-with-ai.png";
import { motion } from 'framer-motion';

const HeroSection = () => {
    const gradientStyle = {
        background: 'rgb(0,85,184)',
        background: 'radial-gradient(circle, rgb(0,85,184,1) 0%, rgba(0,0,0,1) 55%)'
    };

    const navigate = useNavigate();

    const handleTryItNow = () => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home');
        } else {
            navigate('/auth');
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-6 m-10 h-[80%] md:px-20'>
            <motion.div
                className='flex justify-center items-center col-span-3'
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div>
                    <motion.h1
                        className='text-green-400 text-xl tracking-widest'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    >
                        AI-POWERED TOOL
                    </motion.h1>
                    <motion.h1
                        className='hero-title text-5xl md:text-8xl font-bold my-3'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1, fontSize: 50, x: 15, y: 20 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                    >
                        ARTICLE ANALYZER
                    </motion.h1>
                    <motion.p
                        className='hero-description text-xl md:text-2xl text-[#aaabc4] my-10'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.5 }}
                    >
                        Transform your reading experience with ArticleInsight – an innovative web app that summarizes online articles, performs sentiment analysis, extracts keywords, and lets you ask questions related to the content.
                    </motion.p>
                    <motion.div
                        className='hero-buttons flex flex-row gap-10'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                    >
                        <button
                            onClick={handleTryItNow}
                            className='bg-[#171a8d] text-[#5ce1ff] font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#0f0e69] hover:shadow-lg'
                            whileHover={{ scale: 1.2, textShadow: "0px 0px 8px", borderShadow: "0px 0px 8px" }}
                            transition={{ duration: 0.1 }}
                        >
                            <span>TRY IT NOW</span>
                            <MdKeyboardDoubleArrowRight className="text-xl" />
                        </button>
                        <a href="https://quine.sh/repo/rajesh-adk-137-ArticleInsightGuide-808910229">
                            <motion.button className='bg-[#4fe331] text-black font-bold px-5 py-3 rounded-lg flex items-center justify-center space-x-2 transition duration-300 ease-in-out hover:bg-[#3fb427] hover:shadow-lg'
                                whileHover={{ scale: 1.2, borderShadow: "0px 0px 2px" }}
                                transition={{ duration: 0.1 }}>
                                <span>VOTE ON QUINE</span>
                                <MdKeyboardDoubleArrowRight className="text-xl" />
                            </motion.button>
                        </a>
                    </motion.div>
                </div>
            </motion.div>
            <motion.div
                className='col-span-3 flex justify-center items-center'
                style={gradientStyle}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div id="this-project" className='p-2 md:w-full md:max-w-md'>
                    <motion.img
                        src={heroImage}
                        alt="Hero Image"
                        className="w-full h-auto rounded-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.7, delay: 0.5 }}
                    />
                </div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
