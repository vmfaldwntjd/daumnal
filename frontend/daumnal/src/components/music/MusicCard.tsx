// 플레이리스트 상세 내부 단일 노래 컴포넌트
import React from 'react';
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
  width: 450px;
  display: flex;
  flex-direction: column;
  margin-left: 15px;
  gap: 5px;
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
  // 기본 이미지 지정
  const defaultImageUrl = '/image/playlist_default.png';

  // 해당 노래 추가/삭제할 플레이리스트 정하는 모달 띄우는 함수
  const handlePlaylistClick = (musicId: number) => () => {
    alert(`${musicId}번 노래 추가/삭제할 플레이리스트 설정 모달 띄우기!`);  // 콜백 함수 호출
  }

  // 클릭한 노래 재생하는 함수
  const handlePlayMusic = (musicId: number) => () => {
    alert(`${musicId}번 노래 재생!`);  // 콜백 함수 호출
  }

  return (
    <div>
      <Container>
        {/* 앨범 이미지 */}
        <img className="w-16 ml-2"
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
            <button className="text-2xl" onClick={handlePlayMusic(musicId)}><FontAwesomeIcon icon={faPlay} /></button>
            {/* 플레이리스트 추가/삭제 모달 버튼 */}
            <button className="text-2xl" onClick={handlePlaylistClick(musicId)}><FontAwesomeIcon icon={faCompactDisc} /></button>
          </Buttons>
        </Wrapper>
      </Container>
      {/* 구분선 */}
      <hr className="border-neutral-200" />
    </div>
  );
};

export default MusicCard;
