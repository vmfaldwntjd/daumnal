import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CalendarComponent from '../components/diary/CalendarPage/Calendar';
import DiaryDetailModal from '../components/modal/DiaryDetailModal';

const CalendarPage: React.FC = () => {
  
  const navigate = useNavigate(); 

  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());

  const [selectedDiary, setSelectedDiary] = useState<Number>(0)

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleButtonClick = () => {
    navigate('/monthly-result', { state: { selectedYear, selectedMonth } });
  };

  useEffect(() => {
    console.log(selectedMonth, selectedYear)
    console.log(selectedDiary)

  }, [selectedMonth, selectedYear, selectedDiary])
  

  return (
    <div className='h-screen w-full p-12 '>
    <div className='relative w-full py-2 px-6 bg-white rounded-xl shadow-lg'>   
      <button onClick={handleButtonClick} className='absolute right-6 top-6 border text-sm py-2 px-2 border-button_border bg-bg_button rounded-lg lg:text-lg lg:px-4'>월별 감정 분석</button>
     <div className='w-full h-full'>
      <CalendarComponent 
        setSelectedMonth={setSelectedMonth}
        setSelectedYear={setSelectedYear}
        setSelectedDiary={setSelectedDiary}/>
      <button onClick={() => setIsModalOpen(true)}>일기 상세 보기</button>
     </div>
    </div>
    {isModalOpen && <DiaryDetailModal onClose={() => setIsModalOpen(false)} />}
    </div>
  )
};

export default CalendarPage;