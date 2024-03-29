// 플레이리스트 페이지
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import MusicPlay from '../components/music/MusicPlay';
import PlaylistList from '../components/music/PlaylistList';
import PlaylistDetail from '../components/music/PlaylistDetail';

const PlaylistPage: React.FC = () => {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [nowMusicId, setNowMusicId] = useState<number | null>(null);
  const [nowPlaylistId, setNowPlaylistId] = useState<number | null>(null);
  const [changeMusicId, setChangeMusicId] = useState<number | null>(null);
  const [changePlaylistId, setChangePlaylistId] = useState<number | null>(null);

  // 선택한 플레이리스트 상세 컴포넌트로 교체하는 함수
  const handlePlaylistSelect = (id: number) => {
    setSelectedPlaylistId(id);
  };

  useEffect(() => {
    setChangeMusicId(nowMusicId)
    setChangePlaylistId(nowPlaylistId)
  }, [nowMusicId, nowPlaylistId])

  return (
    <div className='flex'>
      <LeftBox>
        {/* 플레이리스트 선택 상태에 따라서 */}
        {selectedPlaylistId !== null ? (
          // 플레이리스트 상세 컴포넌트 렌더링
          <PlaylistDetail 
            selectedPlaylistId={selectedPlaylistId} 
            setSelectedPlaylistId={setSelectedPlaylistId}
            playlistId={selectedPlaylistId}
            setNowMusicId={setNowMusicId}
            setNowPlaylistId={setNowPlaylistId}
          />
        ) : (
          // 플레이리스트 목록 컴포넌트 렌더링
          <PlaylistList onPlaylistSelect={handlePlaylistSelect} />
        )}
      </LeftBox>
      <RightBox>
        {/* 노래 재생 */}
        <MusicPlay
          changeMusicId={changeMusicId}
          changePlaylistId={changePlaylistId}
        />
      </RightBox>
    </div>
  );
};

const LeftBox = styled.div`
  width: calc(70%);
  height: 100%;
`;

const RightBox = styled.div`
  width: calc(30%);
  height: 100%;
  background-color: #FFFCF7;
`;

export default PlaylistPage;