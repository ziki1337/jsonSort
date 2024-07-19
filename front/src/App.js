import React, { useState } from 'react';
import axios from 'axios';
import InputMask from 'react-input-mask';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateNumber = (number) => {
    return !number || /^[0-9\-]+$/.test(number);
  };

  const formatNumber = (number) => {
    // Форматирование номера с дефисами
    if (!number) return '';
    return number
      .replace(/\D/g, '') // Удаление всех не числовых символов
      .match(/.{1,2}/g) // Разделение строки на группы по 2 символа
      .join('-'); // Объединение групп с дефисами
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Обновление ошибок
    setEmailError('');
    setNumberError('');
    setError(null);

    // Валидация инпутов
    let valid = true;
    if (!validateEmail(email)) {
      setEmailError('Неверный формат email');
      valid = false;
    }
    if (!validateNumber(number)) {
      setNumberError('Номер должен состоять из чисел');
      valid = false;
    }

    if (!valid) {
      return;
    }

    try {
      // Здесь происходит подключение к бэкенду
      const response = await axios.get('http://localhost:2727/module-sort', {
        params: { email, number }
      });
      setData(response.data);
      setError(null);
    } catch (err) {
      setError('Не найдено');
      setData([]);
    }
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
        </div>
        <div>
          <label>Number (optional):</label>
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          {numberError && <p className="error">{numberError}</p>}
        </div>
        <button type="submit">Submit</button>
      </form>
      {error && <p>{error}</p>}
      {data.length > 0 && (
        <div>
          <h3>Results:</h3>
          {data.map((item, index) => (
            <div key={index}>
              <p>Email: {item.email}</p>
              <p>Number: {formatNumber(item.number)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;