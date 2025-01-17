import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children }) => {
  const [isValid, setIsValid] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const validateToken = async () => {
      try {
        if (!token) {
          setIsValid(false); 
          return;
        }

        const response = await axios.post(
          '/validate-token', 
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`, // Kirim token dalam header
            },
          }
        );

        setIsValid(response.data.isValid); // Backend mengirimkan status validasi
      } catch (error) {
        console.error('Token validation failed:', error);
        setIsValid(false); // Token tidak valid
      }
    };

    validateToken();
  }, [token]);

  if (isValid === null) {
    // Tampilkan loader selama validasi
    return <div>Loading...</div>;
  }

  if (!isValid) {
    // Jika token tidak valid atau tidak ada, redirect ke login
    return <Navigate to="/login" />;
  }

  // Jika token valid, render komponen child
  return children;
};

export default ProtectedRoute;
