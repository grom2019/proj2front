import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

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

  if (loading) return <div className="loading">Завантаження користувачів...</div>;

  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <h1>Адмін: список користувачів</h1>
      <table className="admin-table">
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
              <td colSpan="3" className="no-users">
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
