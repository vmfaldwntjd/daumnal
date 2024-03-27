import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CalendarComponent from '../components/diary/CalendarPage/Calendar';

const CalendarPage: React.FC = () => {
  
  const navigate = useNavigate(); 
  const location = useLocation();
  const state = location.state;

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const handleButtonClick = () => {
    navigate('/monthly-result', { state: { selectedYear, selectedMonth } });
  };


  return (
    <div className='h-full w-full p-12 '>
    <div className='relative w-full pt-2 pb-6 px-6 bg-white rounded-xl shadow-lg'>   
      <button onClick={handleButtonClick} className='absolute right-5 top-5 border text-sm py-2 px-2 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>월별 감정 분석</button>
     <div className='w-full h-full'>
      <CalendarComponent 
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}/>
     </div>
    </div>
    </div>
  )
};

export default CalendarPage;
