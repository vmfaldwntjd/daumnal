// 플레이리스트 수정/삭제 모달
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import EditPlaylistModal from './EditPlaylistModal';

interface PlaylistControlModalProps {
  onClickToggleModal: (playlistId: number) => void;
  selectedPlaylistId: number | null;
}

const PlaylistControlModal: React.FC<PlaylistControlModalProps> = ({ onClickToggleModal, selectedPlaylistId }) => {
  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false);

  // 플레이리스트 수정 모달 열고 닫는 함수
  const handleEditPlaylist = useCallback(() => {
    setOpenEditModal(!isOpenEditModal); // setOpenCreateModal 함수 호출하여 isOpenCreateModal 상태 토글
  }, [isOpenEditModal]); // 배열에 있는 값들이 변경될 때에만 새로운 함수 생성

  return (
    <div className="relative z-1">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {isOpenEditModal && (
          <EditPlaylistModalContainer>
            <EditPlaylistModal onClickToggleModal={handleEditPlaylist} />
          </EditPlaylistModalContainer>
        )}
        <button className="font-NanumSquare mb-[4px]" onClick={handleEditPlaylist}>수정</button>
        <hr className="border-none h-[0.5px] bg-[#efefef]" />
        <button className="font-NanumSquare mt-[6px]">삭제</button>
      </ModalContent>
    </div>
  );
};

const ModalContent = styled.div`
  width: 50px;
  height: 65px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: white;
  border: 0.5px solid #efefef;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 5px;
  font-size: 14px;
`;

const EditPlaylistModalContainer = styled.div`
  position: absolute;
  z-index: 2;
`;

export default PlaylistControlModal;