import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronymic: '',
    birth_date: '',
    military_unit: '',
    rank: '',
    position: '',
    mos: '',
    avatar_url: ''
  });
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) return window.location.href = '/login';

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
        setFormData({
          first_name: res.data.first_name || '',
          last_name: res.data.last_name || '',
          patronymic: res.data.patronymic || '',
          birth_date: res.data.birth_date || '',
          military_unit: res.data.military_unit || '',
          rank: res.data.rank || '',
          position: res.data.position || '',
          mos: res.data.mos || '',
          avatar_url: res.data.avatar_url || '' // Заповнюємо порожнім рядком, якщо аватар не задано
        });
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Перевірка, чи поля "Ім'я" та "Прізвище" не порожні
    if (!formData.first_name || !formData.last_name || !formData.patronymic) {
      alert('Ім\'я та Прізвище повинні бути заповнені!');
      return;
    }

    // Якщо поле аватар порожнє, ставимо дефолтне значення
    const updatedFormData = { ...formData };
    if (!updatedFormData.avatar_url) {
      updatedFormData.avatar_url = 'https://litmir.club/data/Author/273000/273657/%D0%A4%D0%BE%D1%82%D0%BE_%D0%9B%D0%B0%D0%BA%D0%B8_%D0%90%D0%BD%D0%BE%D0%BD%D0%B8%D0%BC_08c2c.jpg'; // Дефолтне фото
    }

    try {
      const res = await axios.put(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, updatedFormData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUserData(res.data.user);
      setIsEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      console.error('Update error:', err);
      setError('Error updating profile');
    }
  };

  // Форматуємо дату народження у вигляді: "DD-MM-YYYY"
  const formatBirthDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <div className="avatar-container">
        <img
          src={userData.avatar_url || 'https://litmir.club/data/Author/273000/273657/%D0%A4%D0%BE%D1%82%D0%BE_%D0%9B%D0%B0%D0%BA%D0%B8_%D0%90%D0%BD%D0%BE%D0%BD%D0%B8%D0%BC_08c2c.jpg'}
          alt="Profile"
          className="avatar"
        />
      </div>
      <h2>Профіль</h2>
      <button onClick={handleEditToggle}>
        {isEditing ? 'Скасувати редагування' : 'Редагувати профіль'}
      </button>

      <form onSubmit={handleSubmit} style={{ display: isEditing ? 'block' : 'none' }}>
        <div>
          <label>Логін: </label>
          <input type="text" value={userData.username} readOnly />
        </div>
        <div>
          <label>Email: </label>
          <input type="email" value={userData.email} readOnly />
        </div>
        <div>
          <label>Ім'я: </label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Прізвище: </label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleInputChange} />
        </div>
        <div>
          <label>По батькові: </label>
          <input type="text" name="patronymic" value={formData.patronymic} onChange={handleInputChange} />
        </div>
        <div>
          <label>Дата народження: </label>
          <input type="date" name="birth_date" value={formData.birth_date} onChange={handleInputChange} />
        </div>
        <div>
          <label>Військова частина: </label>
          <input type="text" name="military_unit" value={formData.military_unit} onChange={handleInputChange} />
        </div>
        <div>
          <label>Звання: </label>
          <input type="text" name="rank" value={formData.rank} onChange={handleInputChange} />
        </div>
        <div>
          <label>Посада: </label>
          <input type="text" name="position" value={formData.position} onChange={handleInputChange} />
        </div>
        <div>
          <label>ВОС: </label>
          <input type="text" name="mos" value={formData.mos} onChange={handleInputChange} />
        </div>
        <div>
          <label>Фото профілю (URL): </label>
          <input type="text" name="avatar_url" value={formData.avatar_url} onChange={handleInputChange} />
        </div>
        <button type="submit">Зберегти зміни</button>
      </form>

      {!isEditing && (
        <>
          <p><strong>Логін:</strong> {userData.username}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Ім'я:</strong> {userData.first_name}</p>
          <p><strong>Прізвище:</strong> {userData.last_name}</p>
          <p><strong>По батькові:</strong> {userData.patronymic}</p>
          <p><strong>Дата народження:</strong> {formatBirthDate(userData.birth_date)}</p>
          <p><strong>Військова частина:</strong> {userData.military_unit}</p>
          <p><strong>Звання:</strong> {userData.rank}</p>
          <p><strong>Посада:</strong> {userData.position}</p>
          <p><strong>ВОС:</strong> {userData.mos}</p>
        </>
      )}
    </div>
  );
}

export default Profile;
