import React , { useState } from 'react';

export const VaccinationContext = React.createContext();

function ContextSelected({ children }) {
    const [ selectedVaccinations, setSelectedVaccinations] = useState([]);
  return (
    <>
        <VaccinationContext.Provider value={{selectedVaccinations, setSelectedVaccinations}}>
            {children}
        </VaccinationContext.Provider>
    </>
  )
}

export default ContextSelected