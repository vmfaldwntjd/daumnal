// 플레이리스트 목록 컴포넌트
import React, { useState, useCallback, useEffect } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import styled from 'styled-components';
import CreatePlaylistModal from '../modal/CreatePlaylistModal';
import PlaylistCard from './PlaylistCard';

interface PlaylistListProps {
  onPlaylistSelect: (playlistId: number) => void;
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

const PlaylistList: React.FC<PlaylistListProps> = ({ onPlaylistSelect }) => {
  // 생성 모달 상태 변수
  const [isOpenCreateModal, setOpenCreateModal] = useState<boolean>(false);
  // 플레이리스트 목록 상태 변수
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  // 플레이리스트 생성 모달 열고 닫는 함수
  const handleCreatePlaylist = useCallback(() => {
    setOpenCreateModal(!isOpenCreateModal); // setOpenCreateModal 함수 호출하여 isOpenCreateModal 상태 토글
  }, [isOpenCreateModal]); // 배열에 있는 값들이 변경될 때에만 새로운 함수 생성

  // 플레이리스트 목록 요청
  useEffect(() => {
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists`)
      .then(response => {
        // console.log('플레이리스트 목록 요청 성공!', response.data);
        if (response.data.code === 200) {
          // console.log(`${response.data.status}: ${response.data.message}`);
          setPlaylists(response.data.data.playlists);
        } else {
          // console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        // console.log('플레이리스트 목록 요청 오류 발생!', error);
      });
  }, [isOpenCreateModal]);

  return (
    <div className="flex flex-col items-center">
      <Wrapper>
        <p className="text-5xl">플레이리스트</p>
        {/* 플레이리스트 생성 모달 */}
        <Modal>
          {isOpenCreateModal && (
            <CreatePlaylistModal onClickToggleModal={handleCreatePlaylist} />
          )}
        </Modal>
        {/* 플레이리스트 생성 모달 버튼 */}
        <Button onClick={handleCreatePlaylist}>만들기</Button>
      </Wrapper>
      {/* 플레이리스트 목록 */}
      <Playlists>
        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist.playlistId}
            playlistId={playlist.playlistId}
            playlistName={playlist.playlistName}
            playlistCoverUrl={playlist.playlistCoverUrl}
            onPlaylistClick={onPlaylistSelect}
          />
        ))}
      </Playlists>
    </div>
  );
};

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-between;
  margin-top: 35px;
  margin-bottom: 22.5px;
`;

const Modal = styled.div`
  z-index: 2;
`;

const Playlists = styled.div`
  width: 90%;
  height: 85vh;
  overflow-y: auto;
  background-color: #F8F6EE;
  display: flex;
  flex-wrap: wrap;
  gap: 50px;
  padding: 53px;
  border-top-left-radius: 10px;
  border-top-right-radius: 5px;
  z-index: 1;
`;

const Button = styled.button`
  width: 90px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(156, 155, 150, 0.5);
  background-color: #FFF1DD;
  font-size: large;
`;

export default PlaylistList;
