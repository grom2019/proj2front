import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Головна сторінка</h1>
      <p className="text-lg text-center mb-6">Оберіть вид ЗСУ, ОК та бригаду:</p>
      
      <div className="text-center mb-6">
        <Link to="/brigade/92-ombr">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            92 окрема механізована бригада
          </button>
        </Link>
      </div>

      <div className="text-center mb-6">
        <Link to="/brigade/93-ombr">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            93 окрема механізована бригада
          </button>
        </Link>
      </div>

      <div className="text-center">
        <Link to="/brigade/36-mpbr">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            36 окрема бригада морської піхоти
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
