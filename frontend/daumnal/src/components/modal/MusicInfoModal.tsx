import React, { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreatePlaylistModal from './CreatePlaylistModal';

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
  isSelected: boolean;
}

const MusicInfoModal: React.FC<MusicInfoModalProps> = ({ selectedMusicId }) => {
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);

  const handleCreatePlaylist = useCallback(() => {
    setOpenCreateModal(!isOpenCreateModal);
  }, [isOpenCreateModal]);

  const handlePlaylistSelect = (playlistId: number) => {
    const updatedPlaylists = playlists.map(playlist => {
      if (playlist.playlistId === playlistId) {
        const isSelected = !playlist.isSelected; // isSelected 값을 토글
        if (isSelected) {
          addMusicToPlaylist(playlistId); // 선택된 경우 노래를 플레이리스트에 추가
        } else {
          removeMusicFromPlaylist(playlistId); // 선택이 해제된 경우 노래를 플레이리스트에서 삭제
        }
        return { ...playlist, isSelected };
      }
      return playlist;
    });

    setPlaylists(updatedPlaylists);

    if (selectedPlaylists.includes(playlistId)) {
      setSelectedPlaylists(selectedPlaylists.filter(id => id !== playlistId));
    } else {
      setSelectedPlaylists([...selectedPlaylists, playlistId]);
    }
  };

  const addMusicToPlaylist = (playlistId: number) => {
    axiosInstance.post<ApiResponse>(
      `${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${playlistId}/musics/${selectedMusicId}`,
      { musicId: selectedMusicId }
    )
      .then(response => {
        console.log('노래를 플레이리스트에 추가하는 요청 성공!', response.data);
      })
      .catch(error => {
        console.log('노래를 플레이리스트에 추가하는 요청 실패!', error);
      });
  };

  const removeMusicFromPlaylist = (playlistId: number) => {
    axiosInstance.delete<ApiResponse>(
      `${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${playlistId}/musics/${selectedMusicId}`
    )
      .then(response => {
        console.log('플레이리스트에서 노래를 삭제하는 요청 성공!', response.data);
      })
      .catch(error => {
        console.log('플레이리스트에서 노래를 삭제하는 요청 실패!', error);
      });
  };

  useEffect(() => {
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/musics/${selectedMusicId}/playlists`)
      .then(response => {
        console.log('해당 노래 추가/삭제 가능한 플레이리스트 정보 요청 성공!', response.data);
        if (response.data.code === 200) {
          console.log(`${response.data.status}: ${response.data.message}`);
          const initialPlaylists: Playlist[] = response.data.data.playlists.map((playlist: Playlist) => ({
            ...playlist,
            isSelected: false
          }));
          setPlaylists(initialPlaylists);
        } else {
          console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        console.log('해당 노래 추가/삭제 가능한 플레이리스트 정보 요청 실패!', error);
      });
  }, [isOpenCreateModal]);

  return (
    <div className="text-left text-[#776B5D] z-1">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className="font-NanumSquare">
          {playlists.map(playlist => (
            <PlaylistItem
              key={playlist.playlistId}
              onClick={() => handlePlaylistSelect(playlist.playlistId)}
              selected={playlist.isSelected}
            >
              <FontAwesomeIcon className="text-[20px]" icon={playlist.isSelected ? faSquareCheck : faSquare} />
              <span className="ml-1">{playlist.playlistName}</span>
            </PlaylistItem>
          ))}
        </div>
        {isOpenCreateModal && (
          <CreatePlaylistModalContainer>
            <CreatePlaylistModal onClickToggleModal={handleCreatePlaylist} />
          </CreatePlaylistModalContainer>
        )}
        <button className="flex mt-[6px]" onClick={handleCreatePlaylist}>
          <span className="text-[18px]"><FontAwesomeIcon icon={faPlus} /></span>
          <span className="font-NanumSquare">&nbsp;새 플레이리스트</span>
        </button>
      </ModalContent>
    </div>
  );
};

const ModalContent = styled.div`
  max-height: 185px;
  display: flex;
  flex-direction: column;
  background-color: white;
  border: 0.5px solid #efefef;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  padding: 0px 10px;
  overflow-y: auto;
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
