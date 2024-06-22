import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-[100dvh] bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300">
            <div>
                <Navbar />
            </div>
            <main className="flex-1 bg-gradient-to-b from-blue-50 to-green-50">
                <section className="w-full pt-12 md:pt-24 lg:pt-32 border-y">
                    <div className="px-6 md:px-8 space-y-12 xl:space-y-16">
                        <div className="grid max-w-[1300px] mx-auto gap-6 md:gap-12 md:grid-cols-2">
                            <div>
                                <h1 className="lg:leading-tighter text-4xl md:text-5xl xl:text-6xl font-bold text-blue-700">
                                    Your AI-Powered Health Assistant
                                </h1>
                                <p className="mt-4 text-lg text-gray-600">
                                    Experience the future of healthcare with our AI-driven medical assistance app. 
                                    We utilize cutting-edge technology to provide personalized health insights and connect you with the right care when you need it most.
                                </p>
                            </div>
                            <div className="flex flex-col items-start space-y-6">
                                <div className="inline-block rounded-lg bg-green-100 px-4 py-2 text-lg font-semibold text-green-700">
                                    Key Features
                                </div>
                                <ul className="grid gap-3 py-6">
                                    {[
                                        "AI-powered symptom analysis",
                                        "Severity assessment: mild, severe, or extreme",
                                        "Personalized care recommendations",
                                        "Direct connection to relevant specialists",
                                        "Emergency alerts for critical cases"
                                    ].map((feature, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <HealthIcon className="w-6 h-6 text-green-500" />
                                            <span className="text-lg">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                                <div className="space-x-6">
                                    <Link
                                        className="inline-flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-lg text-white font-medium shadow-lg transition-colors hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        to='/home'
                                    >
                                        Get Started
                                    </Link>
                                    <Link
                                        className="inline-flex items-center justify-center rounded-md border border-blue-200 bg-white px-6 py-3 text-lg font-medium text-blue-600 shadow-lg transition-colors hover:bg-blue-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                                        to='/'
                                    >
                                        Learn More
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                
                <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
                    <div className="container mx-auto px-6 md:px-8">
                        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-12">How It Works</h2>
                        <div className="grid md:grid-cols-3 gap-8">
                            {[
                                { title: "Describe Your Symptoms", icon: "📝", description: "Enter your symptoms and health details into our user-friendly form." },
                                { title: "AI Analysis", icon: "🧠", description: "Our AI processes your information to assess the severity and provide tailored advice." },
                                { title: "Get Care", icon: "👨‍⚕️", description: "Receive recommendations, connect with specialists, or get emergency alerts based on your needs." }
                            ].map((step, index) => (
                                <div key={index} className="bg-blue-50 rounded-lg p-6 text-center">
                                    <div className="text-4xl mb-4">{step.icon}</div>
                                    <h3 className="text-xl font-semibold text-blue-600 mb-2">{step.title}</h3>
                                    <p className="text-gray-600">{step.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="w-full py-12 md:py-24 lg:py-32 bg-green-50">
                    <div className="container mx-auto px-6 md:px-8 text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-green-700 mb-6">Your Health, Our Priority</h2>
                        <p className="max-w-2xl mx-auto text-lg text-gray-600 mb-12">
                            We're committed to providing accessible, intelligent healthcare solutions. 
                            Our app combines the power of AI with medical expertise to ensure you always have a reliable health partner at your fingertips.
                        </p>
                        <Link
                            className="inline-flex items-center justify-center rounded-md bg-green-600 px-6 py-3 text-lg text-white font-medium shadow-lg transition-colors hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500"
                            to='/signup'
                        >
                            Join Us Today
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    );
}

function HealthIcon(props) {
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
            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
    );
}