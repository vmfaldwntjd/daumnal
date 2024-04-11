import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import DiaryDetailModal from '../../modal/DiaryDetailModal';
import moment from 'moment';
import axios from 'axios';
import axiosInstance from '../../../pages/api/axiosInstance';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DiaryEntry {
  emotionFirst: string;
  diaryHashTag: string;
  diaryId: string;
  musicId: string;
  diaryDay: string;
}

interface CalendarProps {
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ( {setSelectedMonth, setSelectedYear} ) => {

  const [selectedDate, setSelectedDate] = useState<Value | null>(new Date());
  const [selectedDiaryDate, setSelectedDiaryDate] = useState<Date | null>(null)

  const monthOfActiveDate = moment(isDate(selectedDate) ? selectedDate : new Date()).format('YYYY-MM');
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);
  const [diaryModalList, setDiaryModalList] = useState<number[][]>([])

  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState<boolean>(false);

  const getActiveMonth = (activeStartDate: moment.MomentInput) => {
    const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
    setActiveMonth(newActiveMonth);
  };

  function isDate(date: Value | null): date is Date {
    return date instanceof Date;
  }


  const handleDayClick = (date: Date) => {

    setSelectedDate(date); // 선택된 날짜를 상태에 설정합니다.

    const newSelectedDay: number = date.getDate();
  
    // diaryList에서 selectedDay와 일치하는 일기 찾기
    const foundDiary = diaryList.find(diary => parseInt(diary.diaryDay, 10) === newSelectedDay);

    if (foundDiary) {
      setIsDiaryModalOpen(true)
      setSelectedDiaryDate(date)
    } 

  };

  
  useEffect(() => {
    if (!isDiaryModalOpen) {
      const parts = activeMonth.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    setSelectedYear(year);
    setSelectedMonth(month);

    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/calendar?year=${year}&month=${month}`)
        .then(response => {
          // console.log(response.data)
          setDiaryList(response.data.data.calendarContents)
        })
        .catch(error => {
          // console.error('캘린더 정보 호출 중 오류 발생:', error);
        });
    }
  }, [activeMonth, setSelectedYear, setSelectedMonth, isDiaryModalOpen])


  useEffect(() => {
    // diaryList의 각 요소에서 diaryDay와 diaryId만 추출하여 새로운 배열을 생성
    // console.log(diaryList)
    const updatedDiaryModalList = diaryList.map(diary => [parseInt(diary.diaryDay, 10), parseInt(diary.diaryId, 10)]);
    
    // 생성된 배열을 diaryModalList 상태에 저장
    setDiaryModalList(updatedDiaryModalList);
    // console.log(diaryModalList)

  }, [diaryList]);
  


  const addContent = ({date}: any) => {

    const day = moment(date).date(); // 현재 날짜의 '일' 부분 추출
    const monthYearOfDate = moment(date).format('YYYY-MM'); // 날짜의 '년-월' 부분 추출

    // 선택된 날짜가 현재 활성화된 월과 같지 않다면 아무것도 반환하지 않음
    if (monthYearOfDate !== activeMonth) {
      return null; // 혹은 필요에 따라 다른 값을 반환할 수 있음
    }

    const contentForDay = diaryList.find(diary => parseInt(diary.diaryDay, 10) === day);


    if (contentForDay) {

      // diaryHashTag를 공백으로 분리하고, 각 단어 앞에 #을 붙여서 반환
      const hashtags = contentForDay.diaryHashTag.split(' ').map(tag => `# ${tag}`);
      const emotion = contentForDay.emotionFirst
      return (
        <div className='flex flex-col items-center justify-center'>
        <div className={emotion}>{day}</div> {/* 날짜를 표시하는 부분 */}
        {contentForDay.diaryHashTag &&
        <div className="" > {/* 해시태그를 다음 줄부터 시작 */}
          {hashtags.map((tag, index) => (
            <div className="text-sm" key={index}>{tag}</div>
          ))}
        </div>
        }
      </div>
      );
    }
    return (
      <div>
         <div className="date-display">{day}</div>
      </div>
    ); 
  };



  return (
    <div>
    <div className='w-full h-full'>
        <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate}
        tileContent={addContent}
        onActiveStartDateChange={({activeStartDate}) => getActiveMonth(activeStartDate)}
        formatDay={(locale, date) => moment(date).format("D")} 
        onClickDay={(value, event) => handleDayClick(value)}/>
    </div> 
    {isDiaryModalOpen && <DiaryDetailModal 
    onDiaryModalClose={() => { setIsDiaryModalOpen(false);  }} 
    diaryModalList={diaryModalList}
    selectedDiaryDate={selectedDiaryDate}
    />}     
    </div>

  );
}

export default CalendarComponent;