import React, { useState, useRef } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const captchaRef = useRef(null);

  const registerUser = async () => {
    const token = await captchaRef.current.executeAsync(); // Отримуємо токен
    captchaRef.current.reset(); // Скидуємо CAPTCHA після відправлення

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        username,
        password,
        token,
      });
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error);
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
      <ReCAPTCHA
        sitekey="6Letuy4rAAAAACG2uPnDTBh2u1ccGwzOSo9t4ueG" // 🔑 Твій site key
        size="invisible"
        ref={captchaRef}
      />
      <button onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
