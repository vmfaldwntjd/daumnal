// 플레이리스트 상세 내부 단일 노래 컴포넌트
import React, { useState, useCallback, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import MusicInfoModal from '../modal/MusicInfoModal';

interface MusicCardProps {
  musicId: number;
  musicYoutubeId: string;
  musicTitle: string;
  musicSingerName: string;
  musicCoverUrl: string | null;
  musicLyrics: string;
}

const MusicCard: React.FC<MusicCardProps> = ({ musicId, musicTitle, musicSingerName, musicCoverUrl }) => {
  // 기본 이미지 지정
  const defaultImageUrl = '/image/playlist_default.png';
  // 모달 열려 있는지 확인
  const [isOpenMusicModal, setOpenMusicModal] = useState<boolean>(false);
  // 모달 참조를 위한 useRef
  const modalRef = useRef<HTMLDivElement>(null);
  // 선택한 노래 id
  const [selectedMusicId, setSelectedMusicId] = useState<number | null>(null);

  // 클릭한 노래 재생하는 함수
  const handlePlayMusic = (musicId: number) => () => {
    alert(`${musicId}번 노래 재생!`);  // 콜백 함수 호출
  }

  // 노래 추가/삭제할 플레이리스트 선택 모달 열고 닫는 토글
  const handlePlaylistClick = useCallback((musicId: number) => {
    setSelectedMusicId(musicId);
    setOpenMusicModal(!isOpenMusicModal);
  }, [isOpenMusicModal]);

  // 노래 추가/삭제할 플레이리스트 선택 모달 닫기
  const handleCloseMusicModal = useCallback(() => {
    setOpenMusicModal(false);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // 모달 외부를 클릭했을 때 모달 닫기
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        handleCloseMusicModal();
      }
    }
    // 모달 외부를 클릭한 이벤트 핸들러 등록
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // 컴포넌트 언마운트 시 이벤트 핸들러 제거
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleCloseMusicModal]);

  return (
    <div>
      <Container>
        {/* 앨범 이미지 */}
        <img className="w-16 ml-2"
          src={musicCoverUrl || defaultImageUrl}
          alt="앨범 커버 이미지"
        />
        {/* 노래 정보 */}
        <Wrapper>
          <MusicInfo className="font-NanumSquare">
            {/* 노래 제목 */}
            <p className="text-xl">{musicTitle}</p>
            {/* 아티스트 이름 */}
            <p className="text-base">{musicSingerName}</p>
          </MusicInfo>
          {/* 컨트롤 버튼 */}
          <Buttons>
            {/* 노래 재생 버튼 */}
            <button className="text-2xl text-[#776B5D]" onClick={handlePlayMusic(musicId)}><FontAwesomeIcon icon={faPlay} /></button>
            {/* 플레이리스트 추가/삭제 모달 */}
            {isOpenMusicModal && (
              <MusicModalContainer ref={modalRef}>
                <MusicInfoModal onClickToggleModal={handleCloseMusicModal} selectedMusicId={selectedMusicId} />
              </MusicModalContainer>
            )}
            {/* 플레이리스트 추가/삭제 모달 버튼 */}
            <button className="text-2xl" onClick={() => handlePlaylistClick(musicId)}>
              {isOpenMusicModal ? (<img className="w-[32px]" src="./image/playlist_icon_edit.png" />) : (<img className="w-[30px]" src="./image/playlist_icon.png" />)}
            </button>
          </Buttons>
        </Wrapper>
      </Container>
      {/* 구분선 */}
      <hr className="border-neutral-200" />
    </div>
  );
};

const Container = styled.div`
  position: relative;
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

const MusicModalContainer = styled.div`
  position: absolute;
  bottom: -8px;
  right: 75px;
  z-index: 1;
`;

export default MusicCard;
