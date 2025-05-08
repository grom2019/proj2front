import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/StructureSelector.css';

const structureData = {
  'Сухопутні війська України (СВУ)': {
    'ОК «Схід»': [
      '92 окрема механізована бригада імені кошового отамана Івана Сірка',
      '93 окрема механізована бригада «Холодний Яр»',
      '54 окрема механізована бригада',
    ],
  },
  'Повітряні Сили України (ПСУ)': {
    'Повітряне командування «Захід»': [
      '204-та Севастопольська бригада тактичної авіації',
      '39 зенітна ракетна бригада',
    ],
  },
  'Військово-Морські Сили України (ВМСУ)': {
    'ВМС (командування в м. Одеса)': [
      '36 окрема бригада морської піхоти імені контрадмірала Михайла Білинського',
      '503 окремий батальйон морської піхоти',
    ],
  },
};

const StructureSelector = () => {
  const [selectedBranch, setSelectedBranch] = useState('');
  const [selectedCommand, setSelectedCommand] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleBranchChange = (e) => {
    setSelectedBranch(e.target.value);
    setSelectedCommand('');
    setSelectedIndex(0);
  };

  const handleCommandChange = (e) => {
    setSelectedCommand(e.target.value);
    setSelectedIndex(0);
  };

  const handleChoose = () => {
    const selectedBrigade = structureData[selectedBranch][selectedCommand][selectedIndex];
    navigate(`/brigades/${encodeURIComponent(selectedBrigade)}`);
  };

  const brigades =
    selectedBranch && selectedCommand
      ? structureData[selectedBranch][selectedCommand]
      : [];

  const nextSlide = () => {
    setSelectedIndex((prev) => (prev + 1) % brigades.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => (prev - 1 + brigades.length) % brigades.length);
  };

  return (
    <div className="structure-container">
      <h2>Оберіть бригаду</h2>

      <div className="dropdowns">
        <select value={selectedBranch} onChange={handleBranchChange}>
          <option value="">Оберіть вид ЗСУ</option>
          {Object.keys(structureData).map((branch) => (
            <option key={branch} value={branch}>{branch}</option>
          ))}
        </select>

        {selectedBranch && (
          <select value={selectedCommand} onChange={handleCommandChange}>
            <option value="">Оберіть ОК</option>
            {Object.keys(structureData[selectedBranch]).map((command) => (
              <option key={command} value={command}>{command}</option>
            ))}
          </select>
        )}
      </div>

      {brigades.length > 0 && (
        <div className="carousel">
          <button onClick={prevSlide}>⟨</button>
          <div className="carousel-item">{brigades[selectedIndex]}</div>
          <button onClick={nextSlide}>⟩</button>
        </div>
      )}

      {brigades.length > 0 && (
        <button className="choose-button" onClick={handleChoose}>
          Вибрати
        </button>
      )}
    </div>
  );
};

export default StructureSelector;
