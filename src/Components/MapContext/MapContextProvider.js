// import React, { createContext, useContext, useReducer } from 'react'; // Added import for React
// import reducer from './reducer';

// const initialState = {
//   location: { lng: 0, lat: 0 },
// };

// const Context = createContext(initialState);

// export const useValue = () => {
//   return useContext(Context);
// };

// const MapContextProvider = ({ children }) => {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
//   );
// };

// export default MapContextProvider;
import React, { createContext, useContext, useReducer } from 'react';
import reducer from './reducer'; // Adjust the import path as needed

const initialState = {
  location: { lng: 0, lat: 0 },
};

const Context = createContext(initialState);

export const useValue = () => {
  return useContext(Context);
};

const MapContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>
      {children}
    </Context.Provider>
  );
};

export default MapContextProvider;
