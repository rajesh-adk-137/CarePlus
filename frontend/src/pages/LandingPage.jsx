import React from 'react';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';

const LandingPage = () => {
    const heroVariants = {
        hidden: { opacity: 0.8, y: -10 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    const faqVariants = {
        hidden: { opacity: 0.8, scale: 0.95 },
        visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
    };

    const footerVariants = {
        hidden: { opacity: 0.7, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 1 } }
    };

    const ref = React.useRef(null);
    const isInView = useInView(ref, { once: true });

    return (
        <div className="bg-black text-white">
            <Navbar />
            <main>
                <motion.section 
                    initial="hidden" 
                    animate="visible" 
                    variants={heroVariants}
                >
                    <HeroSection />
                </motion.section>
                <motion.section 
                    ref={ref}
                    initial="hidden" 
                    animate={isInView ? "visible" : "hidden"} 
                    variants={faqVariants}
                >
                    <FAQ />
                </motion.section>
            </main>
            <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={footerVariants}
            >
                <Footer />
            </motion.div>
        </div>
    );
};

export default LandingPage;
