import React from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import MusicPlay from '../components/music/MusicPlay';
import PlaylistList from '../components/music/PlaylistList';
import PlaylistDetail from '../components/music/PlaylistDetail';

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
        <Routes>
          {/* 플레이리스트 목록 */}
          <Route path="/" element={<PlaylistList />} />
          {/* 플레이리스트 상세 */}
          <Route path="/:playlistId" element={<PlaylistDetail />} />
        </Routes>
      </LeftBox>
      <RightBox>
        {/* 노래 재생 */}
        <MusicPlay />
      </RightBox>
    </div>
  );
};

export default PlaylistListPage;