// 플레이리스트 목록 내부 단일 플레이리스트 컴포넌트
import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  width: 220px;
  height: 280px;
  background-color: #FDFBF8;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  cursor: pointer;
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
  onPlaylistClick: (id: number) => void; // 콜백 함수의 유형 정의
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlistId, playlistName, playlistCoverUrl, onPlaylistClick }) => {
  // 기본 이미지 지정
  const defaultImageUrl = '/image/playlist_default.png';

  // 해당 플레이리스트 수정/삭제 모달 띄우는 함수
  const handleEditClick = (playlistId: number) => () => {
    alert(`${playlistId}번 플레이리스트 수정/삭제 모달 띄우기!`);  // 콜백 함수 호출
  }

  // 클릭한 플레이리스트 상세 컴포넌트로 교체하는 함수
  const handleMovePlaylist = (playlistId: number) => () => {
    onPlaylistClick(playlistId);  // 콜백 함수 호출
  }

  return (
    <Container>
      {/* 커버 이미지 */}
      <button onClick={handleMovePlaylist(playlistId)}>
        <img
          src={playlistCoverUrl || defaultImageUrl}
          alt="플레이리스트 커버 이미지"
        />
      </button>
      <Wrapper>
        {/* 플레이리스트 이름 */}
        <button className="self-start" onClick={handleMovePlaylist(playlistId)}>{playlistName}</button>
        {/* 플레이리스트 수정/삭제 버튼 */}
        <button className="self-end text-xl -mb-3" onClick={handleEditClick(playlistId)}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
      </Wrapper>
    </Container>
  );
};

export default PlaylistCard;
