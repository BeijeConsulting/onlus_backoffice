import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/hook/NavBar/NavBar';
import { StyledEngineProvider } from '@mui/material';

function App() {
  return (
    <StyledEngineProvider injectFirst>
      <div className="App">
        <NavBar />
      </div>
    </StyledEngineProvider>
  );
}

export default App;
