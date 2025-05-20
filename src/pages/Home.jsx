import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {
  const [activeBranch, setActiveBranch] = useState(null);
  const navigate = useNavigate();

  const branches = [
    {
      name: "Сухопутні війська",
      image: "/images/Suhoputni.png",
      commands: [
        { name: "ОК 'Схід'", id: "ok-skhid", image: "/images/ok/skhid.png" },
        { name: "ОК 'Захід'", id: "ok-zakhid", image: "/images/ok/zakhid.png" },
        { name: "ОК 'Південь'", id: "ok-pivden", image: "/images/ok/pivden.png" },
        { name: "ОК 'Північ'", id: "ok-pivnich", image: "/images/ok/pivnich.png" },
      ],
    },
    {
      name: "Повітряні сили",
      image: "/images/povitryani.png",
      commands: [
        { name: "Центр", id: "center", image: "/images/ok/center.png" },
        { name: "Захід", id: "zakhid", image: "/images/ok/air-zakhid.png" },
        { name: "Південь", id: "pivden", image: "/images/ok/air-pivden.png" },
        { name: "Схід", id: "skhid", image: "/images/ok/air-skhid.png" },
      ],
    },
    {
      name: "Військово-морські сили",
      image: "/images/morsky.png",
      commands: [
        { name: "Командування ВМС", id: "vms", image: "/images/ok/vms.png" },
        { name: "Морська піхота", id: "mp", image: "/images/ok/mp.png" },
        { name: "Флот", id: "flot", image: "/images/ok/flot.png" },
        { name: "Берегова охорона", id: "bo", image: "/images/ok/bo.png" },
      ],
    },
  ];

  const handleCommandClick = (commandId) => {
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

export default Home;
