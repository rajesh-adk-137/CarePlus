import React, { useState, useEffect } from 'react';
import { FaGithub, FaHome, FaInfoCircle, FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/');
    };

    const handleNavigation = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const userRole = localStorage.getItem('role');
            navigate(userRole === 'patient' ? '/fillup' : userRole === 'doctor' ? '/doctor' : '/');
        } else {
            navigate('/auth');
        }
    };

    return (
        <header className="bg-[#0d0f2f] text-white">
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <Link to="/" className="flex items-center">
                    <img src="/src/assets/images/giphy.webp" alt="CarePlus Logo" className="h-10 w-10 mr-3" />
                        <motion.div className='text-2xl font-bold' whileHover={{ scale: 1.05 }}>
                            Care<span className='text-[#00ff9d]'>Plus</span>
                        </motion.div>
                    </Link>
                    
                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-6">
                        <NavItem icon={<FaHome />} text="Home" onClick={handleNavigation} />
                        <NavItem icon={<FaInfoCircle />} text="About" to="/about" />
                        {isLoggedIn ? (
                            <NavItem icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} />
                        ) : (
                            <NavItem icon={<FaSignInAlt />} text="Login" to="/auth" />
                        )}
                        <a href="https://github.com/yourusername/yourrepo" target="_blank" rel="noopener noreferrer">
                            <motion.button whileHover={{ scale: 1.05 }} className="text-white">
                                <FaGithub size={24} />
                            </motion.button>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-white focus:outline-none">
                            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                                {isMobileMenuOpen ? (
                                    <path fillRule="evenodd" clipRule="evenodd" d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
                                ) : (
                                    <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden mt-3 space-y-2">
                        <NavItem icon={<FaHome />} text="Home" onClick={handleNavigation} mobile />
                        <NavItem icon={<FaInfoCircle />} text="About" to="/about" mobile />
                        {isLoggedIn ? (
                            <NavItem icon={<FaSignOutAlt />} text="Logout" onClick={handleLogout} mobile />
                        ) : (
                            <NavItem icon={<FaSignInAlt />} text="Login" to="/auth" mobile />
                        )}
                        <a href="https://github.com/yourusername/yourrepo" target="_blank" rel="noopener noreferrer" className="block py-2">
                            <FaGithub size={24} className="inline mr-2" /> GitHub
                        </a>
                    </div>
                )}
            </nav>
        </header>
    );
}

const NavItem = ({ icon, text, to, onClick, mobile }) => {
    const content = (
        <motion.div
            className={`flex items-center space-x-2 ${mobile ? 'py-2' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
        >
            {icon}
            <span>{text}</span>
        </motion.div>
    );

    if (to) {
        return <Link to={to} className="text-white hover:text-[#00ff9d] transition duration-300">{content}</Link>;
    }
    return <button onClick={onClick} className="text-white hover:text-[#00ff9d] transition duration-300">{content}</button>;
}

export default Navbar;