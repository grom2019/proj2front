import React, { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [activeBranch, setActiveBranch] = useState(null);

  const emblem =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_the_Ukrainian_Armed_Forces.svg/250px-Emblem_of_the_Ukrainian_Armed_Forces.svg.png";

  const branches = [
    {
      name: "Сухопутні війська",
      image: emblem,
      commands: [
        { name: "ОК 'Схід'", image: emblem },
        { name: "ОК 'Захід'", image: emblem },
        { name: "ОК 'Південь'", image: emblem },
        { name: "ОК 'Північ'", image: emblem },
      ],
    },
    {
      name: "Повітряні сили",
      image: emblem,
      commands: [
        { name: "Центр", image: emblem },
        { name: "Захід", image: emblem },
        { name: "Південь", image: emblem },
        { name: "Схід", image: emblem },
      ],
    },
    {
      name: "Військово-морські сили",
      image: emblem,
      commands: [
        { name: "Командування ВМС", image: emblem },
        { name: "Морська піхота", image: emblem },
        { name: "Флот", image: emblem },
        { name: "Берегова охорона", image: emblem },
      ],
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
          <div className="overlay-box">
            <h2>{activeBranch.name}</h2>
            <div className="commands-row">
              {activeBranch.commands.map((cmd, index) => (
                <div key={index} className="command-card">
                  <img src={cmd.image} alt={cmd.name} className="command-image" />
                  <p className="command-name">{cmd.name}</p>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={() => setActiveBranch(null)}>Назад</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
