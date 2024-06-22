import React from 'react';
import { motion } from 'framer-motion';

const CombinedResponse = ({ responseData }) => {
  const { symptoms_analysis, severity, immediate_remedies } = responseData;

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'border-green-300';
      case 'severe':
        return 'border-yellow-300';
      case 'extreme':
        return 'border-orange-300';
      default:
        return 'border-gray-300';
    }
  };

  const getSeverityColor2 = (severity) => {
    switch (severity.toLowerCase()) {
      case 'mild':
        return 'bg-green-100 text-green-800';
      case 'severe':
        return 'bg-yellow-100 text-yellow-800';
      case 'extreme':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };



  const remedyTitles = ['Medications', 'Home Remedies', 'Things to Avoid'];

  return (
    <motion.div 
      className={`max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg mb-12 border-2 ${getSeverityColor(severity)}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">Health Analysis Results</h1>

      <motion.section 
        className="mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Symptoms Analysis</h2>
        <ul className="list-disc pl-5 space-y-2">
          {symptoms_analysis.map((analysis, index) => (
            <li key={index} className="text-gray-600">{analysis}</li>
          ))}
        </ul>
      </motion.section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Severity</h2>
        <p className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getSeverityColor2(severity)}`}>
          {severity}
        </p>
      </section>

      <motion.section 
  className="mb-8"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.4, duration: 0.5 }}
>
  <h2 className="text-2xl font-semibold mb-4 text-gray-700">Immediate Remedies</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {remedyTitles.map((title, index) => (
      immediate_remedies[index] && immediate_remedies[index].length > 0 && (
        <motion.div 
          key={index} 
          className="bg-gray-50 p-4 rounded-md shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 + index * 0.2, duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2 text-gray-700">{title}</h3>
          <ul className="list-disc pl-5 space-y-1
          bg-blue-50">
            {immediate_remedies[index].map((remedy, idx) => (
              <li key={idx} className="text-gray-600">{remedy}</li>
            ))}
          </ul>
        </motion.div>
      )
    ))}
  </div>
</motion.section>

{(severity.toLowerCase() === 'mild' || severity.toLowerCase() === 'severe') && (
  <motion.div
    className="mt-4 p-4 bg-blue-50 rounded-md text-blue-700"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1, duration: 0.5 }}
  >
    {severity.toLowerCase() === 'mild' ? (
      <p>Remember to consult with the pharmacist if you plan to take any medicines or if you are on other medications.</p>
    ) : (
      <p  className= "text-yellow-600">It is recommended you contact one of our recommended doctors below and get comprehensive expertise.</p>
    )}
  </motion.div>
)}
    </motion.div>
  );
};

export default CombinedResponse;