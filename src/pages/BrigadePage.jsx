import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BrigadeCarousel.css';

const brigadeData = {
  'ok-skhid': { name: '92 ОМБр', description: '...', image: '/images/92ombr.jpg' },
  'ok-zakhid': { name: '93 ОМБр', description: '...', image: '/images/93ombr.jpg' },
  'ok-pivden': { name: '36 МПБр', description: '...', image: '/images/36mpbr.jpg' },
  'ok-center': { name: '30 ОМБр', description: '...', image: '/images/30ombr.jpg' },
  'ok-reserve': { name: '10 ГШБр', description: '...', image: '/images/10gsbr.jpg' },
};

const defaultCarouselImage = 'https://upload.wikimedia.org/...svg.png';

const BrigadePage = () => {
  const { brigadeId } = useParams();
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(Object.keys(brigadeData).indexOf(brigadeId));

  // Функція для прокрутки
  const scroll = (direction) => {
    setCurrentIndex((prevIndex) => {
      const maxIndex = Object.keys(brigadeData).length - 1;
      const newIndex = direction === 'left' ? prevIndex - 1 : prevIndex + 1;
      return (newIndex < 0 ? maxIndex : newIndex > maxIndex ? 0 : newIndex);
    });
  };

  // Автоматична прокрутка кожні 10 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % Object.keys(brigadeData).length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const currentBrigade = Object.entries(brigadeData)[currentIndex];

  return (
    <div className="brigade-carousel-container">
      <h2 className="brigade-carousel-title">Бригада: {currentBrigade[1].name}</h2>
      <div className="carousel-wrapper">
        <button onClick={() => scroll('left')} className="carousel-button left">◀</button>
        <div className="carousel-track">
          <div
            key={currentBrigade[0]}
            onClick={() => navigate(`/brigades/${currentBrigade[0]}`)}
            className="brigade-card active-brigade"
          >
            <img
              src={currentBrigade[1].image || defaultCarouselImage}
              alt={currentBrigade[1].name}
              className="brigade-image"
            />
            <div className="brigade-text">
              <h3>{currentBrigade[1].name}</h3>
              <p>{currentBrigade[1].description}</p>
            </div>
          </div>
        </div>
        <button onClick={() => scroll('right')} className="carousel-button right">▶</button>
      </div>
    </div>
  );
};

export default BrigadePage;
