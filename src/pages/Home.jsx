import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [activeBranch, setActiveBranch] = useState(null);
  const navigate = useNavigate();

  const emblem =
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Emblem_of_the_Ukrainian_Armed_Forces.svg/250px-Emblem_of_the_Ukrainian_Armed_Forces.svg.png";

  const branches = [
    {
      name: "Сухопутні війська",
      image: emblem,
      commands: [
        { name: "ОК 'Схід'", id: "ok-skhid", brigades: ["92 ОМБр", "79 ОМБр"] },
        { name: "ОК 'Захід'", id: "ok-zakhid", brigades: ["123 ОМБр", "101 ОМБр"] },
        { name: "ОК 'Південь'", id: "ok-pivden", brigades: ["17 ОМБр", "35 ОМБр"] },
        { name: "ОК 'Північ'", id: "ok-pivnich", brigades: ["53 ОМБр", "72 ОМБр"] },
      ],
    },
    {
      name: "Повітряні сили",
      image: emblem,
      commands: [
        { name: "Центр", id: "center", brigades: ["12 ОМБр", "34 ОМБр"] },
        { name: "Захід", id: "zakhid", brigades: ["22 ОМБр", "19 ОМБр"] },
        { name: "Південь", id: "pivden", brigades: ["10 ОМБр", "24 ОМБр"] },
        { name: "Схід", id: "skhid", brigades: ["5 ОМБр", "3 ОМБр"] },
      ],
    },
    {
      name: "Військово-морські сили",
      image: emblem,
      commands: [
        { name: "Командування ВМС", id: "vms", brigades: ["36 ОМБр", "24 ОМБр"] },
        { name: "Морська піхота", id: "mp", brigades: ["28 ОМБр", "501 ОМБр"] },
        { name: "Флот", id: "flot", brigades: ["102 ОМБр", "34 ОМБр"] },
        { name: "Берегова охорона", id: "bo", brigades: ["35 ОМБр", "54 ОМБр"] },
      ],
    },
  ];

  const handleCommandClick = (commandId) => {
    // Перехід на сторінку бригад із передачею id команди
    navigate(`/brigades/${commandId}`);
  };

  const handleBrigadeClick = (commandId, brigadeName) => {
    // Перехід на сторінку детальної бригади
    navigate(`/brigades/${commandId}/${brigadeName}`);
  };

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
                <div
                  key={index}
                  className="command-card"
                  onClick={() => handleCommandClick(cmd.id)}
                >
                  <img src={cmd.image} alt={cmd.name} className="command-image" />
                  <p className="command-name">{cmd.name}</p>
                </div>
              ))}
            </div>
            <button className="back-btn" onClick={() => setActiveBranch(null)}>
              Назад
            </button>
          </div>
        </div>
      )}

      {activeBranch && (
        <div>
          <h3>Вибір бригади:</h3>
          <div className="brigades-list">
            {activeBranch.commands.map((cmd, index) => (
              cmd.brigades.map((brigadeName, idx) => (
                <div key={idx} className="brigade-card" onClick={() => handleBrigadeClick(cmd.id, brigadeName)}>
                  <p>{brigadeName}</p>
                </div>
              ))
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
