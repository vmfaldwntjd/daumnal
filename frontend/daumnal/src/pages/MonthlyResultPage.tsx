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
  const { year, month } = location.state || {};
  const [diaryData, setDiaryData] = useState<DiaryData[]>([]);
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_MOCK_SERVER}/diaries/emotions?year=${year}&month=${month}`);
        const json = await response.json();
        if (json.code === 200) {
          setDiaryData(json.data.diaryEmotions);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchData();
  }, [year, month]);

  const toggleEmotion = (emotion: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]
    );
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '월별 일기 감정 점수',
      },
    },
  };

  const emotions = ['fear', 'surprise', 'angry', 'sadness', 'neutral', 'hapiness', 'disgust'];

  const data = {
    labels: diaryData.map((data) => `Day ${data.diaryDay}`),
    datasets: selectedEmotions.map((emotion) => ({
      label: emotion,
      data: diaryData.map((data) => data[emotion] / 100),
      borderColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
      backgroundColor: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    })),
  };

  return (
    <div className='h-screen w-full p-12'>
      <div className='w-full h-full bg-white rounded-xl shadow-lg p-5'>
        <div>
          {emotions.map((emotion) => (
            <button key={emotion} onClick={() => toggleEmotion(emotion)} style={{margin: "5px"}}>
              {emotion}
            </button>
          ))}
        </div>
        <Line options={options} data={data} />
      </div>
    </div>
  );
};

export default EmotionGraph;
