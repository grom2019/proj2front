import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        username,
        password
      });
      alert("Registration successful!");
    } catch (err) {
      alert("Registration failed: " + err.response.data.error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={registerUser}>Registerr</button>
    </div>
  );
}

export default Register;
