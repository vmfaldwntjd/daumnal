// 플레이리스트 목록 내부 단일 플레이리스트
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Container = styled.button`
  width: 220px;
  height: 280px;
  background-color: #FDFBF8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 10px;
`;

interface PlaylistCardProps {
  playlistId: number;
  playlistName: string;
  playlistCoverUrl: string | null;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlistId, playlistName, playlistCoverUrl }) => {
  const defaultImageUrl = '/image/playlist_default.png';

  const handlePlaylistClick = (playlistId: number) => () => {
    alert(`${playlistId}번 플레이리스트 수정/삭제 모달 띄우기!`);
  }

  const handleMovePlaylist = (playlistId: number) => () => {
    alert(`${playlistId}번 플레이리스트 상세 컴포넌트 보여주기!`);
  }

  return (
    <Container onClick={handleMovePlaylist(playlistId)}>
      {/* 커버 이미지 */}
      <img
        src={playlistCoverUrl || defaultImageUrl}
        alt="플레이리스트 커버 이미지"
      />
      <Wrapper>
        {/* 플레이리스트 이름 */}
        <p className="self-start">{playlistName}</p>
        {/* 플레이리스트 수정/삭제 버튼 */}
        <button className="self-end -mb-3" onClick={handlePlaylistClick(playlistId)}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      </Wrapper>
    </Container>
  );
};

export default PlaylistCard;
