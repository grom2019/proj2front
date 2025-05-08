import React from 'react';

const Button = ({ onClick, children }) => {
  return (
    <button onClick={onClick} style={{
      padding: '8px 16px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
    }}>
      {children}
    </button>
  );
};

export default Button;
