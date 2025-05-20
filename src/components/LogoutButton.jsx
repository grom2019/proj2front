import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const LogoutButton = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      style={{
        padding: '8px 16px',
        backgroundColor: hover ? '#f44336' : '#facc15',  // жовтий або червоний
        color: hover ? 'white' : 'black',
        border: 'none',
        borderRadius: '18px',
        cursor: 'pointer',
        marginLeft: '10px',
        fontSize: '1rem',
        fontWeight: '600',
        textAlign: 'center',
        display: 'inline-block',
        transition: 'background-color 0.3s ease, color 0.3s ease, transform 0.2s ease',
        boxShadow: hover 
          ? '0 0 10px #f44336, inset 0 0 10px #f44336' 
          : '0 0 10px #facc15, inset 0 0 10px #facc15',
        transform: hover ? 'scale(1.05)' : 'scale(1)',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      type="button"
    >
      Вийти
    </button>
  );
};

export default LogoutButton;
