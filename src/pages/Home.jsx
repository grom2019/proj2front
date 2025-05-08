// src/pages/Home.jsx
import React, { useState } from 'react';
import '../../styles/Home.css';

const Home = () => {
  const [activeBranch, setActiveBranch] = useState(null);

  const branches = [
    {
      name: "Сухопутні війська",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_the_Ukrainian_Armed_Forces.svg/250px-Emblem_of_the_Ukrainian_Armed_Forces.svg.png",
    },
    {
      name: "Повітряні сили",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_the_Ukrainian_Armed_Forces.svg/250px-Emblem_of_the_Ukrainian_Armed_Forces.svg.png",
    },
    {
      name: "Військово-морські сили",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_the_Ukrainian_Armed_Forces.svg/250px-Emblem_of_the_Ukrainian_Armed_Forces.svg.png",
    },
  ];

  return (
    <div className="home-container">
      <h1 className="home-title">Оберіть вид ЗСУ</h1>
      <div className="branch-grid">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="branch-card"
            onClick={() => setActiveBranch(branch)}
          >
            <img src={branch.image} alt={branch.name} className="branch-image" />
            <p className="branch-name">{branch.name}</p>
          </div>
        ))}
      </div>

      {activeBranch && (
        <div className="overlay">
          <div className="overlay-content">
            <h2>{activeBranch.name}</h2>
            <button className="close-btn" onClick={() => setActiveBranch(null)}>Закрити</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
