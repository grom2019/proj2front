import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VerifyEmail() {
  const [message, setMessage] = useState('Перевірка підтвердження...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    console.log('Token from URL:', token);  // Лог для перевірки, чи є токен в URL

    if (!token) {
      setMessage('Недійсне або відсутнє посилання для підтвердження.');
      setLoading(false);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/auth/verify-email?token=${token}`)
      .then((res) => {
        console.log('Server response:', res); // Лог для відповіді від сервера
        setMessage(res.data.message || 'Email підтверджено!');
      })
      .catch((err) => {
        console.error('Error during verification:', err); // Лог для помилки
        setMessage(err.response?.data?.error || 'Помилка під час підтвердження.');
      })
      .finally(() => setLoading(false)); // Прикінцеве очищення стану завантаження
  }, []);

  return (
    <div style={styles.container}>
      {loading ? (
        <h2>Завантаження...</h2>
      ) : (
        <h2>{message}</h2>
      )}
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
