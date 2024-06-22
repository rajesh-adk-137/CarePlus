import React, { useState, useEffect } from 'react';
import { GiHamburgerMenu } from "react-icons/gi";
import { ImCross } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    const handleClick = () => {
        setClick(!click);
    };

    const closeMobileMenu = () => {
        setClick(false);
    };

    const showButton = () => {
        if (window.innerWidth <= 760) {
            setButton(false);
        } else {
            setButton(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setIsLoggedIn(false);
        navigate('/');
    };

    useEffect(() => {
        showButton();
    }, []);

    const handleNavigation = () => {
        const token = localStorage.getItem('token');
        if (token) {
            const userRole = localStorage.getItem('role');
            if (userRole === 'patient') {
                navigate('/fillup');
            } else if (userRole === 'doctor') {
                navigate('/doctor');
            } else {
                navigate('/');
            }
        } else {
            navigate('/auth');
        }
    };

    return (
        <>
            <header className="min-h-24 flex justify-center">
                <nav className="flex justify-between items-center w-[92%] mx-auto pt-4">
                    <Link to="/">
                        <motion.div className='text-3xl font-bold ml-4 md:ml-10' whileHover={{ scale: 1.1 }}>
                            Article<span className='text-[#4fe331]'>Insight</span>
                        </motion.div>
                    </Link>
                    <div className={!click ? "nav-links duration-300 md:static absolute md:min-h-fit md:w-auto w-full flex items-center px-5 left-[-50rem] top-[6rem]" :
                        "nav-links duration-500 md:static absolute bg-white text-black left-0 md:w-auto w-full flex items-center px-5 top-[5.25rem]"}>
                        <ul className="flex md:flex-row flex-col items-center md:gap-[4vw] gap-5 w-full text-xl font-bold p-5">
                            <li onClick={handleNavigation}>
                                <motion.div className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
                                    'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'} whileHover={{ scale: 1.1 }}>
                                    HOME
                                </motion.div>
                            </li>
                            <Link to='/about'>
                                <motion.li className={!button ? 'hover:bg-gray-200 w-full text-center hover:text-black h-10 rounded-xl flex align-center justify-center md:hover:text-gray-800 pt-1' :
                                    'hover:text-gray-800 w-full text-center flex align-center justify-center md:hover:text-blue-600 hover:border-b-2 border-blue-600 rounded-xl px-[1.25rem]'} whileHover={{ scale: 1.1 }}>
                                    ABOUT
                                </motion.li>
                            </Link>
                        </ul>
                    </div>
                    <div id="github-link" className="flex items-center gap-6">
                        <div className='flex justify-center items-center'>
                            <a href="https://github.com/rajesh-adk-137/ArticleInsightGuide/">
                                <motion.button className='bg-gray-300 hover:bg-gray-400 text-black md:px-5 md:py-2 rounded-md md:flex items-center space-x-2 hidden'
                                    whileHover={{ scale: 1.1 }}>
                                    <FaGithub />
                                    <span>GitHub</span>
                                </motion.button>
                            </a>
                        </div>
                        {
                            isLoggedIn ? (
                                <motion.button
                                    className='bg-gray-300 text-black px-4 py-2 rounded-md'
                                    whileHover={{ scale: 1.1 }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </motion.button>
                            ) : (
                                <Link to="/auth">
                                    <motion.button
                                        className='bg-gray-300 text-black px-4 py-2 rounded-md'
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                            )
                        }
                        {
                            click ? (
                                <ImCross onClick={handleClick} name="menu" className="text-3xl cursor-pointer md:hidden" />
                            ) : (
                                <GiHamburgerMenu onClick={handleClick} name="menu" className="text-3xl cursor-pointer md:hidden" />
                            )
                        }
                    </div>
                </nav>
            </header>
        </>
    );
}

export default Navbar;
