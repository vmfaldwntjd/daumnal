import React from 'react';

interface MonthlyEmotionButtonProps {
  emotion: string;
  isSelected: boolean;
  toggleEmotion: (emotion: string) => void;
  containerSize: { width: number; height: number };
}

const MonthlyEmotionButton: React.FC<MonthlyEmotionButtonProps> = ({ emotion, isSelected, toggleEmotion, containerSize }) => {
  const imageUrl = isSelected ? `/image/${emotion}.png` : `/image/${emotion}_face.png`;

  // 버튼 크기를 컨테이너 크기에 맞게 계산
  const buttonStyle = {
    width: isSelected ? `${containerSize.width * 0.07474}px` : `${containerSize.width * 0.03518}px`,
    // height: `${containerSize.height * 0.9718}px`
  };

  return (
    <button onClick={() => toggleEmotion(emotion)}>
      <img src={imageUrl} alt={emotion} style={buttonStyle} />
    </button>
  );
};

export default MonthlyEmotionButton;
