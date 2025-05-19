import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
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

        // Паралельні запити з токеном в заголовку
        const [appsRes, usersRes] = await Promise.all([
          axios.get(`${baseURL}/api/applications`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`${baseURL}/api/auth/users`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setApplications(appsRes.data || []);
        setUsers(usersRes.data || []);
      } catch (err) {
        console.error('Помилка завантаження даних:', err);
        setError('Не вдалося завантажити дані');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="loading">Завантаження...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <h1>Адмін: Панель управління</h1>

      <div className="admin-flex-container">
        <div className="admin-list">
          <h2>Заявки</h2>
          {applications.length === 0 ? (
            <p>Заявок немає.</p>
          ) : (
            <ul className="admin-list-ul">
              {applications.map((app) => (
                <li
                  key={app.id}
                  className={`admin-list-item ${
                    selectedApplication?.id === app.id ? 'selected' : ''
                  }`}
                  onClick={() => setSelectedApplication(app)}
                >
                  {app.first_name && app.last_name
                    ? `${app.first_name} ${app.last_name} — ${app.vacancy_title || 'Вакансія'}`
                    : `Заявка #${app.id}`}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="admin-list">
          <h2>Користувачі</h2>
          {users.length === 0 ? (
            <p>Користувачів немає.</p>
          ) : (
            <ul className="admin-list-ul">
              {users.map((user) => (
                <li key={user.id} className="admin-list-item">
                  {user.username} ({user.role})
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {selectedApplication && (
        <div className="admin-application-details">
          <h2>Деталі заявки #{selectedApplication.id}</h2>
          <p><strong>Ім'я:</strong> {selectedApplication.first_name} {selectedApplication.last_name} {selectedApplication.patronymic || ''}</p>
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

          <button className="admin-close-btn" onClick={() => setSelectedApplication(null)}>
            Закрити
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
