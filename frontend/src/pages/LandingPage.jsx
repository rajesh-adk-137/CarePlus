import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/Features';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <>
            <div className="bg-black">
                <div className="bg-black text-white">
                    <Navbar />
                </div>
                <div className="bg-black text-white h-[85vh]">
                    <HeroSection />
                </div>
                <motion.div className="bg-black text-white"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9 }}>

                    <FeaturesSection />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.9 }}>

                    <FAQ />
                </motion.div>
                <Footer />
            </div>
        </>
    );
};

export default LandingPage;
