import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

/**
 * Провайдер авторизації — зберігає токен і дані користувача,
 * оновлює axios з токеном, підвантажує профіль при авторизації.
 */
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(false);

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
    setLoadingProfile(true);
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth/profile`);
      setUser(res.data);
    } catch (err) {
      console.error('Не вдалося завантажити профіль:', err);
      setUser(null);
      setToken('');
    } finally {
      setLoadingProfile(false);
    }
  };

  const login = (jwtToken) => setToken(jwtToken);
  const logout = () => setToken('');

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loadingProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

// ✅ ДОДАНО ХУК useAuth — необхідний для імпорту в компонентах
export const useAuth = () => useContext(AuthContext);
