// 노래 담기/빼기 모달
import React, { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreatePlaylistModal from './CreatePlaylistModal';
import { response } from 'express';


interface MusicInfoModalProps {
  onClickToggleModal: (playlistId: number) => void;
  selectedMusicId: number | null;
}

interface ApiResponse {
  data: any;
  code: number;
  status: string;
  message: string;
}

interface Playlist {
  playlistId: number;
  playlistName: string;
  playlistCoverUrl: string;
}

const MusicInfoModal: React.FC<MusicInfoModalProps> = ({ selectedMusicId }) => {
  // 플레이리스트 생성 모달 상태 변수
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  // 플레이리스트 목록 상태 변수
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  // 선택된 체크리스트 배열
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);

  // 플레이리스트 생성 모달 열고 닫는 함수
  const handleCreatePlaylist = useCallback(() => {
    setOpenCreateModal(!isOpenCreateModal); // setOpenCreateModal 함수 호출하여 isOpenCreateModal 상태 토글
  }, [isOpenCreateModal]); // 배열에 있는 값들이 변경될 때에만 새로운 함수 생성

  // 체크리스트 선택 핸들러
  const handlePlaylistSelect = (playlistId: number) => {
    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId)); // 이미 선택된 항목이면 선택 취소
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]); // 선택되지 않은 항목이면 선택 추가
    }
  };

  // 노래 담고 뺄 수 있는 플레이리스트 목록 요청
  useEffect(() => {
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/musics/${selectedMusicId}/playlists`)
      .then(response => {
        console.log('해당 노래 추가/삭제 가능한 플레이리스트 정보 요청 성공!', response.data);
        if (response.data.code === 200) {
          console.log(`${response.data.status}: ${response.data.message}`);
          setPlaylists(response.data.data.playlists);
        } else {
          console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        console.log('해당 노래 추가/삭제 가능한 플레이리스트 정보 요청 실패!', error);
      });
  }, []);

  return (
    <div className="text-left text-[#776B5D] z-1">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 플레이리스트 목록 */}
        <div className="font-NanumSquare">
          {/* 플레이리스트 목록 체크리스트 */}
          {playlists.map(playlist => (
            <PlaylistItem
              key={playlist.playlistId}
              onClick={() => handlePlaylistSelect(playlist.playlistId)}
              selected={selectedPlaylists.includes(playlist.playlistId)}
            >
              {selectedPlaylists.includes(playlist.playlistId) ? (
                <FontAwesomeIcon className="text-[20px]" icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon className="text-[20px]" icon={faSquare} />
              )}
              <span className="ml-1">{playlist.playlistName}</span>
            </PlaylistItem>
          ))}
        </div>
        {/* 구분선 */}
        <hr className="border-none h-[0.8px] bg-[#efefef]" />
        {/* 새 플레이리스트 생성 모달 */}
        {isOpenCreateModal && (
          <CreatePlaylistModalContainer>
            <CreatePlaylistModal onClickToggleModal={handleCreatePlaylist} />
          </CreatePlaylistModalContainer>
        )}
        {/* 새 플레이리스트 생성 모달 버튼 */}
        <button className="flex mt-[6px]" onClick={handleCreatePlaylist}>
          <span className="text-[18px]"><FontAwesomeIcon icon={faPlus} /></span>
          <span className="font-NanumSquare">&nbsp;새 플레이리스트</span>
        </button>
      </ModalContent>
    </div>
  );
};

const ModalContent = styled.div`
  min-width: 120px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 0.5px solid #efefef;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 0px 10px;
`;

const PlaylistItem = styled.div<{ selected: boolean }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 5px 0px;
`;

const CreatePlaylistModalContainer = styled.div`
  z-index: 2;
`;

export default MusicInfoModal;