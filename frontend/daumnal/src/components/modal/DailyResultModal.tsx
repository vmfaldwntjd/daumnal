// 코드 작성
// 도넛 차트의 가운데에 선택된 감정과 해당 감정의 백분율을 표시하는 기능을 추가합니다.

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const ModalContainer = styled.div`
  background: #fff;
  padding: 8px;
  border-radius: 10px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  width: 600px;
  max-height: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ChartWrapper = styled.div`
  // 모달 대비 차트의 폭 비율 계산: 440 / 702
  width: calc(100% * 0.6268);
  // 모달 대비 차트의 높이 비율 계산: 436 / 926.87
  height: calc(100% * 0.4703);
  max-height: calc(90% - 60px); // 제목과 버튼의 높이를 고려하여 계산
  margin: auto; // 중앙 정렬
`;


const ChartTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Button = styled.button`
  margin-top: 20px;
  border: 1px solid #dcdcdc;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 17px;
  &:hover {
    background-color: #ececec;
  }
`;

const EmotionButton = styled.button`
  margin: 5px;
  border: 1px solid #dcdcdc;
  background-color: #f9f9f9;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  &:hover {
    background-color: #ececec;
  }
`;

const EmotionButtonsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

interface EmotionData {
  fear?: number;
  surprise?: number;
  angry?: number;
  sadness?: number;
  neutral?: number;
  happiness?: number;
  disgust?: number;
}

interface DailyResultModalProps {
  onDailyResultModalClose: () => void;
  emotionId?: number;
  diaryDate?: string;
}

interface EmotionColors {
  [key: string]: string;
}

interface EmotionData {
  [key: string]: number | undefined;
}

const emotions = ['happiness', 'sadness', 'angry', 'fear', 'disgust', 'surprise', 'neutral'];

const emotionColors: EmotionColors = {
  'happiness': '#F4F75A',
  'sadness': '#72AFFF',
  'angry': '#FF7B76',
  'fear': '#B97A19',
  'disgust': '#00AF7E',
  'surprise': '#CC9CFF',
  'neutral': '#ADADAD'
};

const DailyResultModal: React.FC<DailyResultModalProps> = ({ onDailyResultModalClose, emotionId }) => {
  const validEmotionId = emotionId || 5342;
  const [emotionData, setEmotionData] = useState<EmotionData>({});

  const fetchEmotionData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_MOCK_SERVER}/diaries/emotions/${validEmotionId}`);
      setEmotionData(response.data.data.diaryEmotion);
    } catch (error) {
      console.error('감정 정보 조회 중 에러가 발생했습니다.', error);
    }
  };

  useEffect(() => {
    fetchEmotionData();
  }, [validEmotionId]);

  const sortedEmotionData = emotions.map(emotion => emotionData[emotion] || 0);
  const sortedEmotionColors = emotions.map(emotion => emotionColors[emotion]);

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);

  const handleEmotionClick = (emotion: string) => {
    setSelectedEmotion(emotion);
  };

  const chartData = {
    labels: emotions,
    datasets: [
      {
        data: sortedEmotionData,
        backgroundColor: sortedEmotionColors,
        borderColor: sortedEmotionColors,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false // 범례를 숨깁니다.
      }
    },
    animation: {
      onComplete: function (this: ChartJS) {
        const ctx = this.ctx;
        const chartArea = this.chartArea;
  
        // 중앙에 텍스트를 그리기 위한 설정
        ctx.save();
        ctx.font = '20px Cafe24Oneprettynight';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
        if (selectedEmotion && emotionData[selectedEmotion] !== undefined) {
          // 'emotionData[selectedEmotion]' 값이 숫자인지 확인합니다.
          const emotionValue = emotionData[selectedEmotion];
          if (typeof emotionValue === 'number') {
            const percentageValue = (emotionValue / 100).toFixed(2); // 소수점 두 자리까지 표시
            const text = `${selectedEmotion}: ${percentageValue}%`;
            ctx.fillText(text, centerX, centerY);
          }
        }        
        ctx.restore();
      },
    },
    cutout: '76%',
    maintainAspectRatio: false, // 차트의 비율 유지를 비활성화하여, 부모 요소에 맞게 크기가 조정되도록 합니다.
  };

  return (
    <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-40 flex justify-center items-center"  > 
      <div className="bg-bg_modal p-8 rounded-xl h-[90%] w-[600px] shadow-lg">
          <ChartTitle className='text-2xl'>2024년 3월 22일 금요일</ChartTitle>
          <ChartWrapper>
            <Doughnut data={chartData} options={chartOptions} />
          </ChartWrapper>
          <EmotionButtonsContainer>
            {emotions.slice(0, 4).map(emotion => (
              <EmotionButton key={emotion} onClick={() => handleEmotionClick(emotion)}>
                {emotion}
              </EmotionButton>
            ))}
          </EmotionButtonsContainer>
          <EmotionButtonsContainer>
            {emotions.slice(4).map(emotion => (
              <EmotionButton key={emotion} onClick={() => handleEmotionClick(emotion)}>
                {emotion}
              </EmotionButton>
            ))}
          </EmotionButtonsContainer>
          <Button onClick={onDailyResultModalClose}>일기로 돌아가기</Button>
      </div>
    </div>
  );
};

export default DailyResultModal;
