import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import brigadesByCommand from '../data/brigades'; // ІМПОРТУЄМО ДАНІ
import '../styles/BrigadeCarousel.css';

const BrigadePage = () => {
  const { brigadeId } = useParams(); // Наприклад: ok-skhid
  const navigate = useNavigate();

  const brigades = brigadesByCommand[brigadeId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [brigadeId]);

  const scroll = (direction) => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = brigades.length - 1;
      const newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
      return (newIndex < 0 ? maxIndex : newIndex > maxIndex ? 0 : newIndex);
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % brigades.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [brigades.length]);

  const currentBrigade = brigades[currentIndex];

  if (!currentBrigade) {
    return <div className="brigade-carousel-container">Бригаду не знайдено</div>;
  }

  return (
    <div className="brigade-carousel-container">
      <h2 className="brigade-carousel-title">Бригада: {currentBrigade.name}</h2>
      <div className="carousel-wrapper">
        <button onClick={() => scroll('left')} className="carousel-button left">◀</button>
        <div className="carousel-track">
          <div className="brigade-card active-brigade">
            <img
              src={currentBrigade.image}
              alt={currentBrigade.name}
              className="brigade-image"
            />
            <div className="brigade-text">
              <h3>{currentBrigade.name}</h3>
              <p>{currentBrigade.description}</p>
            </div>
          </div>
        </div>
        <button onClick={() => scroll('right')} className="carousel-button right">▶</button>
      </div>

      <div className="back-to-ok-container">
        <button onClick={() => navigate('/home')} className="back-to-ok-button">
          Повернутися до ОК
        </button>
      </div>
    </div>
  );
};

export default BrigadePage;
