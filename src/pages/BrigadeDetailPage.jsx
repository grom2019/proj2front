import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import brigadesByCommand from '../data/brigades';
import '../styles/BrigadeDetailPage.css';  // Підключаємо стилі для детальної сторінки бригади

const BrigadeDetailPage = () => {
  const { command, brigadeName } = useParams();
  const decodedBrigadeName = decodeURIComponent(brigadeName); // Декодуємо ім'я бригади

  // Перевірка, чи існує команда і чи знайдена бригада
  const brigade = brigadesByCommand[command]?.find(b => b.name === decodedBrigadeName);

  const [jobOpenings] = useState([
    { title: 'Командир відділення', description: 'Обов\'язки: командування відділенням, виконання стратегічних завдань...', image: '/images/job1.png' },
    { title: 'Медик', description: 'Обов\'язки: надання першої медичної допомоги на полі бою...', image: '/images/job2.png' }
  ]);

  // Якщо бригада не знайдена
  if (!brigade) {
    return <div className="brigade-not-found">Бригада не знайдена</div>;
  }

  return (
    <div className="brigade-detail-page">
      <div className="brigade-header">
        <h2>{brigade.name}</h2>
        <img src={brigade.image} alt={brigade.name} className="brigade-image" />
      </div>
      
      <div className="brigade-info">
        <h3>Про бригаду</h3>
        <p>{brigade.description}</p>
      </div>

      <div className="job-list">
        <h3>Вільні посади:</h3>
        {jobOpenings.map((job, index) => (
          <div key={index} className="job-card">
            <img src={job.image} alt={job.title} className="job-image" />
            <div className="job-info">
              <h4>{job.title}</h4>
              <p>{job.description}</p>
              <button onClick={() => alert('Заявка надіслана!')} className="apply-btn">Подати заявку</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrigadeDetailPage;
