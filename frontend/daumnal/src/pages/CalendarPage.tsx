import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CalendarPage: React.FC = () => {
  const navigate = useNavigate(); 

  const today: Date = new Date()
  const thisMonth:Number = today.getMonth() + 1
  const thisYear:Number = today.getFullYear();

  const [year, setYear] = useState<Number>(thisYear)
  const [month, setMonth] = useState<Number>(thisMonth)

  const handleButtonClick = () => {
    navigate('/monthlyresultpage', { state: { year, month } });
  };

  return (
    <div>
      <button onClick={handleButtonClick}>월별 감정 분석</button>
    </div>
  )
};

export default CalendarPage;