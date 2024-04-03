// 도넛 차트의 가운데에 선택된 감정과 해당 감정의 백분율을 표시하는 기능을 추가합니다.

import React, { useEffect, useState } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import styled from 'styled-components';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import DailyEmotionButton from '../DailyEmotionButton';
import Swal from 'sweetalert2';

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
  onDiaryModalClose: () => void;
  diaryEmotionId?: string;
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

const emotionImages = {
  happiness: '/image/happiness_face.png',
  sadness: '/image/sadness_face.png',
  angry: '/image/angry_face.png',
  fear: '/image/fear_face.png',
  disgust: '/image/disgust_face.png',
  surprise: '/image/surprise_face.png',
  neutral: '/image/neutral_face.png',
};

const DailyResultModal: React.FC<DailyResultModalProps> = ({ onDailyResultModalClose, onDiaryModalClose, diaryEmotionId, diaryDate }) => {
  const validEmotionId = diaryEmotionId || 5342;
  const [emotionData, setEmotionData] = useState<EmotionData>({});

  const fetchEmotionData = async () => {
    try {
      const response = await axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/emotions/${validEmotionId}`);
      // console.log(response)
      // 서버 응답 구조에 맞게 `setEmotionData`를 수정합니다.
      setEmotionData(response.data.data);
    } catch (error) {
      Swal.fire({
        title: "일별 감정 조회 오류",
        text: "일별 감정 조회에서 오류가 발생했습니다.",
        icon: "error"
      });
    }
  };
  

  useEffect(() => {
    fetchEmotionData();
  }, [validEmotionId]);

  const sortedEmotionData = emotions.map(emotion => emotionData[emotion] || 0);
  const sortedEmotionColors = emotions.map(emotion => emotionColors[emotion]);

  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태를 관리하는 상태

  // 감정 클릭 핸들러
  const handleEmotionClick = (emotion : string) => {
    setSelectedEmotion(emotion);
    setIsModalOpen(true); // 여기서 모달을 열도록 설정
  };

  // 모달 닫기 핸들러
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // 모달 바깥 부분 클릭 핸들러
  const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // 결과 모달을 닫습니다.
    onDailyResultModalClose();
    // 디테일 모달을 닫습니다.
    // 이 기능을 구현하기 위해 부모 컴포넌트로부터 전달 받은 함수를 호출합니다.
    onDiaryModalClose();
  };

  // 모달 컨테이너 클릭 이벤트 핸들러 (이벤트 버블링 방지)
  const handleModalClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
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
        const centerX = (chartArea.left + chartArea.right) / 2;
        const centerY = (chartArea.top + chartArea.bottom) / 2;
    
        if (selectedEmotion && emotionData[selectedEmotion] !== undefined) {
          const emotionValue = emotionData[selectedEmotion];
          if (typeof emotionValue === 'number') {
            const percentageValue = (emotionValue / 100); // 소수점 두 자리까지 표시
            const text = `${percentageValue}%`;
            const imageSrc = emotionImages[selectedEmotion as keyof typeof emotionImages];
    
            // 이미지 로드
            const img = new Image();
            img.onload = function() {
              // 이미지를 그린 후 텍스트 그리기
              const imageX = centerX - img.width / 2;
              const imageY = centerY - img.height / 2 - 30; // 이미지와 텍스트 사이에 간격 조정 (기존 20에서 30으로 변경)
              ctx.drawImage(img, imageX, imageY);
              ctx.font = '30px Cafe24Oneprettynight'; // 폰트 크기를 20px에서 24px로 증가
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillText(text, centerX, centerY + 30); // 이미지 아래에 텍스트 위치 조정 (간격을 더 늘림)
            };
            img.src = imageSrc;
          }
        }        
      },
    },
    cutout: '76%',
    maintainAspectRatio: false, // 차트의 비율 유지를 비활성화하여, 부모 요소에 맞게 크기가 조정되도록 합니다.    
  };

  return (
    <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-40 flex justify-center items-center" onClick={handleOutsideClick}> 
    <div className="bg-bg_modal p-8 rounded-xl h-[90%] w-[600px] shadow-lg" onClick={handleModalClick}>
          <ChartTitle className='text-2xl'>{diaryDate}</ChartTitle>
          <ChartWrapper className='pb-2'>
            <Doughnut data={chartData} options={chartOptions} />
          </ChartWrapper>
          <div className="">
            <div className='flex justify-center gap-20'>
            <EmotionButtonsContainer>
              {emotions.slice(0, 4).map(emotion => (
                <DailyEmotionButton 
                  key={emotion} 
                  emotion={emotion}
                  isSelected={selectedEmotion === emotion} 
                  handleEmotionClick={handleEmotionClick}
                  modalSize={{ width: 600, height: 800 }} // 예시로 너비 600px, 높이 800px을 설정합니다.
                />
              ))}
            </EmotionButtonsContainer>
            </div>
            <div className='flex justify-center gap-20'>
            <EmotionButtonsContainer>
              {emotions.slice(4).map(emotion => (
                <DailyEmotionButton 
                  key={emotion} 
                  emotion={emotion}
                  isSelected={selectedEmotion === emotion}
                  handleEmotionClick={handleEmotionClick}
                  modalSize={{ width: 600, height: 800 }} // 예시로 너비 600px, 높이 800px을 설정합니다.
                />
              ))}
            </EmotionButtonsContainer>
            </div>
          </div>
          <div className='flex justify-center'>
            <button onClick={onDailyResultModalClose} className='mt-8 border text-sm py-2 px-4 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>{`<<`} 일기로 돌아가기</button>
          </div>
      </div>
    </div>
  );
   
};

export default DailyResultModal;
