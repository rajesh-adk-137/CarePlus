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
  const { responsedData } = location.state || {};
  const severity = responsedData?.severity;

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    if (!token) {
      alert('You are not logged in.');
      navigate('/');
    }
  }, [navigate]);

  const renderContent = () => {
    if (!responsedData) {
      return <Typography>Loading error.Try resubmitting the form</Typography>;
    }

    if (severity === 'mild') {
      return <CombinedResponse responsedData={responsedData} />;
    } else if (severity === 'severe') {
      return (
        <>
          <CombinedResponse responsedData={responsedData} />
          <Box mt={4}>
            <DoctorsList responsedData={responsedData} />
          </Box>
        </>
      );
    } else if (severity === 'extreme') {
      return (
        <>
          <ExtremeResponse responsedData={responsedData} />
          <Box mt={4}>
            <DoctorsList responsedData={responsedData} />
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
