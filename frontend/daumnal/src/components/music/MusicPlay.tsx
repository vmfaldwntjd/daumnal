// 플레이리스트 페이지 우측 노래 재생
import React, { useRef, useState, useCallback, useEffect, Dispatch, SetStateAction } from 'react';
import styled from 'styled-components';
import ReactPlayer from 'react-player';
import LyricsModal from '../modal/LyricsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRepeat, faBackward, faPlay, faPause, faForward, faFileLines } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../pages/api/axiosInstance';

interface MusicPlayProps {
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  changeMusicId: number | null;
  changePlaylistId: number | null;
  musics: Musics[];
}

interface Musics {
  musicId: number;
  musicYoutubeId: string;
  musicTitle: string;
  musicSingerName: string;
  musicCoverUrl: string;
  musicLyrics: string;
}

interface Music {
  musicId: number;
  musicYoutubeId: string;
  musicTitle: string;
  musicSingerName: string;
  musicCoverUrl: string;
  musicLyrics: string;
}

const MusicPlay: React.FC<MusicPlayProps> = ({ playing, setPlaying, changeMusicId, changePlaylistId, musics }) => {
  const playerRef = useRef<ReactPlayer>(null); // ReactPlayer 컴포넌트에 대한 Ref 생성
  const [looping, setLooping] = useState<boolean>(false); // 루프 상태를 저장하는 상태 변수(기본값 false)
  const [musicIdList, setMusicIdList] = useState<number[]>([]); // 선택한 노래가 있는 플레이리스트 내부 노래들 id 목록
  const [musicYoutubeIdList, setMusicYoutubeIdList] = useState<string[]>([]); // 선택한 노래가 있는 플레이리스트 내부 노래들 id 목록
  const [musicTitleList, setMusicTitleList ] = useState<string[]>([]); // 선택한 노래가 있는 플레이리스트 내부 노래들 제목 목록
  const [musicSingerNameList, setMusicSingerNameList ] = useState<string[]>([]); // 선택한 노래가 있는 플레이리스트 내부 노래들 가수 목록
  const [musicCoverUrlList, setMusicCoverUrlList ] = useState<string[]>([]); // 선택한 노래가 있는 플레이리스트 내부 노래들 커버 사진 목록
  const [musicLyricsList, setMusicLyricsList ] = useState<string[]>([]); // 선택한 노래가 있는 플레이리스트 내부 노래들 가사 목록
  const [currentSongIndex, setCurrentSongIndex] = useState<number>(0); // 현재 재생 중인 음악의 인덱스를 저장하는 상태 변수(기본값 0)
  const [playedSeconds, setPlayedSeconds] = useState<number>(0); // 현재 재생 중인 노래의 재생 시간을 저장하는 상태 변수
  const [duration, setDuration] = useState<number>(0); // 현재 재생 중인 노래의 총 재생 시간을 저장하는 상태 변수
  
  // 가사 모달 상태 변수
  const [isOpenLyricsModal, setOpenLyricsModal] = useState<boolean>(false);

  // 해당 노래 가사 모달 열고 닫는 함수
  const handleLyrics = useCallback(() => {
    setOpenLyricsModal(!isOpenLyricsModal); // setOpenLyricsModal 함수 호출하여 isOpenLyricsModal 상태 토글
  }, [isOpenLyricsModal]); // 배열에 있는 값들이 변경될 때에만 새로운 함수 생성

  // 재생/정지 버튼 함수
  const handlePlayPause = () => { 
    setPlaying((prevPlaying) => !prevPlaying); // 재생 상태 토글
  };

  // 이전 곡으로 이동하는 함수
  const handlePrevious = () => {
    const newIndex = (currentSongIndex - 1 + musicIdList.length) % musicIdList.length; // 이전 곡의 인덱스 계산
    setCurrentSongIndex(newIndex);
  };

  // 다음 곡으로 이동하는 함수
  const handleNext = () => {
    const newIndex = (currentSongIndex + 1) % musicIdList.length; // 다음 곡의 인덱스 계산
    setCurrentSongIndex(newIndex);
  };

  // 반복재생 버튼 함수
  const handleLoop = () => {
    setLooping((prevLooping) => !prevLooping);
  };

  // 재생 중인 노래의 재생 시간 측정 함수
  const handleProgress = (state: { playedSeconds: number, played: number }) => {
    setPlayedSeconds(state.playedSeconds);
  };

  // 컨트롤 바를 이동하여 노래의 재생 위치 변경하는 함수
  const handleSeek = (value: number) => {
    if (playerRef.current) {
      playerRef.current.seekTo(value);
    }
  };

  // 노래 목록을 가져와서 상태를 업데이트하는 함수
  const updateMusicLists = (musics: Music[]) => {
    // 음악 객체 배열을 새로운 형태로 변환하여 새로운 배열 생성
    const musicIds: number[] = [];
    const musicYoutubeIds: string[] = [];
    const musicTitles: string[] = [];
    const musicSingerNames: string[] = [];
    const musicCoverUrls: string[] = [];
    const musicLyrics: string[] = [];

    musics.forEach((music) => {
      musicIds.push(music.musicId);
      musicYoutubeIds.push(music.musicYoutubeId);
      musicTitles.push(music.musicTitle);
      musicSingerNames.push(music.musicSingerName);
      musicCoverUrls.push(music.musicCoverUrl);
      musicLyrics.push(music.musicLyrics);
    });

    // 각 배열을 상태로 업데이트
    setMusicIdList(musicIds);
    setMusicYoutubeIdList(musicYoutubeIds);
    setMusicTitleList(musicTitles);
    setMusicSingerNameList(musicSingerNames);
    setMusicCoverUrlList(musicCoverUrls);
    setMusicLyricsList(musicLyrics);

    // 변경된 플레이리스트의 음악 목록 중에서 현재 재생 중인 음악의 인덱스를 찾아서 설정
    if (changeMusicId !== null) {
      const currentMusicIndex = musicIds.indexOf(changeMusicId);
      if (currentMusicIndex !== -1) {
        setCurrentSongIndex(currentMusicIndex);
      }
    }
  };

  // 노래 목록 요청
  useEffect(() => {
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${changePlaylistId}/musics`)
      .then(response => {
        // console.log('플레이리스트 정보 요청 성공!', response.data);
        if (response.data.code === 200) {
          updateMusicLists(response.data.data.musics);
          setPlaying(true);
        } else {
          // console.log(`${response.data.status}: ${response.data.message}`);
        }
      })
      .catch(error => {
        // console.log('플레이리스트 정보 요청 오류 발생!', error);
      });
  }, [changeMusicId, changePlaylistId, musics]);

  return (
    <Container>
      {/* 노래 정보 */}
      {changeMusicId !== null && changePlaylistId !== null && musics.length !== 0 ? (
        <>
          <p className="text-2xl mb-4">{musicTitleList[currentSongIndex]}</p>
          <p className="text-xl mb-8">{musicSingerNameList[currentSongIndex]}</p>
          <img className="mb-8 w-60 rounded-full" src={musicCoverUrlList[currentSongIndex]} alt="앨범 커버" />
        </>
      ) : (
        <>
          <p className="text-2xl mb-4">노래를 재생해 보세요</p>
          <p className="text-xl mb-8">재생중인 노래가 이곳에 보여집니다</p>
          <img className="mb-8 w-60 rounded-full" src="image/playlist_default.png" alt="기본 앨범 커버" />
        </>
      )}
      {/* 컨트롤박스 */}
      <div>
        <ReactPlayer
          ref={playerRef} // Ref 설정
          url={`https://www.youtube.com/watch?v=${musicYoutubeIdList[currentSongIndex]}`} // 현재 재생 중인 곡의 URL 설정
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
        <div className="flex flex-col w-[320px] mt-3">
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
        <div className='flex justify-between mt-7'>
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
          {isOpenLyricsModal && (
            <LyricsModal lyrics={musicLyricsList[currentSongIndex]} onClickToggleModal={handleLyrics} />
          )}
          {changeMusicId !== null && changePlaylistId !== null ? (
            <button onClick={handleLyrics}><FontAwesomeIcon className="text-[26px] text-[#776B5D]" icon={faFileLines} /></button>
          ) : (
            <button><FontAwesomeIcon className="text-[26px] text-[#776B5D]" icon={faFileLines} /></button>
          )}
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