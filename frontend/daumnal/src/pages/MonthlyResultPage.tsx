import React, { useState, useEffect, useRef } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation, useNavigate } from 'react-router-dom';
import EmotionButton from '../components/EmotionButton';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface DiaryData {
  diaryDay: number;
  [key: string]: any;
}

const EmotionGraph = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedYear, selectedMonth } = location.state || {};
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_SERVER}/diaries/emotions?year=${selectedYear}&month=${selectedMonth}`);
        const json = await response.json();
        if (json.code === 200) {
          setDiaryData(json.data.diaryEmotions);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [selectedYear, selectedMonth]);

  const buttonContainerRef = useRef<HTMLDivElement>(null);
  const [buttonContainerSize, setButtonContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateSize = () => {
      if (buttonContainerRef.current) {
        setButtonContainerSize({
          width: buttonContainerRef.current.offsetWidth,
          height: buttonContainerRef.current.offsetHeight,
        });
      }
    };
    window.addEventListener('resize', updateSize);
    updateSize(); // 초기 사이즈 측정
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    console.log(`선택된 년도: ${selectedYear}, 선택된 월: ${selectedMonth}`);
  }, [selectedYear, selectedMonth]);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    );
  };

  const options = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 2.5,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  // 감정 순서 변경
  const emotions = ['happiness', 'sadness', 'angry', 'fear', 'disgust', 'surprise', 'neutral'];

  // 각 감정에 대한 색상 지정
  const emotionColors = {
    'happiness': '#F4F75A',
    'sadness': '#72AFFF',
    'angry': '#FF7B76',
    'fear': '#B97A19',
    'disgust': '#00AF7E',
    'surprise': '#CC9CFF',
    'neutral': '#ADADAD'
  };

  const data = {
    labels: diaryData.map((data) => `${data.diaryDay}일`),
    datasets: selectedEmotions.length > 0 ? selectedEmotions.map((emotion) => ({
      label: emotion,
      data: diaryData.map((data) => data[emotion] / 100),
      borderColor: emotionColors[emotion as keyof typeof emotionColors],
      backgroundColor: emotionColors[emotion as keyof typeof emotionColors],
    })) : [{
      label: '',
      data: diaryData.map(() => 0), // 데이터가 없으므로 null을 반환합니다.
      borderColor: 'rgba(0, 0, 0, 0)', // 투명한 색상
      backgroundColor: 'rgba(0, 0, 0, 0)', // 투명한 색상
    }],
  };

  return (
    <div className='h-screen w-full p-12'>
      <div className='relative w-full pt-1 pb-1 px-6 bg-white rounded-xl shadow-lg flex flex-col justify-center m-auto'>
        {/* 뒤로 가기 버튼 추가 */}
        <button
          onClick={() => navigate('/calendar', { state: { selectedYear, selectedMonth } })} // navigate 함수를 사용하여 이전 페이지로 이동
          className="absolute top-5 left-5 bg-gray-200 p-2 rounded-full"
        >
          뒤로 가기
        </button>
      <h2 className="text-center mb-6 text-base pt-2 px-4 lg:text-xl">
        {`${selectedYear || '년도'}년 ${selectedMonth || '월'}월`}
      </h2>
        <div
            className='w-full h-full mb-6' // 그래프 컨테이너
            style={{
              width: 'calc(100% * 0.863)', // 부모 너비의 약 86.3%
              height: 'calc(100% * 0.595)', // 부모 높이의 약 59.5%
              margin: 'auto' // 중앙 정렬
            }}
          >
          <Line options={options} data={data} />
        </div>
        <div className="text-center mb-4"> {/* 감정 선택 안내 문구 */}
          <h2 className="text-xl pt-1 font-semibold">원하는 감정을 선택해주세요.</h2>
        </div>
        <div className='flex flex-wrap justify-center items-center gap-4' // 감정 버튼 그룹
          ref={buttonContainerRef}
          style={{
            width: '92.16%',
            height: '13.94%',
            margin: 'auto',
            backgroundColor: '#FFF9ED', 
            borderRadius: '10px', 
            padding: '20px', 
            display: 'flex', // flexbox 디스플레이 설정
            justifyContent: 'space-around', // 버튼 사이의 공간을 균등하게 분배
            alignItems: 'center', // 버튼을 세로 중앙에 배치
            flexWrap: 'wrap' // 필요한 경우 다음 줄로 넘김
          }}
        >
          {emotions.map((emotion) => (
            <EmotionButton
              key={emotion}
              emotion={emotion}
              isSelected={selectedEmotions.includes(emotion)}
              toggleEmotion={toggleEmotion}
              containerSize={buttonContainerSize}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionGraph;
