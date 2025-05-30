import React, { useEffect, useState } from 'react';
import brigadesByCommand from '../data/brigades';
import '../styles/AllBrigadesPage.css';
import { Link } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  ResponsiveContainer, CartesianGrid, LabelList
} from 'recharts';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

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
          headers
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
            <BarChart data={stats} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="brigade_name"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={70}
                tick={{ fill: '#facc15', fontWeight: '600' }}
              />
              <YAxis tick={{ fill: '#facc15', fontWeight: '600' }} />
              <Tooltip
                contentStyle={{ backgroundColor: '#222', borderRadius: '8px', border: 'none' }}
                itemStyle={{ color: '#facc15', fontWeight: '600' }}
              />
              <Bar dataKey="application_count" fill="#facc15" radius={[5, 5, 0, 0]}>
                <LabelList dataKey="application_count" position="top" fill="#facc15" fontWeight="700" />
              </Bar>
            </BarChart>
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
