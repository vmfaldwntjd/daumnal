import React from 'react';
import styled from 'styled-components';
import MusicPlay from '../components/music/MusicPlay';

const LeftBox = styled.div`
  width: calc(70%);
  height: 100%;
`;

const RightBox = styled.div`
  width: calc(30%);
  height: 100%;
  background-color: #FFFCF7;
`;

const PlaylistListPage: React.FC = () => {
  return (
    <div className='flex'>
      <LeftBox>
        {/* 플레이리스트 목록/상세 */}
      </LeftBox>
      <RightBox>
        <MusicPlay />
      </RightBox>
    </div>
  );
};

export default PlaylistListPage;