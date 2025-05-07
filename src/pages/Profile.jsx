import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../src/styles/Profile.css';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      setError('Token not found. Please log in.');
      return window.location.href = '/login';
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(res.data);
      } catch (err) {
        const msg = err.response?.data?.error || 'Unknown error';
        console.error('❌ Fetch error:', msg);
        setError(`Error fetching profile: ${msg}`);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  const {
    username, email, first_name, last_name, patronymic,
    birth_date, military_unit, rank, position, mos, avatar_url
  } = userData;

  return (
    <div className="profile-container">
      {avatar_url && (
        <div className="avatar-container">
          <img src={avatar_url} alt="Profile" className="avatar" />
        </div>
      )}
      <h2>Профіль</h2>
      <p><strong>Логін:</strong> {username}</p>
      <p><strong>Email:</strong> {email}</p>
      <p><strong>Ім'я:</strong> {first_name}</p>
      <p><strong>Прізвище:</strong> {last_name}</p>
      <p><strong>По батькові:</strong> {patronymic}</p>
      <p><strong>Дата народження:</strong> {birth_date}</p>
      <p><strong>Військова частина:</strong> {military_unit}</p>
      {military_unit && (
        <>
          <p><strong>Звання:</strong> {rank}</p>
          <p><strong>Посада:</strong> {position}</p>
          <p><strong>ВОС:</strong> {mos}</p>
        </>
      )}
    </div>
  );
}

export default Profile;
