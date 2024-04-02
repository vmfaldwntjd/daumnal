// 플레이리스트 상세 컴포넌트
import React, { useState, useCallback, useRef, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import MusicCard from './MusicCard';
import PlaylistControlModal from '../modal/PlaylistControlModal';
import axiosInstance from '../../pages/api/axiosInstance';

interface PlaylistDetailProps {
  selectedPlaylistId: number | null;
  setSelectedPlaylistId: (id: number | null) => void;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  nowMusicId: number | null;
  setNowPlaylistId: Dispatch<SetStateAction<number | null>>;
  setNowMusicId: Dispatch<SetStateAction<number | null>>;
  musics: Musics[];
  setMusics: Dispatch<SetStateAction<Musics[]>>;
}

interface Musics {
  musicId: number;
  musicYoutubeId: string;
  musicTitle: string;
  musicSingerName: string;
  musicCoverUrl: string;
  musicLyrics: string;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({ selectedPlaylistId, setSelectedPlaylistId, playing, setPlaying, nowMusicId, setNowPlaylistId, setNowMusicId, musics, setMusics }) => {
  // 기본 이미지 지정
  const defaultImageUrl = '/image/playlist_default.png';
  // 모달 열려 있는지 확인
  const [isOpenInfoModal, setOpenInfoModal] = useState<boolean>(false);
  // 모달 참조를 위한 useRef
  const modalRef = useRef<HTMLDivElement>(null);
  // 플레이리스트 이름
  const [playlistName, setPlaylistName] = useState<string>('');
  // 플레이리스트 커버 이미지 경로
  const [playlistCoverUrl, setPlaylistCoverUrl] = useState<string>('');

  // 플레이리스트 목록 컴포넌트로 교체하는 함수
  const handleModifySelectedPlaylistId = () => {
    // 선택된 플레이리스트가 없는 상태로 만들어서 플레이리스트 목록 컴포넌트가 보여지도록
    setSelectedPlaylistId(null);
  };

  // 모달 열기/닫기 토글
  const handleInfoPlaylist = useCallback((selectedPlaylistId: number | null) => {
    setSelectedPlaylistId(selectedPlaylistId);
    setOpenInfoModal(!isOpenInfoModal);
  }, [isOpenInfoModal]);

  // 모달 닫기
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

  // 플레이리스트 정보 요청
  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${selectedPlaylistId}`)
      .then(response => {
        // console.log('플레이리스트 정보 요청 성공!', response.data);
        if (response.data.code === 200) {
          setPlaylistName(response.data.data.playlistName);
          setPlaylistCoverUrl(response.data.data.playlistCoverUrl);
        } else {
          // console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        // console.log('플레이리스트 정보 요청 오류 발생!', error);
      });
  }, []);

  // 플레이리스트 노래 목록 요청
  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${selectedPlaylistId}/musics`)
      .then(response => {
        // console.log('플레이리스트 내부 노래 목록 요청 성공!', response.data);
        if (response.data.code === 200) {
          setMusics(response.data.data.musics);
        } else {
          // console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        // console.log('플레이리스트 내부 노래 목록 요청 오류 발생!', error);
      });
  }, []);

  return (
    <div className="flex flex-col items-center">
      {/* 플레이리스트 정보 */}
      <Wrapper>
        <Top>
          {/* 플레이리스트 목록 컴포넌트 전환을 위한 클릭 이벤트 핸들러 */}
          <button className="self-end text-4xl mb-[150px]" onClick={handleModifySelectedPlaylistId}><FontAwesomeIcon icon={faAngleLeft} /></button>
          {/* 플레이리스트 이미지 */}
          <img className="h-[190px]"
            src={playlistCoverUrl || defaultImageUrl}
            alt="플레이리스트 커버 이미지"
          />
          {/* 플레이리스트 수정/삭제 모달 */}
          {isOpenInfoModal && (
            <PlaylistModalContainer ref={modalRef}>
              <PlaylistControlModal onClickToggleModal={handleClosePlaylistModal} selectedPlaylistId={selectedPlaylistId} />
            </PlaylistModalContainer>
          )}
          {/* 플레이리스트 수정/삭제 모달 버튼 */}
          <button className="relative z-1 self-end text-3xl mb-[155px] ml-[15px]" onClick={() => handleInfoPlaylist(selectedPlaylistId)}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
        </Top>
        {/* 플레이리스트 이름 */}
        <p className="font-NanumSquare text-2xl mt-2 mb-3">{playlistName}</p>
      </Wrapper>
      {/* 노래 목록 */}
      <Musics>
        {musics.map((music) => (
          <MusicCard
            key={music.musicId}
            musicId={music.musicId}
            musicYoutubeId={music.musicYoutubeId}
            musicTitle={music.musicTitle}
            musicSingerName={music.musicSingerName}
            musicCoverUrl={music.musicCoverUrl}
            musicLyrics={music.musicLyrics}
            selectedPlaylistId={selectedPlaylistId}
            setNowMusicId={setNowMusicId}
            setNowPlaylistId={setNowPlaylistId}
            playing={playing}
            setPlaying={setPlaying}
            nowMusicId={nowMusicId}
            musics={musics}
            setMusics={setMusics}
          />
        ))}
      </Musics>
    </div>
  );
};

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 7px;
  z-index: 1;
`;

const PlaylistModalContainer = styled.div`
  position: absolute;
  z-index: 2;
  right: 47%;
`;

const Top = styled.div`
  width: 77%;
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
`;

const Musics = styled.div`
  width: 70%;
  height: 60vh;
  overflow-y: auto;
  background-color: #F8F6EE;
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-right: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

export default PlaylistDetail;
