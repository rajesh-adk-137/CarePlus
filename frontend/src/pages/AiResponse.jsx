import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, Container, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import DoctorsList from '../components/DoctorsList';
import CombinedResponse from '../components/CombinedResponse';
import ExtremeResponse from '../components/ExtremeResponse';
import axios from 'axios';

const AiResponse = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [allowedResources, setAllowedResources] = useState({
    combinedResponse: false,
    doctorCard: false,
    extremeResponse: false,
  });
  const { responsedData } = location.state || {};
  const severity = responsedData?.severity;

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in.');
      navigate('/');
    } else {
      const checkPolicies = async () => {
        try {
          const resources = ['combined_response', 'doctor_card', 'extreme_response'];
          const promises = resources.map(resource =>
            axios.post('http://localhost:8000/policy_verification', {
              severity: severity,
              resource: resource
            }, {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
          );
          const responses = await Promise.all(promises);

          const updatedAllowedResources = {
            combinedResponse: responses[0].data.allowed,
            doctorCard: responses[1].data.allowed,
            extremeResponse: responses[2].data.allowed,
          };
          setAllowedResources(updatedAllowedResources);

          if (!Object.values(updatedAllowedResources).some(allowed => allowed)) {
            alert('You are not authorized to view any content.');
            navigate('/');
          }
        } catch (error) {
          console.error('Error checking policies', error);
          alert('Error checking policies');
          navigate('/');
        }
      };

      checkPolicies();
    }
  }, [navigate, severity]);

  const renderContent = () => {
    if (!responsedData) {
      return <Typography>Loading error. Try resubmitting the form</Typography>;
    }

    return (
      <>
        {allowedResources.combinedResponse && <CombinedResponse responsedData={responsedData} />}
        {allowedResources.extremeResponse  && <ExtremeResponse responsedData={responsedData} />}
        {allowedResources.doctorCard && severity !== 'mild' && (
          <Box mt={4}>
            <DoctorsList responsedData={responsedData} />
          </Box>
        )}
        
      </>
    );
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
