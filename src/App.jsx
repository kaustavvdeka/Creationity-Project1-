
import React from 'react';
import { AuthProvider } from './context/AuthContext';
import './App.css';

function App({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}

export default App;