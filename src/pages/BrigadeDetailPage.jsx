// src/pages/BrigadeDetailPage.jsx

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import brigadesByCommand from '../data/brigades';

const BrigadeDetailPage = () => {
  const { command, brigadeName } = useParams();
  const decodedBrigadeName = decodeURIComponent(brigadeName); // Декодуємо ім'я бригади

  // Перевірка, чи існує команда і чи знайдена бригада
  const brigade = brigadesByCommand[command]?.find(b => b.name === decodedBrigadeName);

  const [jobOpenings] = useState([
    { title: 'Командир відділення', description: 'Обов\'язки: командування відділенням, виконання стратегічних завдань...', image: '/images/job1.png' },
    { title: 'Медик', description: 'Обов\'язки: надання першої медичної допомоги на полі бою...', image: '/images/job2.png' }
  ]);

  if (!brigade) {
    return <div>Бригада не знайдена</div>;
  }

  return (
    <div className="brigade-detail-page">
      <h2>{brigade.name}</h2>
      <img src={brigade.image} alt={brigade.name} />
      <p>{brigade.description}</p>

      <div className="job-list">
        <h3>Вільні посади:</h3>
        {jobOpenings.map((job, index) => (
          <div key={index} className="job-card">
            <img src={job.image} alt={job.title} className="job-image" />
            <div className="job-info">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <button onClick={() => alert('Заявка надіслана!')}>Подати заявку</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrigadeDetailPage;
