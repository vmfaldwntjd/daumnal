import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import DiaryDetailModal from '../../modal/DiaryDetailModal';
import moment from 'moment';
import axios from 'axios';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

interface DiaryEntry {
  emotionFirst: string;
  diaryHashTag: string;
  diaryId: number;
  musicId: number;
  diaryDay: number;
}

interface CalendarProps {
  setSelectedMonth: (month: number) => void;
  setSelectedYear: (year: number) => void;
}

const CalendarComponent: React.FC<CalendarProps> = ( {setSelectedMonth, setSelectedYear} ) => {

  const [selectedDate, setSelectedDate] = useState<Value | null>(new Date());
  const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate())

  const monthOfActiveDate = moment(isDate(selectedDate) ? selectedDate : new Date()).format('YYYY-MM');
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isDayClick, setIsDayClick] = useState<boolean>(false)


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
    setSelectedDay(newSelectedDay);
  
    // diaryList에서 selectedDay와 일치하는 일기 찾기
    const foundDiary = diaryList.find(diary => diary.diaryDay === newSelectedDay);
  

    if (foundDiary) {
      setIsDayClick(true)
    } 

  };

  
  useEffect(() => {

    const parts = activeMonth.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10);

    setSelectedYear(year);
    setSelectedMonth(month);

    axios.get('https://b9cf3818-a936-414c-ae32-753e014c0a30.mock.pstmn.io/diaries/calendar')
    // axios.get(`${process.env.REACT_APP_FASTAPI_BASE_URL}/diaries/calendar?year=${year}&month=${month}`)
        .then(response => {
          // console.log(month)
          // console.log(year)

          setDiaryList(response.data.data.calendarContents)
          // console.log(diaryList)

        })
        .catch(error => {
          console.error('캘린더 정보 호출 중 오류 발생:', error);
        });

  }, [activeMonth, setSelectedYear, setSelectedMonth])

  
  useEffect(() => {

    if (isDayClick) {
      setIsModalOpen(true)
    }

  }, [isDayClick])

  useEffect(() => {

    

  }, [diaryList])
  


  const addContent = ({date}: any) => {

    const day = moment(date).date(); // 현재 날짜의 '일' 부분 추출
    const monthYearOfDate = moment(date).format('YYYY-MM'); // 날짜의 '년-월' 부분 추출

    // 선택된 날짜가 현재 활성화된 월과 같지 않다면 아무것도 반환하지 않음
    if (monthYearOfDate !== activeMonth) {
      return null; // 혹은 필요에 따라 다른 값을 반환할 수 있음
    }

    const contentForDay = diaryList.find(diary => diary.diaryDay === day);

    if (contentForDay) {

      // diaryHashTag를 공백으로 분리하고, 각 단어 앞에 #을 붙여서 반환
      const hashtags = contentForDay.diaryHashTag.split(' ').map(tag => `# ${tag}`);
      const emotion = contentForDay.emotionFirst
      return (
        <div className='flex flex-col items-center justify-center'>
        <div className={emotion}>{day}</div> {/* 날짜를 표시하는 부분 */}
        <div className="" > {/* 해시태그를 다음 줄부터 시작 */}
          {hashtags.map((tag, index) => (
            <div className="text-sm" key={index}>{tag}</div>
          ))}
        </div>
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
    {isModalOpen && <DiaryDetailModal 
    onClose={() => { setIsModalOpen(false); setIsDayClick(false); }} 
    // diaryList={diaryList}
    // setSelectedDay={setSelectedDay}
    />}     
    </div>

  );
}

export default CalendarComponent;