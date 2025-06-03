import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './Context';
import MapContextProvider from './Components/MapContext/MapContextProvider';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MapContextProvider>
      <ContextProvider>
        <App />
      </ContextProvider>
    </MapContextProvider>
  </React.StrictMode>
);
