import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Grid, Typography, Box, CircularProgress } from '@mui/material';
import DoctorCard from './DoctorCard';

const DoctorsList = ({ responsedData }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const recommendedExpertise = responsedData['doctor'];

  useEffect(() => {
    const fetchDoctors = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8000/doctors', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDoctors(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const expertiseDescriptions = {
    "General Physician": "Comprehensive primary care for adults",
    "Cardiology": "Heart and cardiovascular system specialist",
    "Neurology": "Brain, spinal cord, and nervous system expert",
    "Pediatrics": "Specialized care for infants, children, and adolescents",
    "Orthopedics": "Musculoskeletal system and bone health specialist",
    "Dermatology": "Skin, hair, and nail health expert",
    "Gastroenterology": "Digestive system and gastrointestinal tract specialist",
    "Oncology": "Cancer diagnosis and treatment expert",
    "Psychiatry": "Mental health and behavioral disorders specialist",
    "Allergist": "Allergy and immunology expert",
    "Ophthalmology": "Eye and vision care specialist",
    "Radiology": "Medical imaging and diagnostic expert"
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: '100%', 
      maxWidth: '1400px', 
      margin: '0 auto', 
      padding: '40px 20px',
      backgroundColor: '#f5f5f5',
    }}>
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, fontWeight: 'bold', textAlign: 'center' }}>
        YOU MAY CONSULT WITH OUR DOCTORS
      </Typography>
      <Grid container spacing={3}>
        {doctors.map((doctor) => (
          <Grid item xs={12} sm={6} md={3} key={doctor.email}>
            <DoctorCard 
              name={doctor.full_name} 
              expertise={doctor.expertise}
              description={expertiseDescriptions[doctor.expertise] || "No description available"}
              email={doctor.email}
              experience={doctor.experience}
              profilePicture={doctor.profile_picture} // Pass the profile picture URL
              isRecommended={doctor.expertise.toLowerCase() === recommendedExpertise.toLowerCase()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorsList;