import React, { useState, useEffect, useRef } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
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

const CalendarComponent: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Value | null>(new Date());
  const [selectedDay, setSelectedDay] = useState<Number>(new Date().getDate())
  const [selectedMonth, setSelectedMonth] = useState<Number>(new Date().getMonth() + 1)
  const [selectedYear, setSelectedYear] = useState<Number>(new Date().getFullYear())

  const monthOfActiveDate = moment(isDate(selectedDate) ? selectedDate : new Date()).format('YYYY-MM');
  const [activeMonth, setActiveMonth] = useState(monthOfActiveDate);

  const [diaryList, setDiaryList] = useState<DiaryEntry[]>([]);

  const getActiveMonth = (activeStartDate: moment.MomentInput) => {
    const newActiveMonth = moment(activeStartDate).format('YYYY-MM');
    setActiveMonth(newActiveMonth);
  };

  function isDate(date: Value | null): date is Date {
    return date instanceof Date;
  }

  useEffect(() => {
    console.log(activeMonth);

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

  }, [activeMonth])


  const addContent = ({date}: any) => {

    const day = moment(date).date(); // 현재 날짜의 '일' 부분 추출
    const monthYearOfDate = moment(date).format('YYYY-MM'); // 날짜의 '년-월' 부분 추출

    // 선택된 날짜가 현재 활성화된 월과 같지 않다면 아무것도 반환하지 않음
    if (monthYearOfDate !== activeMonth) {
      return null; // 혹은 필요에 따라 다른 값을 반환할 수 있음
    }

    console.log('day',day)
    const contentForDay = diaryList.find(diary => diary.diaryDay === day);

    if (contentForDay) {
      console.log('cd', contentForDay)
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
    ); // 일치하는 항목이 없으면 아무것도 표시하지 않음
  };


  return (
    <div className='w-full h-full'>
        <Calendar 
        onChange={setSelectedDate} 
        value={selectedDate}
        tileContent={addContent}
        onActiveStartDateChange={({activeStartDate}) =>
      getActiveMonth(activeStartDate)}
        formatDay={(locale, date) => moment(date).format("D")} />
    </div>
  );
}

export default CalendarComponent;