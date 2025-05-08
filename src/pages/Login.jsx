import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Login.css'; // Підключаємо CSS

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginUser = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        username,
        password,
      });
      login(res.data.token);
      navigate('/home');
    } catch (err) {
      alert("Login failed: " + err.response.data.error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Вхід</h2>
        <input
          type="text"
          className="login-input"
          placeholder="Ім’я користувача"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Пароль"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={loginUser}>
          Увійти
        </button>
      </div>
    </div>
  );
}

export default Login;
