import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      alert("Login success! Token: " + res.data.token);
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
