// 플레이리스트 상세 컴포넌트
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import MusicCard from './MusicCard';
import PlaylistControlModal from '../modal/PlaylistControlModal';

interface PlaylistDetailProps {
  selectedPlaylistId: number | null;
  setSelectedPlaylistId: (id: number | null) => void;
  onMusicSelect: (id: number) => void;
  playlistId: number;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({ playlistId, selectedPlaylistId, setSelectedPlaylistId }) => {
  // 기본 이미지 지정
  const defaultImageUrl = '/image/playlist_default.png';
  // 모달 열려 있는지 확인
  const [isOpenInfoModal, setOpenInfoModal] = useState<boolean>(false);
  // 모달 참조를 위한 useRef
  const modalRef = useRef<HTMLDivElement>(null);

  // 가상의 playlistId 플레이리스트 데이터
  const playlist = {
    playlistName: "매일의 조각",
    playlistCoverUrl: null
  }

  // 가상의 playlistId 내부 노래 데이터
  const musics = [
    {
      musicId: 1,
      musicYoutubeId: "234232",
      musicTitle: "11:11",
      musicSingerName: "태연",
      musicCoverUrl: null,
      musicLyrics: "It’s 11:11\n오늘이 한 칸이 채 안 남은 그런 시간\n우리 소원을 빌며 웃던 그 시간\n별 게 다 널 떠오르게 하지\n",
    },
    {
      musicId: 2,
      musicYoutubeId: "16784",
      musicTitle: "Lovesick Girls",
      musicSingerName: "BLACKPINK",
      musicCoverUrl: null,
      musicLyrics: "Lovesick girls\nLovesick girls\n영원한 밤\n창문 없는 방에 우릴 가둔 love (love)\nWhat can we say?\n매번 아파도 외치는 love (love)\n"
    },
    {
      musicId: 3,
      musicYoutubeId: "234232",
      musicTitle: "About Summer",
      musicSingerName: "이루리",
      musicCoverUrl: null,
      musicLyrics: "It’s 11:11\n오늘이 한 칸이 채 안 남은 그런 시간\n우리 소원을 빌며 웃던 그 시간\n별 게 다 널 떠오르게 하지\n",
    },
    {
      musicId: 4,
      musicYoutubeId: "16784",
      musicTitle: "Nerdy Love",
      musicSingerName: "pH-1, 백예린",
      musicCoverUrl: null,
      musicLyrics: "Lovesick girls\nLovesick girls\n영원한 밤\n창문 없는 방에 우릴 가둔 love (love)\nWhat can we say?\n매번 아파도 외치는 love (love)\n"
    },
    {
      musicId: 5,
      musicYoutubeId: "234232",
      musicTitle: "소행성",
      musicSingerName: "레인보우 노트",
      musicCoverUrl: null,
      musicLyrics: "It’s 11:11\n오늘이 한 칸이 채 안 남은 그런 시간\n우리 소원을 빌며 웃던 그 시간\n별 게 다 널 떠오르게 하지\n",
    },
    {
      musicId: 6,
      musicYoutubeId: "16784",
      musicTitle: "밤양갱",
      musicSingerName: "비비",
      musicCoverUrl: null,
      musicLyrics: "Lovesick girls\nLovesick girls\n영원한 밤\n창문 없는 방에 우릴 가둔 love (love)\nWhat can we say?\n매번 아파도 외치는 love (love)\n"
    }
  ]

  // 플레이리스트 목록 컴포넌트로 교체하는 함수
  const handleModifySelectedPlaylistId = () => {
    // 선택된 플레이리스트가 없는 상태로 만들어서 플레이리스트 목록 컴포넌트가 보여지도록
    setSelectedPlaylistId(null);
  };

  // 모달 열기/닫기 토글
  const handleInfoPlaylist = useCallback((playlistId: number) => {
    setSelectedPlaylistId(playlistId);
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

  return (
    <div className="flex flex-col items-center">
      {/* 플레이리스트 정보 */}
      <Wrapper>
        <Top>
          {/* 플레이리스트 목록 컴포넌트 전환을 위한 클릭 이벤트 핸들러 */}
          <button className="self-end text-4xl mb-[150px]" onClick={handleModifySelectedPlaylistId}><FontAwesomeIcon icon={faAngleLeft} /></button>
          {/* 플레이리스트 이미지 */}
          <img className="w-48"
            src={playlist.playlistCoverUrl || defaultImageUrl}
            alt="플레이리스트 커버 이미지"
          />
          {/* 플레이리스트 수정/삭제 모달 */}
          {isOpenInfoModal && (
            <PlaylistModalContainer ref={modalRef}> {/* 모달을 위한 ref 추가 */}
              <PlaylistControlModal onClickToggleModal={handleClosePlaylistModal} selectedPlaylistId={selectedPlaylistId} />
            </PlaylistModalContainer>
          )}
          <button className="relative z-1 self-end text-3xl mb-[155px] ml-[15px]" onClick={() => handleInfoPlaylist(playlistId)}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
        </Top>
        {/* 플레이리스트 이름 */}
        <p className="font-NanumSquare text-2xl mt-2 mb-3">{playlist.playlistName}</p>
      </Wrapper>
      {/* 노래 목록 */}
      <Musics>
        {musics.map((music) => (
          <MusicCard
            key={music.musicId}
            // playlistName={playlist.playlistName}
            // playlistCoverUrl={playlist.playlistCoverUrl}
            musicId={music.musicId}
            musicYoutubeId={music.musicYoutubeId}
            musicTitle={music.musicTitle}
            musicSingerName={music.musicSingerName}
            musicCoverUrl={music.musicCoverUrl}
            musicLyrics={music.musicLyrics}
            // onMusicClick={onMusicSelect}
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
  height: 61vh;
  overflow-y: auto; /* 세로 스크롤 추가 */
  background-color: #F8F6EE;
  display: flex;
  flex-direction: column;
  padding: 10px 10px 0px 10px;
`;

export default PlaylistDetail;
