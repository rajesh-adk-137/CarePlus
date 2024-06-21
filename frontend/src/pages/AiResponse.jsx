import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorsList from '../components/DoctorsList';

const AiResponse = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const role =  'severe';//queryParams.get('role');

  const renderContent = () => {
    if (role === 'mild') {
      return <div>Mild condition: Suggestions and remedies will be displayed here.</div>;
    } else if (role === 'severe') {
      return (
        <div>
          Severe condition: Suggestions, remedies, and list of doctors will be displayed here.
          <DoctorsList />
        </div>
      );
    } else if (role === 'extreme') {
      return (
        <div>
          Extreme condition: Immediate actions, call ambulance, and contact doctor information will be displayed here.
          <DoctorsList />
        </div>
      );
    } else {
      return <div>Unknown condition.</div>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-black">
      <div className="bg-black text-white">
        <Navbar />
      </div>
      <div className="flex-grow flex items-center justify-center mt-20">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-6">AI Response</h2>
          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AiResponse;


