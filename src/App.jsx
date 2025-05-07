import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <nav style={{ padding: '10px', background: '#f0f0f0' }}>
        {token ? (
          <>
            <Link to="/home" style={{ marginRight: '10px' }}>Home</Link>
            <Link to="/profile" style={{ marginRight: '10px' }}>Profile</Link>
          </>
        ) : (
          <>
            <Link to="/login" style={{ marginRight: '10px' }}>Login</Link>
            <Link to="/register" style={{ marginRight: '10px' }}>Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Захищені сторінки */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* За замовчуванням — перекидаємо на Home або Login */}
        <Route
          path="/"
          element={token ? <Home /> : <Login />}
        />
      </Routes>
    </Router>
  );
}

export default App;
