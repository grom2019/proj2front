// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import VerifyEmail from './pages/VerifyEmail';
import Profile from './pages/Profile';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BrigadeDetailPage from './pages/BrigadeDetailPage';  // Сторінка для детальної інформації про бригаду
import AllBrigadesPage from './pages/AllBrigadesPage';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/brigades" element={<AllBrigadesPage />} />
            <Route path="/brigades/:commandId" element={<AllBrigadesPage />} />
            <Route path="/brigades/:commandId/:brigadeName" element={<BrigadeDetailPage />} />
            <Route path="/" element={<Login />} /> {/* За замовчуванням сторінка входу */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
