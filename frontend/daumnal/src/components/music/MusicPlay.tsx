// 플레이리스트 페이지 우측 노래 재생
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'NanumSquare';
`;

const Wrapper = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: 'NanumSquare';
`;

const MusicPlay: React.FC = () => {
  return (
    <Container>
      <p className="text-2xl mb-4">노래 제목</p>
      <p className="text-xl mb-8">아티스트</p>
      <img className="w-72 mb-8 rounded-full" src="/image/playlist_default.png" alt="앨범 커버" />
      <Wrapper>
        <p className="mb-4">재생바</p>
        <p>반복재생버튼 조작버튼 가사모달버튼</p>
      </Wrapper>
    </Container>
  );
};

export default MusicPlay;