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
        setLoading(true);
        setError('');

        const [appsRes, usersRes] = await Promise.all([
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/applications`),
          axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/users`),
        ]);

        setApplications(appsRes.data || []);
        setUsers(usersRes.data || []);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Помилка завантаження даних. Спробуйте пізніше.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Завантаження...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Адмін Панель</h2>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Заявки</h3>
          {applications.length === 0 ? (
            <p>Заявок немає.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {applications.map((app) => (
                <li
                  key={app.id}
                  style={{
                    cursor: 'pointer',
                    padding: '0.5rem',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: selectedApplication?.id === app.id ? '#f0f0f0' : 'transparent',
                  }}
                  onClick={() => setSelectedApplication(app)}
                >
                  {/* Показуємо ім'я або коментар, або fallback */}
                  {app.first_name && app.last_name
                    ? `${app.first_name} ${app.last_name} — ${app.vacancy_title || 'Вакансія'}`
                    : `Заявка #${app.id}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h3>Користувачі</h3>
          {users.length === 0 ? (
            <p>Користувачів немає.</p>
          ) : (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {users.map((user) => (
                <li key={user.id} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                  {user.username} ({user.role})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedApplication && (
        <div
          style={{
            marginTop: '2rem',
            border: '1px solid #ccc',
            padding: '1rem',
            borderRadius: 4,
            backgroundColor: '#fafafa',
          }}
        >
          <h3>Деталі заявки #{selectedApplication.id}</h3>
          <p><strong>Ім'я:</strong> {selectedApplication.first_name} {selectedApplication.last_name} {selectedApplication.patronymic}</p>
          <p><strong>Дата народження:</strong> {selectedApplication.birth_date}</p>
          <p><strong>Військова частина:</strong> {selectedApplication.military_unit}</p>
          <p><strong>Звання:</strong> {selectedApplication.rank}</p>
          <p><strong>Посада:</strong> {selectedApplication.position}</p>
          <p><strong>MOS:</strong> {selectedApplication.mos}</p>
          <p><strong>Email:</strong> {selectedApplication.email}</p>
          <p><strong>Телефон:</strong> {selectedApplication.phone}</p>
          <p><strong>Коментар:</strong> {selectedApplication.comment || '-'}</p>
          <p><strong>Погодження:</strong> {selectedApplication.agreement ? 'Так' : 'Ні'}</p>
          <p><strong>Командування:</strong> {selectedApplication.command_id}</p>
          <p><strong>Бригада:</strong> {selectedApplication.brigade_name}</p>
          <p><strong>Вакансія:</strong> {selectedApplication.vacancy_title}</p>
          <p><strong>Документи:</strong></p>
          {selectedApplication.documents && selectedApplication.documents.length > 0 ? (
            <ul>
              {selectedApplication.documents.map((doc, i) => (
                <li key={i}>
                  <a
                    href={`${process.env.REACT_APP_BASE_URL}/uploads/${doc}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {doc}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p>Документів немає.</p>
          )}

          <button onClick={() => setSelectedApplication(null)} style={{ marginTop: '1rem' }}>
            Закрити
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
