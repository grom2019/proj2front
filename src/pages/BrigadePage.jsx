// src/pages/BrigadePage.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const brigadeData = {
  '92-ombr': {
    name: '92 окрема механізована бригада',
    description: 'Бригада названа на честь кошового отамана Івана Сірка. Бере активну участь у бойових діях на Сході України.',
    image: '/images/92ombr.jpg',
  },
  '93-ombr': {
    name: '93 окрема механізована бригада',
    description: 'Бригада "Холодний Яр" відома своєю героїчною участю у бойових діях, має велику кількість нагороджених бійців.',
    image: '/images/93ombr.jpg',
  },
  '36-mpbr': {
    name: '36 окрема бригада морської піхоти',
    description: 'Бригада морської піхоти, названа на честь контрадмірала Михайла Білинського, виконує завдання в прибережних районах.',
    image: '/images/36mpbr.jpg',
  },
};

const BrigadePage = () => {
  const { brigadeId } = useParams();
  const brigade = brigadeData[brigadeId];

  if (!brigade) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600">Бригаду не знайдено</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4 text-center">{brigade.name}</h1>
      <img
        src={brigade.image}
        alt={brigade.name}
        className="w-full rounded-2xl shadow-md mb-6"
      />
      <p className="text-lg leading-7 text-gray-800 mb-6">{brigade.description}</p>
      <div className="text-center">
        <Button onClick={() => window.history.back()} className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-xl">
          Назад
        </Button>
      </div>
    </div>
  );
};

export default BrigadePage;