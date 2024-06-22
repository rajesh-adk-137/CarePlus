import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorsList from '../components/DoctorsList';
import CombinedResponse from '../components/CombinedResponse'; 
import ExtremeResponse from '../components/ExtremeResponse'; 

const AiResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { responseData } = location.state || {};
  const severity = responseData?.severity;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in.');
      navigate('/');
    }
  }, [navigate]);

  const renderContent = () => {
    if (!responseData) {
      return <Typography>Loading error.Try resubmitting the form</Typography>;
    }

    if (severity === 'mild') {
      return <CombinedResponse responseData={responseData} />;
    } else if (severity === 'severe') {
      return (
        <>
          <CombinedResponse responseData={responseData} />
          <Box mt={4}>
            <DoctorsList responseData={responseData} />
          </Box>
        </>
      );
    } else if (severity === 'extreme') {
      return (
        <>
          <ExtremeResponse responseData={responseData} />
          <Box mt={4}>
            <DoctorsList responseData={responseData} />
          </Box>
        </>
      );
    } else {
      return <Typography>Unknown condition.</Typography>;
    }
  };

  return (
    <Box className="min-h-screen flex flex-col bg-gray-100 text-black">
      <CssBaseline />
      <Box className="bg-black text-white">
        <Navbar />
      </Box>
      <Container maxWidth="lg" className="flex-grow mt-20">
        <Box className="bg-white rounded-lg shadow-lg p-8">
          <Typography variant="h4" component="h2" gutterBottom>
            AI Response
          </Typography>
          {renderContent()}
        </Box>
      </Container>
      <Footer />
    </Box>
  );
};

export default AiResponse;
