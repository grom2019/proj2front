import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      <h2>Welcome to the Home Page</h2>
      <p>You are logged in!</p>
      <LogoutButton />
    </div>
  );
}

export default Home;
