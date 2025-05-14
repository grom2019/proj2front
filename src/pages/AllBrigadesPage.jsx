// src/pages/AllBrigadesPage.jsx
import React from 'react';
import brigadesByCommand from '../data/brigades';
import '../styles/AllBrigadesPage.css'; // Створимо окремий CSS для цієї сторінки
import { Link } from 'react-router-dom';

const AllBrigadesPage = () => {
  const allBrigades = Object.entries(brigadesByCommand).flatMap(([command, brigades]) =>
    brigades.map((brigade) => ({ ...brigade, command }))
  );

  return (
    <div className="all-brigades-page">
      <h2>Усі бригади</h2>
      <div className="brigade-list">
        {allBrigades.map((brigade, index) => (
          <div key={index} className="brigade-card">
            <img src={brigade.image} alt={brigade.name} className="brigade-image" />
            <div className="brigade-info">
              <h3>{brigade.name}</h3>
              <p>{brigade.description}</p>
              <Link to={`/brigade/${brigade.command}`} className="brigade-link">
                Перейти до командування
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBrigadesPage;
