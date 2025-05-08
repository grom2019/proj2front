// src/components/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import LogoutButton from './LogoutButton';

const Navbar = () => {
  const { token } = useContext(AuthContext);

  return (
    <header className="nav">
      <div className="nav-container">
        {token ? (
          <>
            <Link to="/home" className="nav-link">Головна</Link>
            <Link to="/profile" className="nav-link">Профіль</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Вхід</Link>
            <Link to="/register" className="nav-link">Реєстрація</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Navbar;
