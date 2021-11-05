import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import RevenuesProvider from './context/RevenuesProvider';
import Routes from './routes/Routes';

function App() {
  return (
    <RevenuesProvider>
      <Routes />
    </RevenuesProvider>
  );
}

export default App;
