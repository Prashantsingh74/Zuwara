import React, { createContext, useState } from 'react';

// Create Context
const RecordContext = createContext();

// Create a provider component
const DoctorProvider = ({ children }) => {
  const [doctors, setDoctors] = useState([]);

  const addDoctor = (doctor) => {
    setDoctors((prevDoctors) => [...prevDoctors, doctor]);
  };

  return (
    <RecordContext.Provider value={{ doctors, addDoctor }}>
      {children}
    </RecordContext.Provider>
  );
};

export { RecordContext, DoctorProvider };
