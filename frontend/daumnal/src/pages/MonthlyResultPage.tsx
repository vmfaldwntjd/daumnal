import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { useLocation } from 'react-router-dom';
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

  const emotions = ['fear', 'surprise', 'angry', 'sadness', 'neutral', 'hapiness', 'disgust'];

  const data = {
    labels: diaryData.map((data) => `${data.diaryDay}일`),
    datasets: selectedEmotions.map((emotion) => ({
      label: emotion,
      data: diaryData.map((data) => data[emotion] / 100),
      borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    })),
  };

  return (
    <div className='h-screen w-full p-12'>
      <div className='relative w-full pt-6 pb-1 px-6 bg-white rounded-xl shadow-lg flex flex-col justify-center m-auto'>
      <h2 className="text-center mb-6 text-base py-2 px-4 lg:text-xl">
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
        <div className='flex flex-wrap justify-center'> {/* 감정 버튼 그룹 */}
          {emotions.map((emotion) => (
            <button key={emotion} onClick={() => toggleEmotion(emotion)} style={{ margin: "5px" }}>
              {emotion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionGraph;