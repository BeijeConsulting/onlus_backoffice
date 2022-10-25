import React from 'react';
import logo from './logo.svg';
import './App.css';
import NavBar from './components/hook/NavBar/NavBar';

function App() {
  return (
    <div className="App" style={{minHeight: '100vh'}}>
      <NavBar />
    </div>
  );
}

export default App;
