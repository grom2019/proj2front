import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/ApplyPage.css';

const ApplyPage = () => {
  const { commandId, brigadeName, vacancyTitle } = useParams();
  const decodedBrigadeName = decodeURIComponent(brigadeName);
  const decodedVacancyTitle = decodeURIComponent(vacancyTitle);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    patronymic: '',
    birth_date: '',
    military_unit: '',
    rank: '',
    position: '',
    mos: '',
    email: '',
    phone: '',
    comment: '',
    agreement: false,
    documents: null,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const profile = res.data;

        // Форматування дати народження для input[type=date]
        let formattedBirthDate = '';
        if (profile.birth_date) {
          formattedBirthDate = profile.birth_date.split('T')[0];
        }

        setUserData(profile);

        setFormData({
          first_name: profile.first_name || '',
          last_name: profile.last_name || '',
          patronymic: profile.patronymic || '',
          birth_date: formattedBirthDate,
          military_unit: profile.military_unit || '',
          rank: profile.rank || '',
          position: profile.position || '',
          mos: profile.mos || '',
          email: profile.email || '',
          phone: profile.phone || '',
          comment: '',
          agreement: false,
          documents: null,
        });

        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Помилка завантаження профілю');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'file') {
      setFormData(prev => ({ ...prev, [name]: files }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.first_name || !formData.last_name || !formData.email || !formData.agreement) {
      alert('Будь ласка, заповніть усі обов’язкові поля та підтвердіть згоду на обробку даних.');
      return;
    }

    // Тут можна додати логіку відправки заявки на сервер з formData

    setSubmitted(true);
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div>Завантаження профілю...</div>;
  if (error) return <div>{error}</div>;

  if (submitted) {
    return (
      <div className="apply-page">
        <h2>Дякуємо за подання заявки!</h2>
        <p>Ваша заявка на посаду <strong>{decodedVacancyTitle}</strong> в бригаді <strong>{decodedBrigadeName}</strong> успішно надіслана.</p>
        <button onClick={handleBack}>Повернутися назад</button>
      </div>
    );
  }

  return (
    <div className="apply-page">
      <h2>Подати заявку</h2>
      <p>Посада: <strong>{decodedVacancyTitle}</strong></p>
      <p>Бригада: <strong>{decodedBrigadeName}</strong></p>

      <form onSubmit={handleSubmit} className="apply-form" encType="multipart/form-data">
        <label>
          Ім’я:* 
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Прізвище:* 
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          По батькові:
          <input
            type="text"
            name="patronymic"
            value={formData.patronymic}
            onChange={handleChange}
          />
        </label>

        <label>
          Дата народження:
          <input
            type="date"
            name="birth_date"
            value={formData.birth_date}
            onChange={handleChange}
          />
        </label>

        <label>
          Військова частина:
          <input
            type="text"
            name="military_unit"
            value={formData.military_unit}
            onChange={handleChange}
          />
        </label>

        <label>
          Звання:
          <input
            type="text"
            name="rank"
            value={formData.rank}
            onChange={handleChange}
          />
        </label>

        <label>
          Посада:
          <input
            type="text"
            name="position"
            value={formData.position}
            onChange={handleChange}
          />
        </label>

        <label>
          ВОС:
          <input
            type="text"
            name="mos"
            value={formData.mos}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:* 
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Телефон:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </label>

        <label>
          Коментар:
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </label>

        <label>
          Додаткові документи (pdf, doc, jpg): 
          <input
            type="file"
            name="documents"
            onChange={handleChange}
            multiple
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
        </label>

        <label className="agreement-label">
          <input
            type="checkbox"
            name="agreement"
            checked={formData.agreement}
            onChange={handleChange}
            required
          />
          Я даю згоду на обробку персональних даних*
        </label>

        <button type="submit">Надіслати заявку</button>
        <button type="button" onClick={handleBack} className="cancel-button">Скасувати</button>
      </form>
    </div>
  );
};

export default ApplyPage;
