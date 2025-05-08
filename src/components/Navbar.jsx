// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';
import '../styles/Navbar.css'; // Імпорт стилів

const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <header className="navbar">
      <div className="navbar-left">
        {token ? (
          <>
            <Link to="/home" className="nav-link">Головна</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Вхід</Link>
            <Link to="/register" className="nav-link">Реєстрація</Link>
          </>
        )}
      </div>
      <div className="navbar-right">
        {token && <Link to="/profile" className="nav-link">Профіль</Link>}
      </div>
    </header>
  );
};

export default Navbar;
