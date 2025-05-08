import React, { useState } from 'react';

const Home = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [selectedOK, setSelectedOK] = useState(null);

  const handleBranchSelect = (branch) => {
    setSelectedBranch(branch);
    setSelectedOK(null);
  };

  const handleOKSelect = (ok) => {
    setSelectedOK(ok);
  };

  const branchOptions = [
    {
      name: "Сухопутні війська",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Emblem_of_the_Ukrainian_Ground_Forces.svg/1200px-Emblem_of_the_Ukrainian_Ground_Forces.svg.png",
      oks: [
        { name: "ОК «Захід»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Operational_Command_West_emblem.png/800px-Operational_Command_West_emblem.png" },
        { name: "ОК «Схід»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1e/Operational_Command_East_emblem.png/800px-Operational_Command_East_emblem.png" },
        { name: "ОК «Південь»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Operational_Command_South_emblem.png/800px-Operational_Command_South_emblem.png" },
        { name: "ОК «Північ»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Operational_Command_North_emblem.png/800px-Operational_Command_North_emblem.png" },
      ],
    },
    {
      name: "Повітряні сили",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Emblem_of_the_Ukrainian_Air_Force.svg/1200px-Emblem_of_the_Ukrainian_Air_Force.svg.png",
      oks: [
        { name: "ПвК «Захід»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Air_Command_West_emblem.png/800px-Air_Command_West_emblem.png" },
        { name: "ПвК «Схід»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Air_Command_East_emblem.png/800px-Air_Command_East_emblem.png" },
        { name: "ПвК «Південь»", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Air_Command_South_emblem.png/800px-Air_Command_South_emblem.png" },
      ],
    },
    {
      name: "Військово-морські сили",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Emblem_of_the_Ukrainian_Navy.svg/1200px-Emblem_of_the_Ukrainian_Navy.svg.png",
      oks: [
        { name: "ВМС України", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Emblem_of_the_Ukrainian_Navy.svg/800px-Emblem_of_the_Ukrainian_Navy.svg.png" },
      ],
    },
  ];

  const renderOKSelection = () => {
    if (selectedBranch) {
      const branch = branchOptions.find(b => b.name === selectedBranch);
      return (
        <div className="mt-10">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6 animate-fade">Оберіть Оперативне командування</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {branch.oks.map((ok, index) => (
              <div
                key={index}
                onClick={() => handleOKSelect(ok.name)}
                className={`cursor-pointer transition duration-300 transform hover:scale-105 p-4 rounded-xl shadow-md bg-white border-2 ${selectedOK === ok.name ? 'border-blue-500' : 'border-transparent'}`}
              >
                <img src={ok.image} alt={ok.name} className="w-28 h-28 mx-auto rounded-full mb-4 object-cover" />
                <p className="text-lg font-semibold text-gray-800">{ok.name}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 home-container">
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Головна сторінка</h1>
      <p className="text-lg text-center mb-8 text-gray-600">Оберіть вид ЗСУ:</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {branchOptions.map((branch, index) => (
          <div
            key={index}
            onClick={() => handleBranchSelect(branch.name)}
            className={`cursor-pointer transition duration-300 transform hover:scale-105 p-4 rounded-xl shadow-md bg-white border-2 ${selectedBranch === branch.name ? 'border-green-500' : 'border-transparent'}`}
          >
            <img src={branch.image} alt={branch.name} className="w-28 h-28 mx-auto rounded-full mb-4 object-cover" />
            <p className="text-lg font-semibold text-gray-800">{branch.name}</p>
          </div>
        ))}
      </div>

      {renderOKSelection()}
    </div>
  );
};

export default Home;
