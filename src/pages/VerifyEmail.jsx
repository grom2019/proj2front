import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VerifyEmail() {
  const [message, setMessage] = useState('Перевірка підтвердження...');

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (!token) {
      setMessage('Недійсне або відсутнє посилання для підтвердження.');
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/auth/verify?token=${token}`)
      .then((res) => {
        setMessage(res.data.message || 'Email підтверджено!');
      })
      .catch((err) => {
        setMessage(err.response?.data?.error || 'Помилка під час підтвердження.');
      });
  }, []);

  return (
    <div style={styles.container}>
      <h2>{message}</h2>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '100px auto',
    padding: '30px',
    textAlign: 'center',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#f9f9f9',
    fontSize: '18px',
  },
};

export default VerifyEmail;
