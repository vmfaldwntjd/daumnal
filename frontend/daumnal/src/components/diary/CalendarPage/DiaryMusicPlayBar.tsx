import React, { useRef, useState, useCallback, useEffect } from 'react';
import ReactPlayer from 'react-player';
import DiaryLyricsModal from '../../modal/DiaryLyricsModal';
import DiaryMusicInfoModal from '../../modal/DiaryMusicInfoModal';
import axiosInstance from '../../../pages/api/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faFileLines } from '@fortawesome/free-solid-svg-icons';

interface DiaryMusicPlayBarProps {
    diaryMusicId? : string
}

const DiaryMusicPlayBar: React.FC<DiaryMusicPlayBarProps> = ({ diaryMusicId }) => {

    const playerRef = useRef<ReactPlayer>(null); // ReactPlayer 컴포넌트에 대한 Ref 생성
    const [playing, setPlaying] = useState<boolean>(true); // 현재 재생 상태를 저장하는 상태 변수(기본값 false)

    const [diaryMusicCover, setDiaryMusicCover] = useState<string>('')
    const [diaryMusicTitle, setDiaryMusicTitle] = useState<string>('')
    const [diaryMusicSinger, setDiaryMusicSinger] = useState<string>('')
    const [diaryMusicCode, setDiaryMusicCode] = useState<string>('')
    const [diaryMusicLyrics, setDiaryMusicLyrics] = useState<string>('')

      // 모달 열려 있는지 확인
    const [isOpenMusicModal, setOpenMusicModal] = useState<boolean>(false);
    // 모달 참조를 위한 useRef
    const modalRef = useRef<HTMLDivElement>(null);


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

    useEffect(() => {
        axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/musics/${diaryMusicId}`)
        .then (function (response:any) {
            const musicData = response.data.data
            // console.log(musicData)
            setDiaryMusicTitle(musicData.musicTitle)
            setDiaryMusicSinger(musicData.musicSingerName)
            setDiaryMusicCover(musicData.musicCoverUrl)
            setDiaryMusicCode(musicData.musicYoutubeId)
            setDiaryMusicLyrics(musicData.musicLyrics)
          })
          .catch(function (error:any) {
            // console.log('일기 상세 조회 에러 발생', error.response);
          });


    }, [diaryMusicId])

        // 노래 추가/삭제할 플레이리스트 선택 모달 열고 닫는 토글
    const handlePlaylistClick = useCallback((diaryMusicId: number) => {
        setOpenMusicModal(true);
    }, [isOpenMusicModal]);

    // 노래 추가/삭제할 플레이리스트 선택 모달 닫기
    const handleCloseMusicModal = useCallback(() => {
        setOpenMusicModal(false);
    }, []);

    useEffect(() => {
        // 모달 바깥 클릭을 감지하는 함수
        const handleClickOutside = (event: any) => {
          if (modalRef.current && !modalRef.current.contains(event.target)) {
            handleCloseMusicModal(); // 모달을 닫는 함수 호출
          }
        };
      
        if (isOpenMusicModal) {
          // 모달이 열려있을 때, 클릭 이벤트 리스너 추가
          document.addEventListener("mousedown", handleClickOutside);
        } else {
          // 모달이 닫혔을 때, 클릭 이벤트 리스너 제거
          document.removeEventListener("mousedown", handleClickOutside);
        }
      
        // 컴포넌트가 언마운트될 때 이벤트 리스너 제거
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [isOpenMusicModal]);
    

  return (
    <div>
    <ReactPlayer
    ref={playerRef} // Ref 설정
    url={`https://www.youtube.com/watch?v=${diaryMusicCode}`} // 현재 재생 중인 곡의 URL 설정
    controls={false} // 기본 컨트롤러를 사용하지 않도록 설정
    width="0" // 화면이 보이지 않도록 설정
    height="0" // 화면이 보이지 않도록 설정
    playing={playing} // 재생 상태 설정
    loop={true} // 루프 상태 설정
    onPlay={() => setPlaying(true)} // 재생 시 재생 상태 업데이트
    onPause={() => setPlaying(false)} // 정지 시 재생 상태 업데이트
    />
    <div className='w-[350px] relative flex flex-row items-center justify-between p-2  rounded-lg bg-[#FFFCF7] shadow-md'>
        <div className='flex flex-row items-center'>
            <img src={diaryMusicCover} alt="" className='w-[50px]'/>
            <div className='ml-2'>
                <div>{diaryMusicTitle}</div>
                <div className='text-sm'>{diaryMusicSinger}</div>
            </div> 
        </div>
        <div className='flex flex-row items-center'>
            {playing ? (
                <button onClick={handlePlayPause}><FontAwesomeIcon className="text-xl text-[#776B5D] mx-[12px] pt-1" icon={faPause} /></button>
            ) : (
                <button onClick={handlePlayPause}><FontAwesomeIcon className="text-xl text-[#776B5D] mx-[12px] pt-1" icon={faPlay} /></button>
            )}
            {isOpenLyricsModal && (
                <DiaryLyricsModal onClickToggleModal={handleLyrics} diaryMusicLyrics={diaryMusicLyrics}/>
            )}
            <button onClick={handleLyrics}><FontAwesomeIcon className="text-xl text-[#776B5D] mx-2 pt-1" icon={faFileLines} /></button> 
            {isOpenMusicModal && (
              <div ref={modalRef} className='absolute top-[60px] right-[0px] z-10'>
                <DiaryMusicInfoModal onClickToggleModal={handleCloseMusicModal} selectedMusicId={Number(diaryMusicId)} />
              </div>
            )} 
            <button onClick={() => handlePlaylistClick(Number(diaryMusicId))} ><img src="./image/playlist_icon.png" alt="" className='h-[20px] mx-2'/></button>
        </div>
    </div>        
    </div>

  )
}

export default DiaryMusicPlayBar