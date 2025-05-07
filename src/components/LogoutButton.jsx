import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        textAlign: 'center',
        display: 'inline-block',
        transition: 'background-color 0.3s ease, transform 0.2s ease',
      }}
      onMouseEnter={(e) => e.target.style.backgroundColor = '#d32f2f'}
      onMouseLeave={(e) => e.target.style.backgroundColor = '#f44336'}
    >
      Вийти
    </button>
  );
};

export default LogoutButton;
