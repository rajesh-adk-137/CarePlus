import React, { useState } from 'react';
import { motion } from 'framer-motion';

const listDescriptionVarients = {
    init: {
        opacity: 0,
        x: -200
    },
    after: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.5,
        }
    },
}
const listVarients = {
    after: {
        scale: 1.1,
        transition: { duration: 0.2, type: 'spring', stiffness: 100 }
    }
}

const FeaturesSection = () => {
    const [selected, setSelected] = useState(1);
    return (
        <div>
            <h1 id="features" className='text-center text-4xl font-bold tracking-wider'>DISCOVER WITH <span className='text-[#4fe331]'>HealthCareInsight</span></h1>
            <div className='grid md:grid-cols-2 m-16'>
                <motion.div className='m-5' initial={{ x: -100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }}>
                    <div onClick={() => setSelected(1)} className={`p-4 m-5 border-l-8 ${selected === 1 ? 'border-[#4fe331] border-opacity-100 bg-[#ffffff] shadow-2xl' : 'border-black border-opacity-25'}`} >
                        <motion.h3 variants={listVarients} whileHover='after' className={`text-2xl font-semibold`}>Health Monitoring</motion.h3>
                        {selected === 1 && (
                            <motion.div variants={listDescriptionVarients} initial='init' animate='after' className='my-2 p-2'>
                                <p className='font-light text-lg'>Track your health metrics in real-time and get detailed reports on your physical well-being.</p>
                            </motion.div>
                        )}
                    </div>
                    <div onClick={() => setSelected(2)} className={`p-4 m-5 border-l-8 ${selected === 2 ? 'border-[#4fe331] border-opacity-100 bg-[#ffffff] shadow-2xl' : 'border-black border-opacity-25'}`} >
                        <motion.h3 variants={listVarients} whileHover='after' className={`text-2xl font-semibold`}>Personalized Insights</motion.h3>
                        {selected === 2 && (
                            <motion.div variants={listDescriptionVarients} initial='init' animate='after' className='my-2 p-2'>
                                <p className='font-light text-lg'>Receive personalized health insights and recommendations tailored to your unique needs.</p>
                            </motion.div>
                        )}
                    </div>
                    <div onClick={() => setSelected(3)} className={`p-4 m-5 border-l-8 ${selected === 3 ? 'border-[#4fe331] border-opacity-100 bg-[#ffffff] shadow-2xl' : 'border-black border-opacity-25'}`} >
                        <motion.h3 variants={listVarients} whileHover='after' className={`text-2xl font-semibold`}>Expert Advice</motion.h3>
                        {selected === 3 && (
                            <motion.div variants={listDescriptionVarients} initial='init' animate='after' className='my-2 p-2'>
                                <p className='font-light text-lg'>Connect with health experts and get advice based on your health data and goals.</p>
                            </motion.div>
                        )}
                    </div>
                    <div onClick={() => setSelected(4)} className={`p-4 m-5 border-l-8 ${selected === 4 ? 'border-[#4fe331] border-opacity-100 bg-[#ffffff] shadow-2xl' : 'border-black border-opacity-25'}`} >
                        <motion.h3 variants={listVarients} whileHover='after' className={`text-2xl font-semibold`}>AI-Powered Health Analysis</motion.h3>
                        {selected === 4 && (
                            <motion.div variants={listDescriptionVarients} initial='init' animate='after' className='my-2 p-2'>
                                <p className='font-light text-lg'>Utilize advanced AI to analyze your health metrics and provide actionable insights.</p>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
                <motion.div initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut' }} className='m-5'>
                    {selected === 1 && (
                        <motion.img className='w-full h-auto rounded-lg' src='https://source.unsplash.com/500x500/?health,monitoring' alt='Health Monitoring' />
                    )}
                    {selected === 2 && (
                        <motion.img className='w-full h-auto rounded-lg' src='https://source.unsplash.com/500x500/?health,insights' alt='Personalized Insights' />
                    )}
                    {selected === 3 && (
                        <motion.img className='w-full h-auto rounded-lg' src='https://source.unsplash.com/500x500/?health,expert' alt='Expert Advice' />
                    )}
                    {selected === 4 && (
                        <motion.img className='w-full h-auto rounded-lg' src='https://source.unsplash.com/500x500/?ai,health' alt='AI-Powered Health Analysis' />
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default FeaturesSection;
