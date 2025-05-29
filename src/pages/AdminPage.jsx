import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/AdminPage.css';

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editingApplication, setEditingApplication] = useState(null);
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

  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Помилка видалення користувача:', err);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(applications.filter(app => app.id !== id));
    } catch (err) {
      console.error('Помилка видалення заявки:', err);
    }
  };

  const handleSaveUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/auth/users/${editingUser.id}`,
        editingUser,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedUsers = users.map(u => (u.id === editingUser.id ? editingUser : u));
      setUsers(updatedUsers);
      setEditingUser(null);
    } catch (err) {
      console.error('Помилка оновлення користувача:', err);
    }
  };

  const handleSaveApplication = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/applications/${editingApplication.id}`,
        editingApplication,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedApps = applications.map(a =>
        a.id === editingApplication.id ? editingApplication : a
      );
      setApplications(updatedApps);
      setEditingApplication(null);
    } catch (err) {
      console.error('Помилка оновлення заявки:', err);
    }
  };

  if (loading) return <div className="loading">Завантаження...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="admin-container">
      <h1>Адмін: Панель управління</h1>

      <div className="admin-tables-container">
        {/* Користувачі */}
        <section className="admin-table-section">
          <h2>Список користувачів</h2>
          {users.length === 0 ? (
            <p>Користувачів немає.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ім'я користувача</th>
                  <th>Email</th>
                  <th>Роль</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {users.map(user => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>
                      {editingUser?.id === user.id ? (
                        <input
                          value={editingUser.username}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, username: e.target.value })
                          }
                        />
                      ) : (
                        user.username
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id ? (
                        <input
                          value={editingUser.email}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, email: e.target.value })
                          }
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id ? (
                        <select
                          value={editingUser.role}
                          onChange={(e) =>
                            setEditingUser({ ...editingUser, role: e.target.value })
                          }
                        >
                          <option value="user">user</option>
                          <option value="admin">admin</option>
                        </select>
                      ) : (
                        user.role
                      )}
                    </td>
                    <td>
                      {editingUser?.id === user.id ? (
                        <>
                          <button onClick={handleSaveUser}>Зберегти</button>
                          <button onClick={() => setEditingUser(null)}>Скасувати</button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => setEditingUser(user)}>Редагувати</button>
                          <button onClick={() => handleDeleteUser(user.id)}>Видалити</button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        {/* Заявки */}
        <section className="admin-table-section">
          <h2>Список заявок</h2>
          {applications.length === 0 ? (
            <p>Заявок немає.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Ім'я</th>
                  <th>Прізвище</th>
                  <th>Вакансія</th>
                  <th>Дії</th>
                </tr>
              </thead>
              <tbody>
                {applications.map(app => (
                  <tr
                    key={app.id}
                    className={selectedApplication?.id === app.id ? 'selected-row' : ''}
                    onClick={() => setSelectedApplication(app)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td>{app.id}</td>
                    <td>{app.first_name}</td>
                    <td>{app.last_name}</td>
                    <td>{app.vacancy_title || 'Вакансія'}</td>
                    <td>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        setEditingApplication(app);
                      }}>
                        Редагувати
                      </button>
                      <button onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteApplication(app.id);
                      }}>
                        Видалити
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </div>

      {/* Редагування заявки */}
      {editingApplication && (
        <div className="edit-form">
          <h2>Редагування заявки #{editingApplication.id}</h2>
          <label>
            Ім'я:
            <input
              value={editingApplication.first_name}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, first_name: e.target.value })
              }
            />
          </label>
          <label>
            Прізвище:
            <input
              value={editingApplication.last_name}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, last_name: e.target.value })
              }
            />
          </label>
          {/* Додати більше полів за потреби */}
          <button onClick={handleSaveApplication}>Зберегти</button>
          <button onClick={() => setEditingApplication(null)}>Скасувати</button>
        </div>
      )}

      {/* Деталі заявки */}
      {selectedApplication && !editingApplication && (
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
