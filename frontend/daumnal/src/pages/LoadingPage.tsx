// 로딩 페이지
import React from 'react';
import styled from 'styled-components';
import CharacterCard from '../components/music/CharacterCard';

const Characters = styled.div`
  display: flex;
  justify-content: space-around;
`;

const LoadingPage: React.FC = () => {
  return (
    <div className="p-9">
      <p className="text-4xl mb-7">- - - - - 일기 내용 감정 분석 중 - - - - -</p>
    </div>
  );
};

export default LoadingPage;