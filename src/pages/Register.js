import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async () => {
    try {
      await axios.post('https://project2-o44z.onrender.com/api/auth/register', {
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
      <input 
        placeholder="Username" 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <input 
        type="password" 
        placeholder="Password" 
        onChange={(e) => setPassword(e.target.value)} 
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
