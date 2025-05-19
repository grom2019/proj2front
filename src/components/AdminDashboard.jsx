import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [appsRes, usersRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/applications`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/users`),
        ]);
        setApplications(appsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Помилка завантаження даних');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Адмін Панель</h2>

      <div style={{ display: 'flex', gap: '2rem' }}>
        <div style={{ flex: 1 }}>
          <h3>Заявки</h3>
          <ul>
            {applications.map((app) => (
              <li key={app.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedApplication(app)}>
                {app.name || `Заявка #${app.id}`}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Користувачі</h3>
          <ul>
            {users.map((user) => (
              <li key={user.id}>
                {user.username} ({user.role})
              </li>
            ))}
          </ul>
        </div>
      </div>

      {selectedApplication && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h3>Деталі заявки #{selectedApplication.id}</h3>
          <pre>{JSON.stringify(selectedApplication, null, 2)}</pre>
          <button onClick={() => setSelectedApplication(null)}>Закрити</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
