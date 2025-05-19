import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { token, user, loadingProfile } = useContext(AuthContext);

  if (loadingProfile) {
    // Поки профіль завантажується — можна показати індикатор або нічого
    return <div>Завантаження...</div>;
  }

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AdminRoute;
