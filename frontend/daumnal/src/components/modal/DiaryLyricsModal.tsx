// 가사 모달
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';


interface DiaryLyricsModalProps {
  onClickToggleModal: () => void; // 모달 토글 함수
  diaryMusicLyrics: string
}

const DiaryLyricsModal: React.FC<DiaryLyricsModalProps> = ({ onClickToggleModal, diaryMusicLyrics }) => {

  // 줄 단위로 가사 분할
  const lyricsLines = diaryMusicLyrics.split('\n');

  return (
    <div style={{ fontFamily: "NanumSquare" }}>
    <div className='fixed mr-[134px] inset-0 bg-white bg-opacity-0 flex justify-center items-center'> {/* 배경 클릭 시 모달 닫기 */}
      <div onClick={(e) => e.stopPropagation()} className='w-[455px] h-[80%] m-auto  shadow-lg bg-white rounded-sm'> {/* 모달 컨텐츠 클릭 시 버블링 방지 */}
        <div className='flex justify-end'><button onClick={onClickToggleModal} className='mt-2 mr-2 text-xl'><FontAwesomeIcon icon={faX} size="xs" style={{color: "#776b5d",}} /></button></div>
        <div className='h-[87%] overflow-y-auto flex flex-col px-8 text-[#776B5D] font-[20px]'>
            {/* 가사 */}
            {lyricsLines.map((line, index) => (
            <p key={index} className="mt-5">{line}</p>
            ))}
        </div>
      </div>
    </div>
    </div>
  );
};



export default DiaryLyricsModal;