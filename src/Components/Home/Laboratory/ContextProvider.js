import React, { useState } from 'react'

export const Context = React.createContext();

function ContextProvider({ children }) {
    const [selectedPackage, setSelectedPackage] = useState([]);
    const [selectedTest, setSelectedTest] = useState([]);
    const [num, setNum] = useState(0);

    return (
        <>
            <Context.Provider value={{ selectedPackage, setSelectedPackage, selectedTest, setSelectedTest, num, setNum }}>
                {children}
            </Context.Provider>
        </>
    )
}

export default ContextProvider
