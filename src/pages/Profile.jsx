import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) window.location.href = '/login';

    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUserData(response.data);
        setLoading(false);
      } catch {
        setError('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      <p><strong>Username:</strong> {userData.username}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Password:</strong> *****</p>
    </div>
  );
}

export default Profile;
