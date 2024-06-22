import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaHome, FaInfoCircle, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#0d0f2f] text-white py-12">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div>
                        <Link to="/" className="flex items-center mb-4">
                            <img src="/src/assets/images/giphy.webp" alt="CarePlus Logo" className="h-10 w-10 mr-3" />
                            <motion.div className='text-2xl font-bold' whileHover={{ scale: 1.05 }}>
                                Care<span className='text-[#00ff9d]'>Plus</span>
                            </motion.div>
                        </Link>
                        <p className="text-gray-300 mb-6">Empowering your health journey with AI-driven insights and personalized care.</p>
                        <div className="flex space-x-4">
                            <SocialIcon Icon={FaFacebook} />
                            <SocialIcon Icon={FaInstagram} />
                            <SocialIcon Icon={FaTiktok} />
                            <SocialIcon Icon={FaXTwitter} />
                            <SocialIcon Icon={FaLinkedin} />
                        </div>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink icon={<FaHome />} text="Home" to="/" />
                            <FooterLink icon={<FaInfoCircle />} text="About Us" to="/about" />
                            <FooterLink icon={<FaEnvelope />} text="Contact" to="/contact" />
                            <FooterLink icon={<FaQuestionCircle />} text="FAQ" to="/faq" />
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-400">
                    © {new Date().getFullYear()} CarePlus. All rights reserved.
                </div>
            </div>
        </footer>
    );
};

const SocialIcon = ({ Icon }) => (
    <motion.a 
        href="#"
        className="text-gray-400 hover:text-[#00ff9d] transition duration-300"
        whileHover={{ scale: 1.2, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
    >
        <Icon size={24} />
    </motion.a>
);

const FooterLink = ({ icon, text, to }) => (
    <li>
        <Link 
            to={to}
            className="flex items-center space-x-2 text-gray-300 hover:text-[#00ff9d] transition duration-300"
        >
            {icon}
            <span>{text}</span>
        </Link>
    </li>
);

export default Footer;