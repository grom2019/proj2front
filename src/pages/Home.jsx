import React from 'react';
import LogoutButton from '../components/LogoutButton';

function Home() {
  return (
    <div className="home-container">
      <h2>Welcome to the Home Page</h2>
      <p>You are logged in!</p>
      <LogoutButton />
    </div>
  );
}

export default Home;
