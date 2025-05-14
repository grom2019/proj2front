import React, { useState } from 'react';
import brigadesByCommand from '../data/brigades';
import '../styles/AllBrigadesPage.css'; 
import { Link } from 'react-router-dom';

const AllBrigadesPage = () => {
  const [filter, setFilter] = useState({ type: '', category: '' });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  const allBrigades = Object.entries(brigadesByCommand).flatMap(([command, brigades]) =>
    brigades
      .map((brigade) => ({ ...brigade, command }))
      .filter((brigade) => {
        const { type, category } = filter;
        return (
          (!type || brigade.type === type) &&
          (!category || brigade.category === category)
        );
      })
  );

  return (
    <div className="all-brigades-page">
      <h2>Усі бригади</h2>
      <div className="filters">
        <select name="type" onChange={handleFilterChange} value={filter.type}>
          <option value="">Тип</option>
          <option value="сухопутні">Сухопутні</option>
          <option value="морські">Морські</option>
          <option value="повітряні">Повітряні</option>
        </select>
        <select name="category" onChange={handleFilterChange} value={filter.category}>
          <option value="">Категорія</option>
          <option value="механізована">Механізована</option>
          <option value="танкова">Танкова</option>
          <option value="гірська штурмова">Гірська штурмова</option>
          <option value="артилерія">Артилерія</option>
        </select>
      </div>
      <div className="brigade-list">
        {allBrigades.map((brigade, index) => (
          <div key={index} className="brigade-card">
            <img src={brigade.image} alt={brigade.name} className="brigade-image" />
            <div className="brigade-info">
              <h3>{brigade.name}</h3>
              <p>{brigade.description}</p>
              <Link to={`/brigades/${brigade.command}/${encodeURIComponent(brigade.name)}`} className="brigade-link">
                Перейти до детальної інформації
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBrigadesPage;
