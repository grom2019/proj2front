import React, { useEffect, useState } from 'react';
import brigadesByCommand from '../data/brigades';
import '../styles/AllBrigadesPage.css';
import { Link } from 'react-router-dom';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const COLORS = [
  '#facc15', '#eab308', '#ca8a04', '#a16207',
  '#854d0e', '#713f12', '#78350f', '#92400e',
];

const AllBrigadesPage = () => {
  const [filter, setFilter] = useState({ type: '', category: '' });
  const [stats, setStats] = useState([]);
  const { token } = useAuth();

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

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/applications/stats/brigades`, {
          headers,
        });
        setStats(res.data);
      } catch (err) {
        console.error('Помилка завантаження статистики:', err);
      }
    };

    fetchStats();
  }, [token]);

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

      {stats.length > 0 && (
        <div className="chart-container">
          <h3 className="chart-title">Найпопулярніші бригади</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={stats}
                dataKey="application_count"
                nameKey="brigade_name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, value }) => `${name}: ${value}`}
                labelLine={false}
              >
                {stats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value} заявок`, 'Кількість']}
                separator=": "
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="brigade-list">
        {allBrigades.map((brigade, index) => (
          <Link
            key={index}
            to={`/brigades/${brigade.command}/${encodeURIComponent(brigade.name)}`}
            className="brigade-card"
          >
            <img src={brigade.image} alt={brigade.name} className="brigade-image" />
            <div className="brigade-info">
              <h3>{brigade.name}</h3>
              <p>{brigade.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllBrigadesPage;
