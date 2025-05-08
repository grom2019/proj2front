// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import LogoutButton from './components/LogoutButton';
import { AuthContext } from './context/AuthContext';
import StructureSelector from './components/StructureSelector'; // це вже працює
import BrigadePage from './pages/BrigadePage'; // Імпортуємо новий компонент

function App() {
  const { token } = useContext(AuthContext);

  return (
    <Router>
      <nav className="nav">
        {token ? (
          <>
            <Link to="/home" className="nav-link">Home</Link>
            <Link to="/profile" className="nav-link">Profile</Link>
            <LogoutButton />
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/register" className="nav-link">Register</Link>
          </>
        )}
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/brigade/:brigadeId" element={<BrigadePage />} /> {/* Маршрут для бригади */}
        <Route path="/" element={token ? <Home /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
