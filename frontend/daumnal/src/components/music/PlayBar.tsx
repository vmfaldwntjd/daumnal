import React, { useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faBackward, faPlay, faPause, faForward } from '@fortawesome/free-solid-svg-icons';

const PlayBar: React.FC = () => {
  const playerRef = useRef<ReactPlayer>(null); // ReactPlayer 컴포넌트에 대한 Ref를 생성합니다.
  const [playing, setPlaying] = useState<boolean>(true); // 현재 재생 상태를 저장하는 상태 변수를 생성하고 기본값으로 true를 설정합니다.
  const [looping, setLooping] = useState<boolean>(false); // 루프 상태를 저장하는 상태 변수를 생성하고 기본값으로 false를 설정합니다.
  const [playlist, setPlaylist] = useState<string[]>([ // 재생할 음악의 URL을 저장하는 상태 변수를 생성합니다.
    'https://youtu.be/x_9850WmI0o?si=4iudShcvAWm5Ucis',
    'https://youtu.be/e48ycyNnts8?si=NCE0UcTmB606PUIs',
    'https://youtu.be/Q-BycrqDhPU?si=OMMyYoZrZ_fATV0h'
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0); // 현재 재생 중인 음악의 인덱스를 저장하는 상태 변수를 생성하고 기본값으로 0을 설정합니다.
  const [playedSeconds, setPlayedSeconds] = useState<number>(0); // 현재 재생 중인 노래의 재생 시간을 저장하는 상태 변수를 생성합니다.
  const [duration, setDuration] = useState<number>(0); // 현재 재생 중인 노래의 총 재생 시간을 저장하는 상태 변수를 생성합니다.

  const handlePlayPause = () => { // 재생/일시정지 동작을 수행하는 함수를 정의합니다.
    setPlaying((prevPlaying) => !prevPlaying); // 재생 상태를 토글합니다.
  };

  const handlePrevious = () => { // 이전 곡으로 이동하는 동작을 수행하는 함수를 정의합니다.
    const newIndex = (currentSongIndex - 1 + playlist.length) % playlist.length; // 이전 곡의 인덱스를 계산합니다.
    setCurrentSongIndex(newIndex); // 현재 재생 중인 곡을 변경합니다.
  };

  const handleNext = () => { // 다음 곡으로 이동하는 동작을 수행하는 함수를 정의합니다.
    const newIndex = (currentSongIndex + 1) % playlist.length; // 다음 곡의 인덱스를 계산합니다.
    setCurrentSongIndex(newIndex); // 현재 재생 중인 곡을 변경합니다.
  };

  const handleLoop = () => { // 루프 상태를 토글하는 동작을 수행하는 함수를 정의합니다.
    setLooping((prevLooping) => !prevLooping); // 루프 상태를 토글합니다.
  };

  const handleProgress = (state: { playedSeconds: number, played: number }) => { // 재생 중인 노래의 프로그레스를 처리하는 함수를 정의합니다.
    setPlayedSeconds(state.playedSeconds); // 현재 재생 중인 노래의 재생 시간을 업데이트합니다.
  };

  const handleSeek = (value: number) => { // 컨트롤 바를 이동하여 노래의 재생 위치를 변경하는 함수를 정의합니다.
    if (playerRef.current) {
      playerRef.current.seekTo(value); // ReactPlayer 컴포넌트의 seekTo 메서드를 사용하여 재생 위치를 변경합니다.
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef} // Ref를 설정합니다.
        url={playlist[currentSongIndex]} // 현재 재생 중인 곡의 URL을 설정합니다.
        playing={playing} // 재생 상태를 설정합니다.
        controls={false} // 기본 컨트롤러를 사용하지 않도록 설정합니다.
        loop={looping} // 루프 상태를 설정합니다.
        width="0" // 화면에 보이지 않도록 설정합니다.
        height="0" // 화면에 보이지 않도록 설정합니다.
        onPlay={() => setPlaying(true)} // 재생 시 재생 상태를 업데이트합니다.
        onPause={() => setPlaying(false)} // 일시 정지 시 재생 상태를 업데이트합니다.
        onEnded={() => handleNext()} // 곡이 끝날 때 다음 곡으로 이동합니다.
        onProgress={handleProgress} // 재생 중인 노래의 프로그레스를 처리합니다.
        onDuration={(duration) => setDuration(duration)} // 노래의 총 재생 시간을 설정합니다.
      />
      <div className='w-full flex gap-5'> {/* Flex 박스로 버튼들을 정렬합니다. */}
        <button onClick={handlePrevious}><FontAwesomeIcon className="text-2xl" icon={faBackward} /></button> {/* 이전 곡 버튼을 생성하고 FontAwesomeIcon으로 아이콘을 설정합니다. */}
        <button onClick={handleLoop}><FontAwesomeIcon className="text-2xl" icon={faRepeat} /></button> {/* 루프 버튼을 생성하고 FontAwesomeIcon으로 아이콘을 설정합니다. */}
        {playing ? ( // 재생 중일 때와 정지 상태일 때 각각 다른 버튼을 렌더링합니다.
          <button onClick={handlePlayPause}><FontAwesomeIcon className="text-2xl" icon={faPause} /></button> // 재생 중일 때는 일시 정지 아이콘을 렌더링합니다.
        ) : (
          <button onClick={handlePlayPause}><FontAwesomeIcon className="text-2xl" icon={faPlay} /></button> // 정지 상태일 때는 재생 아이콘을 렌더링합니다.
        )}
        <button onClick={handleNext}><FontAwesomeIcon className="text-2xl" icon={faForward} /></button> {/* 다음 곡 버튼을 생성하고 FontAwesomeIcon으로 아이콘을 설정합니다. */}
      </div>
      <div>
        {formatTime(playedSeconds)} / {formatTime(duration)} {/* 현재 재생 중인 노래의 시간과 총 재생 시간을 표시합니다. */}
        <input
          type="range"
          min={0}
          max={1}
          step="any"
          value={playedSeconds / duration || 0}
          onChange={(e) => handleSeek(parseFloat(e.target.value))}
        />
      </div>
    </div>
  );
};

const formatTime = (seconds: number): string => { // 재생 시간을 포맷하는 함수를 정의합니다.
  const minutes = Math.floor(seconds / 60); // 분을 계산합니다.
  const remainingSeconds = Math.floor(seconds % 60); // 초를 계산합니다.
  return `${minutes}:${String(remainingSeconds).padStart(2, '0')}`; // 포맷된 시간을 반환합니다.
};

export default PlayBar; // PlayBar 컴포넌트를 내보냅니다.
