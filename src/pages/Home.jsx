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
        { name: "ОК 'Схід'", id: "ok-skhid" },
        { name: "ОК 'Захід'", id: "ok-zakhid" },
        { name: "ОК 'Південь'", id: "ok-pivden" },
        { name: "ОК 'Північ'", id: "ok-pivnich" },
      ],
    },
    {
      name: "Повітряні сили",
      image: emblem,
      commands: [
        { name: "Центр", id: "center" },
        { name: "Захід", id: "zakhid" },
        { name: "Південь", id: "pivden" },
        { name: "Схід", id: "skhid" },
      ],
    },
    {
      name: "Військово-морські сили",
      image: emblem,
      commands: [
        { name: "Командування ВМС", id: "vms" },
        { name: "Морська піхота", id: "mp" },
        { name: "Флот", id: "flot" },
        { name: "Берегова охорона", id: "bo" },
      ],
    },
  ];

  const handleCommandClick = (commandId) => {
    // Перехід на сторінку бригад із передачею id команди
    navigate(`/brigades/${commandId}`);
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
    </div>
  );
};
//
export default Home;
