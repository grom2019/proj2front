import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedOK, setSelectedOK] = useState(null);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setSelectedOK(null);  // Reset OK selection when branch changes
  };

  const handleOKSelect = (ok) => {
    setSelectedOK(ok);
  };

  const renderOKSelection = () => {
    const okOptions = {
      "Сухопутні війська": ["ОК "],
      "Повітряні сили": ["ОК ПСУ", "ОК 2"],
      "Військово-морські сили": ["ОК ВМСУ"],
    };

    if (selectedBranch) {
      return (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center mb-4">Оберіть Оперативне командування</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {okOptions[selectedBranch].map((ok, index) => (
              <div key={index} className="text-center">
                <div
                  onClick={() => handleOKSelect(ok)}
                  className="cursor-pointer"
                >
                  <div className="w-32 h-32 mx-auto bg-gray-200 rounded-full mb-4" />
                  <p className="text-lg font-semibold">{ok}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBrigadeSelection = () => {
    if (selectedOK) {
      return (
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-center mb-4">Оберіть бригаду</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center mb-6">
              <Link to={`/brigade/92-ombr`}>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  92 окрема механізована бригада
                </button>
              </Link>
            </div>
            <div className="text-center mb-6">
              <Link to={`/brigade/93-ombr`}>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  93 окрема механізована бригада
                </button>
              </Link>
            </div>
            <div className="text-center">
              <Link to={`/brigade/36-mpbr`}>
                <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  36 окрема бригада морської піхоти
                </button>
              </Link>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Головна сторінка</h1>
      <p className="text-lg text-center mb-6">Оберіть вид ЗСУ:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {["Сухопутні війська", "Повітряні сили", "Військово-морські сили"].map((branch, index) => (
          <div
            key={index}
            onClick={() => handleBranchSelect(branch)}
            className="cursor-pointer text-center"
          >
            <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full mb-4" />
            <p className="text-lg font-semibold">{branch}</p>
          </div>
        ))}
      </div>

      {renderOKSelection()}
      {renderBrigadeSelection()}
    </div>
  );
};

export default Home;
