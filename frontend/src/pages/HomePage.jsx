import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FadeLoader } from 'react-spinners';
import Shepherd from 'shepherd.js';
import 'shepherd.js/dist/css/shepherd.css';

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/home'); // navigate('/auth');//changed for debugging
    }
  }, [navigate]);

  const isValidUrl = (urlString) => {
    try {
      new URL(urlString);
    } catch (_) {
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!isValidUrl(url)) {
      setError('Please enter a valid URL');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const token = localStorage.getItem('token');

      const response = await axios.post(
        'http://localhost:8000/get_all/',
        new URLSearchParams({ url }).toString(),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const dataWithUrl = { ...response.data, url }; // Include the URL in the data
        localStorage.setItem('articleData', JSON.stringify(dataWithUrl));
        navigate('/analyze', { state: { url } });
      } else {
        setError('Error processing the article. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please login again.');
        navigate('/auth');
      } else {
        setError('Error processing the article. Please try again.');
      }
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Custom smooth scrolling function
    const smoothScrollTo = (element) => {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const tour = new Shepherd.Tour({
      useModalOverlay: true,
      exitOnEsc: true,
      keyboardNavigation: true,

      defaultStepOptions: {
        classes: 'shepherd-theme-dark',
        scrollTo: { behavior: 'smooth', block: 'center' }
      }
    });

    const steps = [
      {
        id: 'url-input',
        text: 'Enter the URL of the article you want to analyze. It processes dev.to and medium articles.',
        attachTo: { element: '.url-input', on: 'bottom' },
        buttons: [
          {
            text: 'next',
            action: () => {
              tour.next();
            }
          }
        ]
      },
      {
        id: 'submit-button',
        text: 'Click this button to submit the URL and start the analysis, it may take a few minutes.',
        attachTo: { element: '.submit-button', on: 'bottom' },
        buttons: [
          {
            text: 'back',
            action: tour.back
          },
          {
            text: 'end',
            action: () => {
              scrollToTop();
              tour.complete();
            }
          }
        ]
      }
    ];

    steps.forEach(step => {
      tour.addStep(step);
    });

    const startTour = () => {
      tour.start();
    };

    const startTourButton = document.getElementById('start-tour');
    if (startTourButton) {
      startTourButton.addEventListener('click', startTour);

      return () => {
        startTourButton.removeEventListener('click', startTour);
        tour.complete();
      };
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <div className="flex-1 flex justify-center items-center bg-white min-h-[70vh] relative">
        {isLoading && (
          <div className="loading-spinner absolute inset-0 flex flex-col justify-center items-center bg-white bg-opacity-75 z-10">
            <FadeLoader color="#2563EB" />
            <p className="mt-4 text-lg text-gray-600">Processing! Please wait...</p>
          </div>
        )}
        <div className={`bg-gray-100 p-8 rounded-2xl shadow-2xl md:min-w-[34rem] md:min-h-[15rem] ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <h1 className="text-3xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-black to-black p-1">
            Enter URL Of Article
          </h1>
          <hr className="mb-6" />
          <form className="flex flex-col space-y-4" onSubmit={submitHandler}>
            <div className="text-md text-gray-500">Use dev.to article URL to get better results.</div>
            <input
              type="url"
              placeholder="https://dev.to/article-url"
              className="url-input p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <button
              type="submit"
              className="submit-button p-2 bg-blue-800 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              disabled={isLoading}
            >
              {isLoading ? 'Processing your request...' : 'Submit'}
            </button>
            {error && <div className="text-red-500 text-center">{error}</div>}
          </form>
        </div>
      </div>
      <Footer />
      <button
        id="start-tour"
        className="fixed bottom-4 right-4 rounded-full bg-blue-800 text-white p-4 shadow-lg hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-900 z-10"
      >
        Guide me
      </button>
    </div>
  );
};

export default HomePage;
