import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
    const smoothScrollTo = (element) => {
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <div className="bg-black text-white">
                <Navbar />
            </div>
            <main className="flex-1">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y article-summary">
                    <div className="px-6 md:px-8 space-y-12 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-6 md:gap-12 md:grid-cols-2">
                            <div>
                                <h1 id='article-sum' className="lg:leading-tighter text-4xl md:text-5xl xl:text-6xl">
                                    About Our App
                                </h1>
                                <p className="mx-auto max-w-[700px] text-lg ">
                                    Our medical assistance app leverages the power of the Gemini API and OPAL for real-time policy management to provide personalized healthcare solutions. 
                                    Users can describe their illness via a form, and our API generates a response categorizing the severity as mild, severe, or extreme.
                                </p>
                            </div>
                            <div className="flex flex-col items-start space-y-6 key-features">
                                <div className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-lg ">
                                    Key Features
                                </div>
                                <ul className="grid gap-3 py-6">
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="w-6 h-6" />
                                        <span className="text-lg">Analyze user-submitted illness descriptions</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="w-6 h-6" />
                                        <span className="text-lg">Categorize illness severity: mild, severe, or extreme</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="w-6 h-6" />
                                        <span className="text-lg">Direct contact with doctors for severe and extreme cases</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="w-6 h-6" />
                                        <span className="text-lg">Automatic alerts for immediate medical attention in extreme cases</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckIcon className="w-6 h-6" />
                                        <span className="text-lg">Contact emergency services if necessary</span>
                                    </li>
                                </ul>
                                <div className="space-x-6">
                                    <Link
                                        className="inline-flex items-center justify-center rounded-md bg-gray-900 px-6 py-3 text-lg text-gray-50 shadow-lg transition-colors hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 "
                                        to='/home'
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-6 py-3 text-lg font-medium shadow-lg transition-colors hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50"
                                        to='/'
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex justify-center items-center w-full py-12 md:py-24 lg:py-32 bg-white benefits">
                    <div className="container space-y-12 px-6 md:px-8">
                        <div className="flex flex-col items-center justify-center space-y-6 text-center">
                            <div className="inline-block rounded-lg bg-green-300 px-4 py-2 text-lg ">
                                Benefits
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                Comprehensive Medical Assistance
                            </h2>
                            <p className="max-w-[900px] text-lg text-gray-500 md:text-xl lg:text-base xl:text-lg">
                                Our app provides a thorough analysis of your medical condition, offering quick summaries and direct connections to healthcare professionals when necessary.
                            </p>
                        </div>
                        <div className="mx-auto grid items-start justify-center gap-8 sm:max-w-4xl sm:grid-cols-2 md:gap-12 lg:max-w-5xl lg:grid-cols-3">
                            <div className="grid gap-3">
                                <h3 className="text-xl font-bold">Severity Categorization</h3>
                                <p className="text-lg text-gray-500">
                                    Understand the severity of your condition with our detailed analysis, categorizing it as mild, severe, or extreme.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <h3 className="text-xl font-bold">Doctor Recommendations</h3>
                                <p className="text-lg text-gray-500">
                                    Get recommendations for doctors based on your specific illness for personalized care.
                                </p>
                            </div>
                            <div className="grid gap-3">
                                <h3 className="text-xl font-bold">Emergency Alerts</h3>
                                <p className="text-lg text-gray-500">
                                    Receive immediate alerts and assistance for extreme cases, including contacting emergency services if needed.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100 flex justify-center align-center how-it-works">
                    <div className="container grid items-center justify-center gap-8 px-6 md:px-8 text-center">
                        <div className="space-y-6">
                            <div className="inline-block rounded-lg bg-gray-100 px-4 py-2 text-lg ">
                                How it Works
                            </div>
                            <h2 className="text-4xl md:text-5xl font-bold tracking-tighter">
                                Easy and Efficient Medical Assistance
                            </h2>
                            <p className="mx-auto max-w-[600px] text-lg text-gray-500 md:text-xl lg:text-base xl:text-lg">
                                Our app makes it simple to describe your illness, receive a severity assessment, and get connected with healthcare professionals.
                            </p>
                        </div>
                        <div className="mx-auto w-full max-w-sm space-y-6">
                            <div className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    <CheckIcon className="h-6 w-6 text-green-500" />
                                    <span className="text-lg">Enter your symptoms</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckIcon className="h-6 w-6 text-green-500" />
                                    <span className="text-lg">Receive a severity assessment</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckIcon className="h-6 w-6 text-green-500" />
                                    <span className="text-lg">Get connected with doctors if needed</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <CheckIcon className="h-6 w-6 text-green-500" />
                                    <span className="text-lg">Receive emergency alerts for extreme cases</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </main>
        </div>
    );
}

function CheckIcon(props) {
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
            <path d="M20 6 9 17l-5-5" />
        </svg>
    );
}
