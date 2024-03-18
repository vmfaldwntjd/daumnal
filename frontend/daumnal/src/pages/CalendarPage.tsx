import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarComponent from '../components/diary/CalendarPage/Calendar';

const CalendarPage: React.FC = () => {
  
  const navigate = useNavigate(); 

  const today: Date = new Date()
  const [year, setYear] = useState<Number>(today.getMonth() + 1)
  const [month, setMonth] = useState<Number>(today.getFullYear())
  const [day, setDay] = useState<number>(today.getDate())

  const handleButtonClick = () => {
    navigate('/monthlyresultpage', { state: { year, month } });
  };

  return (
    <div className='h-full w-full p-12 '>
    <div className='relative w-full p-6 bg-white rounded-xl shadow-lg'>   
      <button onClick={handleButtonClick} className='absolute right-6 top-6 border text-sm py-2 px-2 border-button_border bg-bg_button rounded-lg lg:text-lg lg:px-4'>월별 감정 분석</button>
     <div className='w-full h-full'>
      <CalendarComponent/>
     </div>
    </div>
    </div>




  )
};

export default CalendarPage;