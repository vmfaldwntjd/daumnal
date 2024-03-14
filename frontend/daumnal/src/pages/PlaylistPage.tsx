// 플레이리스트 페이지
import React, { useState } from 'react';
import styled from 'styled-components';
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

const PlaylistPage: React.FC = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  // 선택한 플레이리스트 상세 컴포넌트로 교체하는 함수
  const handlePlaylistSelect = (id: number) => {
    setSelectedPlaylistId(id);
  };

  
  const handleMusicSelect = (id: number) => {
    setSelectedMusicId(id);
  };

  return (
    <div className='flex'>
      <LeftBox>
        {/* 플레이리스트 선택 상태에 따라서 */}
        {selectedPlaylistId !== null ? (
          // 플레이리스트 상세 컴포넌트 렌더링
          <PlaylistDetail 
            selectedPlaylistId={selectedPlaylistId} 
            setSelectedPlaylistId={setSelectedPlaylistId} 
            onMusicSelect={handleMusicSelect} 
            playlistId={selectedPlaylistId} 
          />
        ) : (
          // 플레이리스트 목록 컴포넌트 렌더링
          <PlaylistList onPlaylistSelect={handlePlaylistSelect} />
        )}
      </LeftBox>
      <RightBox>
        {/* 노래 재생 */}
        <MusicPlay />
      </RightBox>
    </div>
  );
};

export default PlaylistPage;