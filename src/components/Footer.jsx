// src/components/Footer.jsx
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Військовий модуль | Всі права захищені</p>
    </footer>
  );
};

export default Footer;
