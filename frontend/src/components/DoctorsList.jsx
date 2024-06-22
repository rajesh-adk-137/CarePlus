import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Grid, Button, Box, Chip } from '@mui/material';

const DoctorCard = ({ name, expertise, description, email, isRecommended }) => {
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email).then(() => {
      alert('Email copied to clipboard!');
    });
  };

  return (
    <Card 
      sx={{ 
        width: '100%', 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
        },
        border: isRecommended ? '2px solid #4caf50' : 'none',
        boxShadow: isRecommended ? '0 0 15px rgba(76, 175, 80, 0.3)' : '0 4px 8px rgba(0,0,0,0.1)',
        padding: '16px',
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <CardMedia
          component="img"
          height="120"
          width="120"
          image="/src/assets/images/R.png"
          alt={name}
          sx={{ 
            objectFit: 'cover',
            borderRadius: '50%',
            mb: 2,
          }}
        />
        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', p: 1, width: '100%' }}>
          <Box sx={{ textAlign: 'center' }}>
            <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.875rem' }}>
              {expertise}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem' }}>
              {description}
            </Typography>
            {isRecommended && (
              <Chip
                label="Recommended"
                color="success"
                size="small"
                sx={{ mb: 1, fontSize: '0.75rem' }}
              />
            )}
          </Box>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleCopyEmail}
            sx={{ 
              mt: 1,
              textTransform: 'none',
              borderRadius: '20px',
              fontSize: '0.75rem',
              py: 0.5,
            }}
          >
            Contact
          </Button>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

const DoctorsList = ({ responseData }) => {
  const recommendedExpertise = responseData['doctor'];
  const doctors = [
    { name: 'Dr. Raj Kumar', expertise: 'General Physician', description: 'Comprehensive primary care for adults', email: 'raj.kumar@example.com' },
    { name: 'Dr. Alice Johnson', expertise: 'Cardiology', description: 'Heart and cardiovascular system specialist', email: 'alice.johnson@example.com' },
    { name: 'Dr. Bob Smith', expertise: 'Neurology', description: 'Brain, spinal cord, and nervous system expert', email: 'bob.smith@example.com' },
    { name: 'Dr. Carol White', expertise: 'Pediatrics', description: 'Specialized care for infants, children, and adolescents', email: 'carol.white@example.com' },
    { name: 'Dr. Dave Brown', expertise: 'Orthopedics', description: 'Musculoskeletal system and bone health specialist', email: 'dave.brown@example.com' },
    { name: 'Dr. Emma Davis', expertise: 'Dermatology', description: 'Skin, hair, and nail health expert', email: 'emma.davis@example.com' },
    { name: 'Dr. Frank Wilson', expertise: 'Gastroenterology', description: 'Digestive system and gastrointestinal tract specialist', email: 'frank.wilson@example.com' },
    { name: 'Dr. Grace Lee', expertise: 'Oncology', description: 'Cancer diagnosis and treatment expert', email: 'grace.lee@example.com' },
    { name: 'Dr. Henry Martinez', expertise: 'Psychiatry', description: 'Mental health and behavioral disorders specialist', email: 'henry.martinez@example.com' },
    { name: 'Dr. Rajendra', expertise: 'Allergist', description: 'Allergy and immunology expert', email: 'rajendra@example.com' },
    { name: 'Dr. Sushil', expertise: 'Ophthalmology', description: 'Eye and vision care specialist', email: 'sushil@example.com' },
    { name: 'Dr. Prasun', expertise: 'Radiology', description: 'Medical imaging and diagnostic expert', email: 'prasun@example.com' },
  ];

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
        {doctors.map((doctor, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <DoctorCard 
              {...doctor} 
              isRecommended={doctor.expertise.toLowerCase() === recommendedExpertise.toLowerCase()}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default DoctorsList;