import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

/**
 * Компонент для захисту маршруту, доступного тільки адміністраторам.
 * @param {{ children: React.ReactNode }} props
 */
const AdminRoute = ({ children }) => {
  const { token, user } = useContext(AuthContext);

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/login" />;
  }
//
  return <>{children}</>;
};

export default AdminRoute;
