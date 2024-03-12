// 플레이리스트 페이지 우측 노래 재생
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faBackward, faBackwardFast, faPlay, faPause, faForward, faForwardFast, faFileLines } from '@fortawesome/free-solid-svg-icons';

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
        {/* 컨트롤박스 */}
        <p className="mb-4">재생바</p>
        <p className="flex w-full justify-around">
          <button><FontAwesomeIcon className="text-2xl" icon={faRepeat} /></button>

          <button><FontAwesomeIcon className="text-2xl" icon={faBackward} /></button>
          <button><FontAwesomeIcon className="text-2xl" icon={faBackwardFast} /></button>

          <button><FontAwesomeIcon className="text-2xl" icon={faPlay} /></button>
          <button><FontAwesomeIcon className="text-2xl" icon={faPause} /></button>

          <button><FontAwesomeIcon className="text-2xl" icon={faForward} /></button>
          <button><FontAwesomeIcon className="text-2xl" icon={faForwardFast} /></button>
          
          <button><FontAwesomeIcon className="text-2xl" icon={faFileLines} /></button>
        </p>
      </Wrapper>
    </Container>
  );
};

export default MusicPlay;