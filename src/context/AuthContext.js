import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
      setUser(null);
    }
  }, [token]);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`);
      setUser(res.data);
    } catch (err) {
      console.error('Не вдалося завантажити профіль:', err);
      setUser(null);
    }
  };

  const login = (jwtToken) => setToken(jwtToken);
  const logout = () => setToken('');

  return (
    <AuthContext.Provider value={{ token, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
