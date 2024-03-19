// 플레이리스트 수정/삭제 모달
import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import EditPlaylistModal from './EditPlaylistModal';

interface PlaylistControlModalProps {
  onClickToggleModal: (playlistId: number) => void; // 모달 토글 함수
  selectedPlaylistId: number | null; // 선택된 플레이리스트 ID
}

const PlaylistControlModal: React.FC<PlaylistControlModalProps> = ({ onClickToggleModal, selectedPlaylistId }) => {
  
  return (
    <div className="text-[#776B5D]">
      <ModalBackdrop>
        <ModalContent onClick={(e) => e.stopPropagation()}>
          <button >수정</button>
          <hr className="mt-1 mb-1" />
          <button>삭제</button>
        </ModalContent>
      </ModalBackdrop>
    </div>
  );
};

const ModalBackdrop = styled.div`
  
`;

const ModalContent = styled.div`
  width: 55px;
  height: 70px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 10px;
  padding: 10px;
`;

export default PlaylistControlModal;
