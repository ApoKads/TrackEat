import React, { useState, useEffect,useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../UserProvider';
import axios from 'axios';

const RegistrationRoute = ({ children }) => {
  const { user, loading } = useContext(UserContext);
  const token = localStorage.getItem('token');

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user?.first_name) {
    return <Navigate to="/section" />;
  }

  return children;
};

export default RegistrationRoute;
