// 플레이리스트 상세 컴포넌트
import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import MusicCard from './MusicCard';

const Wrapper = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Top = styled.div`
  width: 77%;
  display: flex;
  justify-content: space-between;
  margin-top: 39px;
`;

const Musics = styled.div`
  width: 70%;
  height: 49vh;
  overflow-y: auto; /* 세로 스크롤 추가 */
  background-color: #F8F6EE;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`;

interface PlaylistDetailProps {
  selectedPlaylistId: number | null;
  setSelectedPlaylistId: (id: number | null) => void;
  onMusicSelect: (id: number) => void;
  playlistId: number;
}

const PlaylistDetail: React.FC<PlaylistDetailProps> = ({ playlistId, selectedPlaylistId, setSelectedPlaylistId }) => {
  const defaultImageUrl = '/image/playlist_default.png';

  // 가상의 playlistId 플레이리스트 데이터
  const playlist = {
    playlistName: "사워할 때 듣기 좋은 노래",
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
    }
  ]

  const handleModifySelectedPlaylistId = () => {
    setSelectedPlaylistId(null);
  };

  const handleEditClick = (playlistId: number) => () => {
    alert(`${playlistId}번 플레이리스트 수정/삭제 모달 띄우기!`);
  };

  return (
    <div className="flex flex-col items-center font-NanumSquare">
      {/* 플레이리스트 정보 */}
      <Wrapper>
        <Top>
          {/* 플레이리스트 목록 이동 버튼 */}
          <button className="self-end text-4xl pb-[220px]" onClick={handleModifySelectedPlaylistId}><FontAwesomeIcon icon={faAngleLeft} /></button>
          {/* 플레이리스트 이미지 */}
          <img className="w-64"
            src={playlist.playlistCoverUrl || defaultImageUrl}
            alt="플레이리스트 커버 이미지"
          />
          {/* 플레이리스트 수정/삭제 버튼 */}
          <button className="self-end text-3xl pb-[220px]" onClick={handleEditClick(playlistId)}><FontAwesomeIcon icon={faEllipsisVertical} /></button>
        </Top>
        <p className="text-2xl m-4">{playlist.playlistName}</p>
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

export default PlaylistDetail;
