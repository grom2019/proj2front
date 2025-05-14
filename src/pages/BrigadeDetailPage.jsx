import React from 'react';
import { useParams } from 'react-router-dom';
import brigadesByCommand from '../data/brigades';
import '../styles/BrigadeDetailPage.css';

const BrigadeDetailPage = () => {
  const { commandId, brigadeName } = useParams();
  const decodedBrigadeName = decodeURIComponent(brigadeName);

  const brigade = brigadesByCommand[commandId]?.find(b => b.name === decodedBrigadeName);

  if (!brigade) {
    return <div>Бригада не знайдена</div>;
  }

  return (
    <div className="brigade-detail-page">
      <h2>{brigade.name}</h2>
      <img src={brigade.image} alt={brigade.name} className="brigade-detail-image" />
      <p>{brigade.description}</p>
      <p><strong>Тип:</strong> {brigade.type}</p>
      <p><strong>Категорія:</strong> {brigade.category}</p>
    </div>
  );
};

export default BrigadeDetailPage;
