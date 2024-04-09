// 노래 담기/빼기 모달
import React, { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreatePlaylistModal from './CreatePlaylistModal';
import Swal from 'sweetalert2';

interface MusicInfoModalProps {
  onClickToggleModal: () => void;
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
  selected: boolean;
}

const MusicInfoModal: React.FC<MusicInfoModalProps> = ({ selectedMusicId }) => {
  // 플레이리스트 생성 모달 상태 변수
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  // 플레이리스트 목록 상태 변수
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  // 선택된 플레이리스트 목록 상태 변수
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);

  // 플레이리스트 생성 모달 열고 닫는 함수
  const handleCreatePlaylist = useCallback(() => {
    setOpenCreateModal(!isOpenCreateModal); // setOpenCreateModal 함수 호출하여 isOpenCreateModal 상태 토글
  }, [isOpenCreateModal]); // 배열에 있는 값들이 변경될 때에만 새로운 함수 생성

  // 체크리스트 선택 핸들러
  const handlePlaylistSelect = (playlistId: number, playlistName: string) => {
    // 선택된 플레이리스트 목록에 포함되어 있는지 확인
    const isSelected = selectedPlaylists.includes(playlistId);
    
    if (isSelected) {
      removeMusicFromPlaylist(playlistId, playlistName);
    } else {
      addMusicToPlaylist(playlistId, playlistName);
    }
  };

  // 노래를 플레이리스트에 추가하는 요청
  const addMusicToPlaylist = (playlistId: number, playlistName: string) => {
    axiosInstance.post<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${playlistId}/musics/${selectedMusicId}`, { musicId: selectedMusicId })
    .then(response => {
      // console.log('노래를 플레이리스트에 추가하는 요청 성공!', response.data);
      Swal.fire({
        position: "bottom-start",
        text: `${playlistName}에 노래를 추가했습니다`,
        showConfirmButton: false,
        timer: 1000
      });
      setSelectedPlaylists(prevState => [...prevState, playlistId]) // 선택된 플레이리스트에 추가
    })
    .catch(error => {
      // console.log('노래를 플레이리스트에 추가하는 요청 실패!', error);
    });
  };

  // 플레이리스트에서 노래를 삭제하는 요청
  const removeMusicFromPlaylist = (playlistId: number, playlistName: string) => {
    axiosInstance.delete<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${playlistId}/musics/${selectedMusicId}`)
      .then(response => {
        // console.log('플레이리스트에서 노래를 삭제하는 요청 성공!', response.data);
        Swal.fire({
          position: "bottom-start",
          text: `${playlistName}에서 노래를 삭제했습니다`,
          showConfirmButton: false,
          timer: 1000
        });
        setSelectedPlaylists(prevState => prevState.filter(id => id !== playlistId)); // 선택된 플레이리스트에서 삭제
      })
      .catch(error => {
        // console.log('플레이리스트에서 노래를 삭제하는 요청 실패!', error);
      });
  };

  // 노래 담고 뺄 수 있는 플레이리스트 목록 요청
  useEffect(() => {
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/musics/${selectedMusicId}/playlists`)
      .then(response => {
        // console.log('해당 노래 추가/삭제 가능한 플레이리스트 정보 요청 성공!', response.data);
        if (response.data.code === 200) {
          // console.log(`${response.data.status}: ${response.data.message}`);
          setPlaylists(response.data.data.playlists);
          // isSelected가 true인 모든 플레이리스트를 선택된 플레이리스트로 설정
          const selectedPlaylistIds = response.data.data.playlists
            .filter((playlist: Playlist) => playlist.selected)
            .map((playlist: Playlist) => playlist.playlistId);
          setSelectedPlaylists(selectedPlaylistIds);
        } else {
          // console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        // console.log('해당 노래 추가/삭제 가능한 플레이리스트 정보 요청 실패!', error);
      });
  }, [isOpenCreateModal]);

  return (
    <div className="text-left text-[#776B5D] z-1">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 플레이리스트 목록 */}
        <div className="font-NanumSquare">
          {/* 플레이리스트 목록 체크리스트 */}
          {playlists.map(playlist => (
            <PlaylistItem
              key={playlist.playlistId}
              onClick={() => handlePlaylistSelect(playlist.playlistId, playlist.playlistName)}
            >
              {selectedPlaylists.includes(playlist.playlistId) ? (
                <FontAwesomeIcon className="text-[15px]" icon={faSquareCheck} />
              ) : (
                <FontAwesomeIcon className="text-[15px]" icon={faSquare} />
              )}
              <span className="ml-1">{playlist.playlistName}</span>
            </PlaylistItem>
          ))}
        </div>
        {/* 새 플레이리스트 생성 모달 */}
        {isOpenCreateModal && (
          <CreatePlaylistModalContainer>
            <CreatePlaylistModal onClickToggleModal={handleCreatePlaylist} />
          </CreatePlaylistModalContainer>
        )}
        {/* 새 플레이리스트 생성 모달 버튼 */}
        <button className="flex items-center h-[15px] text-[15px] mt-[10px]" onClick={handleCreatePlaylist}>
          <span><FontAwesomeIcon icon={faPlus} /></span>
          <span className="font-NanumSquare mb-[3px]">&nbsp;새 플레이리스트</span>
        </button>
      </ModalContent>
    </div>
  );
};

const ModalContent = styled.div`
  max-height: 94px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 0.5px solid #efefef;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  border-radius: 5px;
  padding: 2px 8px;
  overflow-y: auto;
  font-size: 16px;
`;

const PlaylistItem = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 15px;
  margin-top: 6px;
`;

const CreatePlaylistModalContainer = styled.div`
  z-index: 2;
`;

export default MusicInfoModal;