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
    if (!window.confirm('Ви впевнені, що хочете видалити цього користувача?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/auth/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error('Помилка видалення користувача:', err);
      alert('Не вдалося видалити користувача');
    }
  };

  const handleDeleteApplication = async (id) => {
    if (!window.confirm('Ви впевнені, що хочете видалити цю заявку?')) return;

    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/api/applications/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setApplications(applications.filter(app => app.id !== id));
      if (selectedApplication?.id === id) setSelectedApplication(null);
    } catch (err) {
      console.error('Помилка видалення заявки:', err);
      alert('Не вдалося видалити заявку');
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
      alert('Не вдалося оновити користувача');
    }
  };

  const handleSaveApplication = async () => {
    try {
      const token = localStorage.getItem('token');
      const { data } = await axios.put(
        `${process.env.REACT_APP_BASE_URL}/api/applications/${editingApplication.id}`,
        editingApplication,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedApps = applications.map(a =>
        a.id === editingApplication.id ? data.application : a
      );
      setApplications(updatedApps);
      setEditingApplication(null);
    } catch (err) {
      console.error('Помилка оновлення заявки:', err);
      alert('Не вдалося оновити заявку');
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
                          type="text"
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
                          type="email"
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setEditingApplication(app);
                        }}
                      >
                        Редагувати
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteApplication(app.id);
                        }}
                      >
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
              type="text"
              value={editingApplication.first_name || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, first_name: e.target.value })
              }
            />
          </label>
          <label>
            Прізвище:
            <input
              type="text"
              value={editingApplication.last_name || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, last_name: e.target.value })
              }
            />
          </label>
          <label>
            Вакансія:
            <input
              type="text"
              value={editingApplication.vacancy_title || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, vacancy_title: e.target.value })
              }
            />
          </label>
          <label>
            Бригада:
            <input
              type="text"
              value={editingApplication.brigade_name || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, brigade_name: e.target.value })
              }
            />
          </label>
          <label>
            Звання:
            <input
              type="text"
              value={editingApplication.rank || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, rank: e.target.value })
              }
            />
          </label>
          <label>
            Посада:
            <input
              type="text"
              value={editingApplication.position || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, position: e.target.value })
              }
            />
          </label>
          <label>
            Коментар:
            <textarea
              value={editingApplication.comment || ''}
              onChange={(e) =>
                setEditingApplication({ ...editingApplication, comment: e.target.value })
              }
            />
          </label>
          <div className="edit-form-buttons">
            <button onClick={handleSaveApplication}>Зберегти</button>
            <button onClick={() => setEditingApplication(null)}>Відмінити</button>
          </div>
        </div>
      )}

      {/* Деталі вибраної заявки */}
      {selectedApplication && !editingApplication && (
        <div className="application-details">
          <h2>Деталі заявки #{selectedApplication.id}</h2>
          <p>
            <strong>Ім'я:</strong> {selectedApplication.first_name}
          </p>
          <p>
            <strong>Прізвище:</strong> {selectedApplication.last_name}
          </p>
          <p>
            <strong>Вакансія:</strong> {selectedApplication.vacancy_title}
          </p>
          <p>
            <strong>Бригада:</strong> {selectedApplication.brigade_name}
          </p>
          <p>
            <strong>Звання:</strong> {selectedApplication.rank}
          </p>
          <p>
            <strong>Посада:</strong> {selectedApplication.position}
          </p>
          <p>
            <strong>Коментар:</strong> {selectedApplication.comment}
          </p>
          <p>
            <strong>Документи:</strong>{' '}
            {selectedApplication.documents && selectedApplication.documents.length > 0 ? (
              selectedApplication.documents.map((doc, index) => (
                <a
                  key={index}
                  href={`${process.env.REACT_APP_BASE_URL}/uploads/${doc}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: 'block', marginBottom: '5px' }}
                >
                  {doc}
                </a>
              ))
            ) : (
              <span>Документів немає</span>
            )}
          </p>
          <button onClick={() => setSelectedApplication(null)}>Закрити</button>
        </div>
      )}
    </div>
  );
};

export default AdminPage;
