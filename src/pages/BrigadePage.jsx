import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/BrigadeCarousel.css';

const brigadeData = {
  'ok-skhid': {
    name: '92 окрема механізована бригада',
    description: 'Бригада названа на честь кошового отамана Івана Сірка. Бере активну участь у бойових діях на Сході України.',
    image: '/images/92ombr.jpg',
  },
  'ok-zakhid': {
    name: '93 окрема механізована бригада',
    description: 'Бригада "Холодний Яр" відома своєю героїчною участю у бойових діях, має велику кількість нагороджених бійців.',
    image: '/images/93ombr.jpg',
  },
  'ok-pivden': {
    name: '36 окрема бригада морської піхоти',
    description: 'Бригада морської піхоти, названа на честь контрадмірала Михайла Білинського, виконує завдання в прибережних районах.',
    image: '/images/36mpbr.jpg',
  },
};

const defaultCarouselImage =
  'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_the_Ukrainian_Armed_Forces.svg/250px-Emblem_of_the_Ukrainian_Armed_Forces.svg.png';

const BrigadePage = () => {
  const { brigadeId } = useParams();
  const navigate = useNavigate();
  const carouselRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      }
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleNavigate = (id) => {
    navigate(`/brigades/${id}`);
  };

  const scroll = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -240 : 240,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Інші бригади</h2>
      <div className="relative">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-2 rounded-full shadow z-10"
        >
          ◀
        </button>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto space-x-4 pb-4 scroll-smooth scrollbar-hide"
        >
          {Object.entries(brigadeData)
            .filter(([id]) => id !== brigadeId)
            .map(([id, b]) => (
              <div
                key={id}
                onClick={() => handleNavigate(id)}
                className="min-w-[220px] cursor-pointer rounded-xl shadow-lg hover:scale-105 transition-transform bg-white"
              >
                <img
                  src={defaultCarouselImage}
                  alt="Емблема ЗСУ"
                  className="w-full h-40 object-contain p-2 bg-white rounded-t-xl"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-md">{b.name}</h3>
                </div>
              </div>
            ))}
        </div>
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 p-2 rounded-full shadow z-10"
        >
          ▶
        </button>
      </div>
    </div>
  );
};

export default BrigadePage;
