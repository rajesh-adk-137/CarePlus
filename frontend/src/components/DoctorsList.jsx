import React from 'react';

const DoctorCard = ({ name, expertise, isHighlighted }) => {
  return (
    <div className={`border p-4 rounded-lg shadow-md ${isHighlighted ? 'border-yellow-500' : 'border-gray-300'}`}>
      <div className="w-24 h-24 bg-gray-200 rounded-full mb-4"></div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-gray-700">{expertise}</p>
    </div>
  );
};

const DoctorsList = () => {
  const doctors = [
    { name: 'Dr. Alice Johnson', expertise: 'Cardiology' },
    { name: 'Dr. Bob Smith', expertise: 'Neurology' },
    { name: 'Dr. Carol White', expertise: 'Pediatrics' },
    { name: 'Dr. Dave Brown', expertise: 'Orthopedics' },
    { name: 'Dr. Emma Davis', expertise: 'Dermatology' },
    { name: 'Dr. Frank Wilson', expertise: 'Gastroenterology' },
    { name: 'Dr. Grace Lee', expertise: 'Oncology' },
    { name: 'Dr. Henry Martinez', expertise: 'Psychiatry' },
  ];

  // Placeholder for highlighted doctors logic
  const highlightedDoctors = ['Dr. Alice Johnson', 'Dr. Grace Lee'];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard
          key={doctor.name}
          name={doctor.name}
          expertise={doctor.expertise}
          isHighlighted={highlightedDoctors.includes(doctor.name)}
        />
      ))}
    </div>
  );
};

export default DoctorsList;
