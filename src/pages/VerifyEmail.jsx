import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VerifyEmail() {
  const [message, setMessage] = useState('Перевірка підтвердження...');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = new URLSearchParams(window.location.search).get('token');
    if (!token) {
      setMessage('Недійсне або відсутнє посилання для підтвердження.');
      setLoading(false);
      return;
    }

    axios
      .get(`${process.env.REACT_APP_BASE_URL}/api/auth/verify-email?token=${token}`)
      .then(res => setMessage(res.data.message || 'Email підтверджено!'))
      .catch(err => setMessage(err.response?.data?.error || 'Помилка під час підтвердження.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="container">
      {loading ? <h2>Завантаження...</h2> : <h2>{message}</h2>}
    </div>
  );
}

export default VerifyEmail;
