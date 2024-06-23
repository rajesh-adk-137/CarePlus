import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok, FaHome, FaInfoCircle, FaEnvelope, FaQuestionCircle } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="bg-[#0d0f2f] text-white py-8">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <Link to="/" className="flex items-center mb-4">
                            <motion.img 
                                src="/src/assets/images/giphy.webp" 
                                alt="CarePlus Logo" 
                                className="h-10 w-10 mr-3" 
                                whileHover={{ scale: 1.1 }}
                            />
                            <motion.div className='text-2xl font-bold' whileHover={{ scale: 1.05 }}>
                                Care<span className='text-[#00ff9d]'>Plus</span>
                            </motion.div>
                        </Link>
                        <p className="text-gray-300 mb-4 max-w-md">CarePlus offers symptom analysis, severity assessment, and doctor recommendations.</p>
                        <div className="flex space-x-4">
                            <SocialIcon Icon={FaFacebook} />
                            <SocialIcon Icon={FaInstagram} />
                            <SocialIcon Icon={FaTiktok} />
                            <SocialIcon Icon={FaXTwitter} />
                            <SocialIcon Icon={FaLinkedin} />
                        </div>
                    </div>
                    <div>
    <h3 className="text-xl font-semibold mb-4 text-center md:text-right">Quick Links</h3>
    <ul className="flex space-x-6">
        <FooterLink icon={<FaInfoCircle />} text="Features" to="/about" />
        <FooterLink icon={< FaQuestionCircle/>} text="Opal" to="https://github.com/permitio/opal" />
        <FooterLink icon={<FaEnvelope />} text="Feedback" to="https://github.com/rajesh-adk-137" />
        <FooterLink icon={<FaQuestionCircle />} text="Quira" to="https://quira.sh/" />
    </ul>
</div>

                </div>
                <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
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
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.9 }}
    >
        <Icon size={24} />
    </motion.a>
);

const FooterLink = ({ icon, text, to }) => (
    <motion.li
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
    >
        <Link 
            to={to}
            className="flex items-center space-x-2 text-gray-300 hover:text-[#00ff9d] transition duration-300"
        >
            {icon}
            <span>{text}</span>
        </Link>
    </motion.li>
);

export default Footer;
