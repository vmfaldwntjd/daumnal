import React from 'react';

interface DailyEmotionButtonProps {
  emotion: string;
  handleEmotionClick: (emotion: string) => void;
  modalSize: { width: number; height: number };
}

const DailyEmotionButton: React.FC<DailyEmotionButtonProps & { isSelected: boolean }> = ({ emotion, handleEmotionClick, modalSize, isSelected }) => {
  // isSelected 상태를 기반으로 이미지 URL 결정
  const imageUrl = isSelected ? `/image/${emotion}.png` : `/image/${emotion}_face.png`;

  // 모달 크기에 따른 버튼 크기 비율 계산
  const buttonWidth = isSelected ? 137 : 62; // 버튼 누른 후와 누르기 전의 너비
  const buttonHeight = 63; // 버튼의 높이는 고정

  // 모달 크기에 따른 버튼 크기를 px 단위로 계산
  const scaledWidth = (buttonWidth / 737) * modalSize.width; // 기준 모달 너비 대비 비율 계산
  const scaledHeight = (buttonHeight / 898) * modalSize.height; // 기준 모달 높이 대비 비율 계산

  return (
    <button onClick={() => handleEmotionClick(emotion)} style={{ margin: '0 32px' }}>
      <img src={imageUrl} alt={emotion} style={{ width: `${scaledWidth}px`, height: `${scaledHeight}px` }} />
    </button>
  );
};

export default DailyEmotionButton;