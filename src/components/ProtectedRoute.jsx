import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export const isStaff = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.username === 'darksplice';
};

export default ProtectedRoute;
