import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/login`, {
        username,
        password
      });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert("Login failed: " + err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={loginUser}>Login</button>
    </div>
  );
}

export default Login;
