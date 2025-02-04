import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Ambil token dari localStorage
  const token = localStorage.getItem('token');

  // Jika token ada, redirect ke /home
  if (token) {
    return <Navigate to="/home"/>;
  }

  // Jika tidak ada token, render children (rute publik)
  return children;
};

export default PublicRoute;