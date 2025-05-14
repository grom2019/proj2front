import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import brigadesByCommand from '../data/brigades';
import '../styles/StructureSelector.css';

const commandLabels = {
  'ok-skhid': 'ОК «Схід»',
  'ok-zakhid': 'ОК «Захід»',
  'ok-pivden': 'ОК «Південь»',
  'ok-pivnich': 'ОК «Північ»',
  'center': 'ОК «Центр»',
  'zakhid': 'Повітряне командування «Захід»',
  'pivden': 'ВМС (командування в м. Одеса)',
  'skhid': 'Інші формування Сходу'
};

const StructureSelector = () => {
  const [selectedCommandKey, setSelectedCommandKey] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const handleCommandChange = (e) => {
    setSelectedCommandKey(e.target.value);
    setSelectedIndex(0);
  };

  const handleChoose = () => {
    if (selectedCommandKey) {
      navigate(`/brigades/${encodeURIComponent(selectedCommandKey)}`);
    }
  };

  const brigades = selectedCommandKey ? brigadesByCommand[selectedCommandKey] || [] : [];

  const nextSlide = () => {
    setSelectedIndex((prev) => (prev + 1) % brigades.length);
  };

  const prevSlide = () => {
    setSelectedIndex((prev) => (prev - 1 + brigades.length) % brigades.length);
  };

  return (
    <div className="structure-container">
      <h2>Оберіть командування</h2>

      <div className="dropdowns">
        <select value={selectedCommandKey} onChange={handleCommandChange}>
          <option value="">Оберіть ОК / командування</option>
          {Object.entries(commandLabels).map(([key, label]) => (
            <option key={key} value={key}>{label}</option>
          ))}
        </select>
      </div>

      {brigades.length > 0 && (
        <div className="carousel">
          <button onClick={prevSlide}>⟨</button>
          <div className="carousel-item">
            <img src={brigades[selectedIndex].image} alt={brigades[selectedIndex].name} />
            <h3>{brigades[selectedIndex].name}</h3>
            <p>{brigades[selectedIndex].description}</p>
          </div>
          <button onClick={nextSlide}>⟩</button>
        </div>
      )}

      {brigades.length > 0 && (
        <button className="choose-button" onClick={handleChoose}>
          Переглянути бригади
        </button>
      )}
    </div>
  );
};

export default StructureSelector;
