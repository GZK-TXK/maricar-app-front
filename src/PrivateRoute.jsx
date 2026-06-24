import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from './AuthContext';

export const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? children : <Navigate to="/login" />;
};
