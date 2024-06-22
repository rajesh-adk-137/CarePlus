import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Button, Box, Chip } from '@mui/material';

const DoctorCard = ({ name, expertise, description, email, isRecommended, experience, profilePicture }) => {
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
          image={profilePicture || "/src/assets/images/doct.png"} // Use the actual image URL or default image
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
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontSize: '0.75rem' }}>
              Experience: {experience} years
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

export default DoctorCard;
