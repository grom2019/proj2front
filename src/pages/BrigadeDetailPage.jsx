import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import brigadesByCommand from '../data/brigades';
import '../styles/BrigadeDetailPage.css';

const BrigadeDetailPage = () => {
  const { commandId, brigadeName } = useParams();
  const decodedBrigadeName = decodeURIComponent(brigadeName);

  const brigade = brigadesByCommand[commandId]?.find(b => b.name === decodedBrigadeName);
  const [expandedIndex, setExpandedIndex] = useState(null);

  if (!brigade) {
    return <div>Бригада не знайдена</div>;
  }

  const toggleVacancyDetails = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="brigade-detail-page">
      <h2>{brigade.name}</h2>
      <img src={brigade.image} alt={brigade.name} className="brigade-detail-image" />
      <p>{brigade.description}</p>
      <p><strong>Тип:</strong> {brigade.type}</p>
      <p><strong>Категорія:</strong> {brigade.category}</p>

      {brigade.vacancies && brigade.vacancies.length > 0 && (
        <div className="vacancy-section">
          <h3>Вільні посади</h3>
          {brigade.vacancies.map((vacancy, index) => (
            <div key={index} className="vacancy-card">
              <div className="vacancy-header" onClick={() => toggleVacancyDetails(index)}>
                <img src={vacancy.image} alt={vacancy.title} className="vacancy-image" />
                <div className="vacancy-title">
                  <h4>{vacancy.title}</h4>
                </div>
                <button className="apply-button">Подати заявку</button>
              </div>
              {expandedIndex === index && (
                <div className="vacancy-details">
                  <VacancyDetail title="Обов’язки" items={vacancy.duties} />
                  <VacancyDetail title="Необхідні якості" items={vacancy.requirements} />
                  <VacancyDetail title="Кваліфікація" items={vacancy.qualifications} />
                  <VacancyDetail title="Знання" items={vacancy.knowledge} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const VacancyDetail = ({ title, items }) => (
  <div className="vacancy-section-detail">
    <h5>{title}</h5>
    <ul>
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  </div>
);

export default BrigadeDetailPage;
