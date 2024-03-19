// 플레이리스트 페이지 우측 노래 재생
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faBackward, faPlay, faPause, faForward, faFileLines } from '@fortawesome/free-solid-svg-icons';

const MusicPlay: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null); // ReactPlayer 컴포넌트에 대한 Ref 생성
  const [playing, setPlaying] = useState<boolean>(false); // 현재 재생 상태를 저장하는 상태 변수(기본값 false)
  const [looping, setLooping] = useState<boolean>(false); // 루프 상태를 저장하는 상태 변수(기본값 false)
  const [playlist, setPlaylist] = useState<string[]>([ // 재생할 음악의 URL을 저장하는 상태 변수
    'https://youtu.be/x_9850WmI0o?si=4iudShcvAWm5Ucis',
    'https://youtu.be/e48ycyNnts8?si=NCE0UcTmB606PUIs',
    'https://youtu.be/Q-BycrqDhPU?si=OMMyYoZrZ_fATV0h',
    'https://youtu.be/AIEakY2cRvs?si=5rFr0LZ9H3zWkxlp'
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0); // 현재 재생 중인 음악의 인덱스를 저장하는 상태 변수(기본값 0)
  const [playedSeconds, setPlayedSeconds] = useState<number>(0); // 현재 재생 중인 노래의 재생 시간을 저장하는 상태 변수
  const [duration, setDuration] = useState<number>(0); // 현재 재생 중인 노래의 총 재생 시간을 저장하는 상태 변수

  // 재생/정지 버튼 함수
  const handlePlayPause = () => { 
    setPlaying((prevPlaying) => !prevPlaying); // 재생 상태 토글
  };

  // 이전 곡으로 이동하는 함수
  const handlePrevious = () => {
    const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // 이전 곡의 인덱스 계산
    setCurrentSongIndex(newIndex); // 현재 재생 중인 곡 변경
  };

  // 다음 곡으로 이동하는 함수
  const handleNext = () => {
    const newIndex = (currentSongIndex + 1) % playlist.length; // 다음 곡의 인덱스 계산
    setCurrentSongIndex(newIndex); // 현재 재생 중인 곡 변경
  };

  // 반복재생 버튼 함수
  const handleLoop = () => {
    setLooping((prevLooping) => !prevLooping); // 루프 상태 토글
  };

  // 재생 중인 노래의 재생 시간 측정 함수
  const handleProgress = (state: { playedSeconds: number, played: number }) => {
    setPlayedSeconds(state.playedSeconds); // 현재 재생 중인 노래의 재생 시간 업데이트
  };

  // 컨트롤 바를 이동하여 노래의 재생 위치 변경하는 함수
  const handleSeek = (value: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(value); // ReactPlayer 컴포넌트의 seekTo 메서드를 사용하여 재생 위치 변경
    }
  };

  return (
    <Container>
      {/* 노래 정보 */}
      <p className="text-2xl mb-4">노래 제목</p>
      <p className="text-xl mb-8">아티스트</p>
      <img className="mb-8 w-60 rounded-full" src="/image/playlist_default.png" alt="앨범 커버" />
      {/* 컨트롤박스 */}
      <div>
        <ReactPlayer
          ref={playerRef} // Ref 설정
          url={playlist[currentSongIndex]} // 현재 재생 중인 곡의 URL 설정
          controls={false} // 기본 컨트롤러를 사용하지 않도록 설정
          width="0" // 화면이 보이지 않도록 설정
          height="0" // 화면이 보이지 않도록 설정
          playing={playing} // 재생 상태 설정
          loop={looping} // 루프 상태 설정
          onPlay={() => setPlaying(true)} // 재생 시 재생 상태 업데이트
          onPause={() => setPlaying(false)} // 정지 시 재생 상태 업데이트
          onEnded={() => handleNext()} // 해당 곡이 끝날 때 다음 곡으로 이동
          onProgress={handleProgress} // 재생 중인 노래의 재생 시간 업데이트
          onDuration={(duration) => setDuration(duration)} // 노래의 총 재생 시간 설정
        />
        {/* 커스텀 컨트롤바 */}
        <div className="flex flex-col w-full">
          <Bar
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={playedSeconds / duration || 0}
            progress={playedSeconds / duration || 0} // progress prop 추가
            onChange={(e) => handleSeek(parseFloat(e.target.value))}
          />
          <p className="flex justify-between mt-1">
            <p className="text-sm">{formatTime(playedSeconds)}</p>
            <p className="text-sm">{formatTime(duration)}</p>
          </p>
        </div>
        {/* 컨트롤 버튼 */}
        <div className='w-full flex mt-6 gap-12'>
          {/* 반복재생 */}
          {looping ? (
            <button onClick={handleLoop}><FontAwesomeIcon className="text-3xl text-[#776B5D]" icon={faRepeat} /></button>
          ) : (
            <button onClick={handleLoop}><FontAwesomeIcon className="text-3xl text-stone-400" icon={faRepeat} /></button>
          )}
          {/* 이전 곡 */}
          <button onClick={handlePrevious}><FontAwesomeIcon className="text-3xl text-[#776B5D]" icon={faBackward} /></button>
          {/* 정지/재생 */}
          {playing ? (
            <button onClick={handlePlayPause}><FontAwesomeIcon className="text-3xl text-[#776B5D]" icon={faPause} /></button>
          ) : (
            <button onClick={handlePlayPause}><FontAwesomeIcon className="text-3xl text-[#776B5D]" icon={faPlay} /></button>
          )}
          {/* 다음 곡 */}
          <button onClick={handleNext}><FontAwesomeIcon className="text-3xl text-[#776B5D]" icon={faForward} /></button>
          {/* 가사 모달 */}
          <button><FontAwesomeIcon className="text-[26px] text-[#776B5D]" icon={faFileLines} /></button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'NanumSquare';
`;

interface BarProps {
  progress: number;
}

const Bar = styled.input<BarProps>`
  width: 100%;
  height: 5px;
  cursor: pointer;
  -webkit-appearance: none;
  border-radius: 50px;
  background: 
    linear-gradient(
      to right,
      #776B5D ${(props) => props.progress * 100}%,
      rgba(119, 107, 93, 0.3) ${(props) => props.progress * 70}%);

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    background: #776B5D;
    width: 15px;
    height: 15px;
    border-radius: 50px;
    cursor: pointer;
  };
`;

// 재생 시간 설정 함수
const formatTime = (seconds: number): string => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`;
};

export default MusicPlay;