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
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Користувач не авторизований');
          setLoading(false);
          return;
        }

        const baseURL = process.env.REACT_APP_BASE_URL || '';
        const res = await axios.get(`${baseURL}/api/auth/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

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
      <table
        border="1"
        cellPadding="5"
        cellSpacing="0"
        style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 600 }}
      >
        <thead>
          <tr>
            <th>Ім'я користувача</th>
            <th>Email</th>
            <th>Роль</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" style={{ textAlign: 'center' }}>
                Користувачів не знайдено
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPage;
