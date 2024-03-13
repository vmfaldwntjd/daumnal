import React, { useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faCompactDisc } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  padding: 10px;
  margin: 10px 0px;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MusicInfo = styled.div`
  width: 310px;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  gap: 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 35px;
`;

interface MusicCardProps {
  // playlistName: string;
  // playlistCoverUrl: string;
  musicId: number;
  musicYoutubeId: string;
  musicTitle: string;
  musicSingerName: string;
  musicCoverUrl: string | null;
  musicLyrics: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ musicId, musicYoutubeId, musicTitle, musicSingerName, musicCoverUrl, musicLyrics }) => {
  const defaultImageUrl = '/image/playlist_default.png';

  const handlePlaylistClick = (playlistId: number) => () => {
    alert(`${playlistId}번 플레이리스트 수정/삭제 모달 띄우기!`);
  }

  const handlePlayMusic = (musicId: number) => () => {
    alert(`${musicId}번 노래 재생!`);  // 콜백 함수 호출
  }

  return (
    <div>
      <Container>
        {/* 앨범 이미지 */}
        <img className="w-20"
          src={musicCoverUrl || defaultImageUrl}
          alt="앨범 커버 이미지"
        />
        <Wrapper>
          <MusicInfo>
            {/* 노래 제목 */}
            <p className="text-xl">{musicTitle}</p>
            {/* 아티스트 이름 */}
            <p className="text-base">{musicSingerName}</p>
          </MusicInfo>
          <Buttons>
            {/* 노래 재생 버튼 */}
            <button className="text-3xl" onClick={handlePlayMusic(musicId)}><FontAwesomeIcon icon={faPlay} /></button>
            {/* 플레이리스트 추가/삭제 모달 버튼 */}
            <button className="text-3xl" onClick={handlePlaylistClick(musicId)}><FontAwesomeIcon icon={faCompactDisc} /></button>
          </Buttons>
        </Wrapper>
      </Container>
      <hr />
    </div>
  );
};

export default MusicCard;
