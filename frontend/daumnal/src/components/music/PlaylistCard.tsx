import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import PlaylistControlModal from '../modal/PlaylistControlModal';

interface PlaylistCardProps {
  playlistId: number;
  playlistName: string;
  playlistCoverUrl: string | null;
  onPlaylistClick: (playlistId: number) => void;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlistId, playlistName, playlistCoverUrl, onPlaylistClick }) => {
  // 기본 이미지
  const defaultImageUrl = '/image/playlist_default.png';
  // 모달 열려 있는지 확인
  const [isOpenInfoModal, setOpenInfoModal] = useState<boolean>(false);
  // 모달 참조를 위한 useRef
  const modalRef = useRef<HTMLDivElement>(null);
  // 선택한 플레이리스트 id
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);

  // 플레이리스트 클릭 시 해당 ID로 이동
  const handleMovePlaylist = (playlistId: number) => () => {
    onPlaylistClick(playlistId);
  }

  // 수정/삭제 모달 열고 닫는 토글
  const handleInfoPlaylist = useCallback((playlistId: number) => {
    setSelectedPlaylistId(playlistId);
    setOpenInfoModal(!isOpenInfoModal);
  }, [isOpenInfoModal]);

  // 수정/삭제 모달 닫기
  const handleClosePlaylistModal = useCallback(() => {
    setOpenInfoModal(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 모달 외부를 클릭했을 때 모달 닫기
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleClosePlaylistModal();
      }
    }

    // 모달 외부를 클릭한 이벤트 핸들러 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClosePlaylistModal]);
  
  return (
    <Container>
      {/* 플레이리스트 상세 컴포넌트 전환을 위한 클릭 이벤트 핸들러 */}
      <div className="flex items-center justify-center">
        <button onClick={handleMovePlaylist(playlistId)}>
          <img className="h-[200px]"
            src={playlistCoverUrl || defaultImageUrl}
            alt="플레이리스트 커버 이미지"
          />
        </button>
      </div>
      <Wrapper>
        {/* 플레이리스트 이름 */}
        <button className="font-NanumSquare text-left" onClick={handleMovePlaylist(playlistId)}>{playlistName}</button>
        {/* 플레이리스트 수정/삭제 모달 */}
        {isOpenInfoModal && (
          <PlaylistModalContainer ref={modalRef}> {/* 모달을 위한 ref 추가 */}
            <PlaylistControlModal onClickToggleModal={handleClosePlaylistModal} selectedPlaylistId={selectedPlaylistId} />
          </PlaylistModalContainer>
        )}
        {/* 플레이리스트 수정/삭제 모달 버튼 */}
        <button className="self-end text-2xl absolute bottom-1" onClick={() => handleInfoPlaylist(playlistId)}><FontAwesomeIcon className="" icon={faEllipsisVertical} /></button>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
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
  padding-top: 5px;
`;

const PlaylistModalContainer = styled.div`
  position: absolute;
  bottom: -30px;
  right: 23px;
`;

export default PlaylistCard;
