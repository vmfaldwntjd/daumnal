// 플레이리스트 수정/삭제 모달
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import EditPlaylistModal from './EditPlaylistModal';
import axiosInstance from '../../pages/api/axiosInstance';
import Swal from 'sweetalert2';

interface PlaylistControlModalProps {
  onClickToggleModal: (playlistId: number) => void;
  selectedPlaylistId: number | null;
}

const PlaylistControlModal: React.FC<PlaylistControlModalProps> = ({ selectedPlaylistId }) => {
  // 플레이리스트 수정 모달 상태 변수
  const [isOpenEditModal, setOpenEditModal] = useState<boolean>(false);

  // 플레이리스트 수정 모달 열고 닫는 함수
  const handleEditPlaylist = useCallback(() => {
    setOpenEditModal(!isOpenEditModal); // setOpenCreateModal 함수 호출하여 isOpenCreateModal 상태 토글
  }, [isOpenEditModal]); // 배열에 있는 값들이 변경될 때에만 새로운 함수 생성

  // 플레이리스트 삭제 요청 함수
  const handleDeletePlaylist = useCallback(() => {
    if (selectedPlaylistId !== null) {
      Swal.fire({
        title: "해당 플레이리스트를 삭제하시겠습니까?",
        icon: "question",
        showCancelButton: true,
        cancelButtonText: "취소",
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "삭제"
      }).then((result) => {
        if (result.isConfirmed) {
          axiosInstance.delete(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${selectedPlaylistId}`)
            .then(response => {
              // console.log("플레이리스트 삭제 요청 성공!", response);
              Swal.fire({
                title: "플레이리스트가 삭제되었습니다",
                icon: "success"
              });
              window.location.reload(); // 페이지 새로고침
            })
            .catch(error => {
              // console.error("플레이리스트 삭제 요청 실패!", error);
            });
        }
      });
    }
  }, [selectedPlaylistId]);

  return (
    <div className="relative z-1">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 플레이리스트 정보 수정 모달 */}
        {isOpenEditModal && (
          <EditPlaylistModalContainer>
            <EditPlaylistModal onClickToggleModal={handleEditPlaylist} selectedPlaylistId={selectedPlaylistId} />
          </EditPlaylistModalContainer>
        )}
        {/* 플레이리스트 정보 수정 모달 버튼 */}
        <button className="font-NanumSquare mb-[4px]" onClick={handleEditPlaylist}>수정</button>
        {/* 구분선 */}
        <hr className="border-none h-[0.5px] bg-[#efefef]" />
        {/* 플레이리스트 삭제 확인 */}
        <button className="font-NanumSquare mt-[6px]" onClick={handleDeletePlaylist}>삭제</button>
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