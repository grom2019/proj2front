import React, { useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

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

const BrigadePage = () => {
  const { brigadeId } = useParams();
  const navigate = useNavigate();
  const brigade = brigadeData[brigadeId];
  const carouselRef = useRef(null);

  if (!brigade) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Бригаду не знайдено</h2>
      </div>
    );
  }

  const handleNavigate = (id) => {
    navigate(`/brigades/${id}`);
  };

  // Автоматичне прокручування
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 240, behavior: 'smooth' });
      }
    }, 10000); // кожні 10 секунд
    return () => clearInterval(interval);
  }, []);

  // Прокрутка вручну
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
      {/* Інформація про бригаду */}
      <h1 className="text-3xl font-bold mb-4 text-center">{brigade.name}</h1>
      <img
        src={brigade.image}
        alt={brigade.name}
        className="w-full rounded-2xl shadow-md mb-6"
      />
      <p className="text-lg leading-7 text-gray-800 mb-6">{brigade.description}</p>

      <div className="text-center mb-12">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl"
        >
          Назад
        </button>
      </div>

      {/* Карусель бригад з кнопками */}
      <h2 className="text-2xl font-bold mb-4 text-center">Інші бригади</h2>
      <div className="relative">
        {/* Кнопки прокрутки */}
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
          {Object.entries(brigadeData).map(([id, b]) => (
            <div
              key={id}
              onClick={() => handleNavigate(id)}
              className="min-w-[220px] cursor-pointer rounded-xl shadow-lg hover:scale-105 transition-transform bg-white"
            >
              <img
                src={b.image}
                alt={b.name}
                className="w-full h-40 object-cover rounded-t-xl"
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
