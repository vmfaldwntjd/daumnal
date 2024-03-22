// 노래 담기/빼기 모달
import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareCheck, faSquare } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CreatePlaylistModal from './CreatePlaylistModal';

interface MusicInfoModalProps {
  onClickToggleModal: (playlistId: number) => void;
  selectedMusicId: number | null;
}

const MusicInfoModal: React.FC<MusicInfoModalProps> = () => {
  // 플레이리스트 생성 모달 상태 변수
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  // 선택된 체크리스트 배열
  const [selectedPlaylists, setSelectedPlaylists] = useState<number[]>([]);
  // 가상의 플레이리스트 목록 데이터
  const data = {
		"playlists": [
			{
				"playlistId": 1,
				"playlistName": "=^._.^=💛",
				"playlistCoverUrl": "url"
			},
			{
				"playlistId": 2,
				"playlistName": "밤양갱도 갱이다",
				"playlistCoverUrl": "url"
			},
      {
				"playlistId": 3,
				"playlistName": "💜wldms",
				"playlistCoverUrl": "url"
			},
			{
				"playlistId": 4,
				"playlistName": "🍊💚",
				"playlistCoverUrl": "url"
			}
    ]
  }

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

  return (
    <div className="text-left text-[#776B5D] z-1">
      <ModalContent onClick={(e) => e.stopPropagation()}>
        {/* 플레이리스트 목록 */}
        <div className="font-NanumSquare">
          {/* 플레이리스트 목록 체크리스트 */}
          {data.playlists.map(playlist => (
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