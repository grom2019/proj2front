// src/pages/AdminPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError('');
        const res = await axios.get('/api/auth/users'); // URL бекенду
        setUsers(res.data);
      } catch (err) {
        console.error('Помилка отримання користувачів:', err);
        setError('Не вдалося завантажити користувачів');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Завантаження користувачів...</div>;

  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h1>Адмін: список користувачів</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.username} ({user.email}) — роль: {user.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminPage;
