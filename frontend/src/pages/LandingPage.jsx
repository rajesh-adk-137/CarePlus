import React from 'react';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
import { motion } from 'framer-motion';

const LandingPage = () => {
    return (
        <div className="bg-black text-white">
            <Navbar />
            <main>
                <section >
                    <HeroSection />
                </section>
                <motion.section
                    // initial={{ opacity: 0.8 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                >
                    <FAQ />
                </motion.section>
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
