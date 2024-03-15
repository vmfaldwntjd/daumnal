import React from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate(); 

  const handleButtonClick = () => {
    navigate('/monthly-result');
  };

  return (
    <div>
      <button onClick={handleButtonClick}>월별 감정 분석</button>
    </div>
  )
};

export default CalendarPage;