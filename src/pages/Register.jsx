import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import '../styles/Register.css';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const registerUser = async () => {
    if (!captchaToken) return alert('Будь ласка, підтвердіть CAPTCHA');

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        username,
        email,
        password,
        token: captchaToken,
      });
      alert('Реєстрація успішна! Перевірте email.');
    } catch (err) {
      alert('Помилка реєстрації: ' + err.response?.data?.error);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-box">
        <h2 className="login-title">Реєстрація</h2>
        <div className="recaptcha-wrapper">
          <ReCAPTCHA
            sitekey="6Lcs9S4rAAAAAKzHGzwB2QyHzHI46x24Z3VmR1L7"
            onChange={setCaptchaToken}
          />
        </div>
        <input
          className="login-input"
          placeholder="Ім’я користувача"
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="email"
          className="login-input"
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="login-input"
          placeholder="Пароль"
          onChange={e => setPassword(e.target.value)}
        />
        <button className="login-button" onClick={registerUser}>
          Зареєструватися
        </button>
      </div>
    </div>
  );
}

export default Register;
