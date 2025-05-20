import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import brigadesByCommand from '../data/brigades';
import '../styles/BrigadeDetailPage.css';

const BrigadeDetailPage = () => {
  const { commandId, brigadeName } = useParams();
  const decodedBrigadeName = decodeURIComponent(brigadeName);
  const navigate = useNavigate();

  const brigade = brigadesByCommand[commandId]?.find(b => b.name === decodedBrigadeName);
  const [expandedSection, setExpandedSection] = useState(null);

  if (!brigade) {
    return <div className="brigade-not-found">Бригада не знайдена</div>;
  }

  const toggleSection = (index, section) => {
    if (expandedSection && expandedSection.index === index && expandedSection.section === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection({ index, section });
    }
  };

  const handleApplyClick = (vacancy) => {
    navigate(`/apply/${commandId}/${encodeURIComponent(brigade.name)}/${encodeURIComponent(vacancy.title)}`);
  };

  return (
    <div className="brigade-detail-page">
      <h2>{brigade.name}</h2>
      <img
        src={brigade.image}
        alt={brigade.name}
        className="brigade-detail-image"
        width={300}
        height={300}
      />
      <p>{brigade.description}</p>
      <p><strong>Тип:</strong> {brigade.type}</p>
      <p><strong>Категорія:</strong> {brigade.category}</p>

      {brigade.vacancies && brigade.vacancies.length > 0 && (
        <div className="vacancy-section">
          <h3>Вільні посади</h3>
          {brigade.vacancies.map((vacancy, index) => (
            <div key={index} className="vacancy-card">
              <div className="vacancy-main-info">
                <img
                  src={vacancy.image}
                  alt={vacancy.title}
                  className="vacancy-image"
                  width={180}
                  height={180}
                />
                <div className="vacancy-summary">
                  <h4>{vacancy.title}</h4>
                  <p className="vacancy-short-description">{vacancy.description}</p>
                  <div className="vacancy-links">
                    {['duties', 'requirements', 'qualifications', 'knowledge'].map(sectionKey => {
                      const sectionTitle = {
                        duties: "Обов’язки",
                        requirements: "Необхідні якості",
                        qualifications: "Кваліфікація",
                        knowledge: "Знання",
                      }[sectionKey];
                      return (
                        <button
                          key={sectionKey}
                          className="vacancy-link"
                          onClick={() => toggleSection(index, sectionKey)}
                        >
                          {sectionTitle}
                        </button>
                      );
                    })}
                  </div>
                  <button className="apply-button" onClick={() => handleApplyClick(vacancy)}>Подати заявку</button>
                </div>
              </div>

              {expandedSection && expandedSection.index === index && expandedSection.section && (
                <VacancyDetail
                  title={{
                    duties: "Обов’язки",
                    requirements: "Необхідні якості",
                    qualifications: "Кваліфікація",
                    knowledge: "Знання",
                  }[expandedSection.section]}
                  items={vacancy[expandedSection.section]}
                />
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
