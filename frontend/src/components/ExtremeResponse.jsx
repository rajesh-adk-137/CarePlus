import React from 'react';
import { motion } from 'framer-motion';
import { Typography, Box, Button } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ExtremeResponse = ({ responsedData }) => {
  const { symptoms_analysis } = responsedData;

  return (
    <motion.div
      className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-12 border-2 border-red-500"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Box display="flex" alignItems="center" mb={4}>
        <ErrorOutlineIcon fontSize="large" color="error" />
        <Typography variant="h4" component="h1" color="error" ml={2} fontWeight="bold">
          Urgent Medical Attention Required
        </Typography>
      </Box>

      <motion.section
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <Typography variant="h5" component="h2" gutterBottom fontWeight="bold">
          Symptoms Analysis
        </Typography>
        <ul className="list-disc pl-5 space-y-2">
          {symptoms_analysis.map((analysis, index) => (
            <li key={index} className="text-gray-800">{analysis}</li>
          ))}
        </ul>
      </motion.section>

      <motion.div
        className="mt-8 p-6 bg-red-100 rounded-md text-red-800 border-2 border-red-300"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <Typography variant="h6" component="h3" gutterBottom fontWeight="bold">
          Immediate Action Required:
        </Typography>
        <Typography variant="body1" paragraph>
          Your symptoms indicate a potentially serious condition that requires immediate medical attention. Please take the following steps:
        </Typography>
        <ol className="list-decimal pl-5 space-y-2">
          <li>Call for emergency medical services (ambulance) immediately.</li>
          <li>If available, have someone stay with you until help arrives.</li>
          <li>Do not attempt to drive yourself to the hospital.</li>
          <li>Inform the emergency responders about your symptoms and any medical conditions or medications you're taking.</li>
          <li>Contact the recommended doctor for assistive guidance.</li>
        </ol>
      </motion.div>

      <Box mt={4} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          size="large"
          onClick={() => window.location.href = 'tel:911'}
        >
          Call Emergency Services
        </Button>
      </Box>
    </motion.div>
  );
};

export default ExtremeResponse;