import React, { useState } from 'react';
import axios from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captchaToken, setCaptchaToken] = useState('');

  const registerUser = async () => {
    if (!captchaToken) {
      alert('Please complete the CAPTCHA');
      return;
    }

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/api/auth/register`, {
        username,
        password,
        token: captchaToken,
      });
      alert('Registration successful!');
    } catch (err) {
      alert('Registration failed: ' + err.response?.data?.error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>Register</h2>

      {/* CAPTCHA вгорі */}
      <div style={styles.captcha}>
        <ReCAPTCHA
          sitekey="6Letuy4rAAAAACG2uPnDTBh2u1ccGwzOSo9t4ueG"
          size="normal"
          onChange={(token) => setCaptchaToken(token)}
        />
      </div>

      <input
        style={styles.input}
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        style={styles.input}
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button style={styles.button} onClick={registerUser}>
        Register
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '400px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  header: {
    marginBottom: '20px',
  },
  input: {
    display: 'block',
    width: '90%',
    margin: '10px auto',
    padding: '10px',
    fontSize: '16px',
  },
  captcha: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
  },
};

export default Register;
