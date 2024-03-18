// 플레이리스트 목록 컴포넌트
import React from 'react';
import styled from 'styled-components';
import PlaylistCard from './PlaylistCard';

interface PlaylistListProps {
  onPlaylistSelect: (id: number) => void;
}

const PlaylistList: React.FC<PlaylistListProps> = ({ onPlaylistSelect }) => {
  // 가상의 플레이리스트 데이터
  const playlists = [
    { playlistId: 1, playlistName: 'Playlist 1', playlistCoverUrl: null },
    { playlistId: 2, playlistName: 'Playlist 2', playlistCoverUrl: null },
    { playlistId: 3, playlistName: 'Playlist 3', playlistCoverUrl: null },
    { playlistId: 4, playlistName: 'Playlist 4', playlistCoverUrl: null },
    { playlistId: 5, playlistName: 'Playlist 5', playlistCoverUrl: null },
    { playlistId: 6, playlistName: 'Playlist 6', playlistCoverUrl: null },
    { playlistId: 7, playlistName: 'Playlist 7', playlistCoverUrl: null },
    { playlistId: 8, playlistName: 'Playlist 8', playlistCoverUrl: null },
  ]

  // 플레이리스트 생성 모달 띄우는 함수
  const handleCreatePlaylist = () => {
    alert("플레이리스트 생성 모달 띄우기!");
  }

  return (
    <div className="flex flex-col items-center">
      <Wrapper>
        <p className="text-5xl">플레이리스트</p>
        <Button onClick={handleCreatePlaylist}>만들기</Button>
      </Wrapper>
      {/* 플레이리스트 목록 */}
      <Playlists>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.playlistId}
            playlistId={playlist.playlistId}
            playlistName={playlist.playlistName}
            playlistCoverUrl={playlist.playlistCoverUrl}
            onPlaylistClick={onPlaylistSelect}
          />
        ))}
      </Playlists>
    </div>
  );
};

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 22.5px;
`;

const Playlists = styled.div`
  width: 90%;
  height: 85vh;
  overflow-y: auto; /* 세로 스크롤 추가 */
  background-color: #F8F6EE;
  font-family: 'NanumSquare';
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  padding: 53px;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(156, 155, 150, 0.5);
  background-color: #FFF1DD;
  font-size: large;
`;

export default PlaylistList;
