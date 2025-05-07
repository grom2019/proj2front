import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const registerUser = async () => {
    if (!captchaToken) return alert('Please complete the CAPTCHA');

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
        token: captchaToken,
      });
      alert('Registration successful! Check your email.');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="container">
      <h2 className="header">Register</h2>
      <ReCAPTCHA sitekey="6Lcs9S4rAAAAAKzHGzwB2QyHzHI46x24Z3VmR1L7" onChange={setCaptchaToken} />
      <input className="input" placeholder="Username" onChange={e => setUsername(e.target.value)} />
      <input type="email" className="input" placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" className="input" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button className="button" onClick={registerUser}>Register</button>
    </div>
  );
}

export default Register;
