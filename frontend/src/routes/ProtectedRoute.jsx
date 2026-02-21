import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../features/auth/authSlice';

/**
 * Protected Route component for WorkFlowPro.
 * Redirects to login page if user is not authenticated.
 */
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
