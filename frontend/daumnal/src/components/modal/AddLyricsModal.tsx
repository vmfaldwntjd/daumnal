// 가사 등록 모달
import React, { Dispatch, SetStateAction, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../pages/api/axiosInstance';
import Swal from 'sweetalert2'


interface AddLyricsModalProps {
    setIsAddLyricsModalOpen: Dispatch<SetStateAction<boolean>>;
    diaryId: number;
    diaryMusicLyrics: string[];
    diaryRegisteredLyrics: number[];
}

const AddLyricsModal: React.FC<AddLyricsModalProps> = ({ setIsAddLyricsModalOpen, diaryId, diaryMusicLyrics, diaryRegisteredLyrics }) => {

    const [diaryAddLyrics, setDiaryAddLyrics] = useState<number[]>(diaryRegisteredLyrics)

    const toggleLyricSelection = (index: number) => {
        if (diaryAddLyrics.includes(index)) {
          // 이미 선택된 가사의 인덱스를 제거합니다.
          setDiaryAddLyrics(diaryAddLyrics.filter((i) => i !== index));
        } else {
          // 가사의 인덱스를 추가합니다.
          setDiaryAddLyrics([...diaryAddLyrics, index]);
        }
      };

    const addLyrics = () => {
        // console.log('diaryAddLyrics', diaryAddLyrics)
        axiosInstance.patch(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/${diaryId}/lyrics`, {
            "diaryLyricsLineNumbers" : diaryAddLyrics
        })
        .then (function (response:any) {
            if (response.data.code == 200) {
                Swal.fire({
                    title: "가사가 등록되었습니다",
                    icon: "success",
                  })
                setIsAddLyricsModalOpen(false)
            }
        })
        .catch(function (error:any) {
            // console.log('가사 등록 에러 발생', error.response);
        });
    }


  return (
    <div style={{ fontFamily: "NanumSquare" }}>
    <div className='fixed mr-[134px] inset-0 bg-white bg-opacity-0 flex justify-center items-center'> {/* 배경 클릭 시 모달 닫기 */}
      <div onClick={(e) => e.stopPropagation()} className='w-[455px] h-[80%] m-auto  shadow-lg bg-white rounded-sm'> {/* 모달 컨텐츠 클릭 시 버블링 방지 */}
        <div className='flex justify-end'><button onClick={() => {setIsAddLyricsModalOpen(false)}} className='mt-2 mr-2 text-xl'><FontAwesomeIcon icon={faX} size="xs" style={{color: "#776b5d",}} /></button></div>
        <div className='h-[87%] overflow-y-auto px-8 flex flex-col font-[20px]'>
        {diaryMusicLyrics.map((lyric, index) => (
            <button className='text-start'
            key={index}
            style={{
                display: 'block',
                margin: '10px 0',
                color: diaryAddLyrics.includes(index) ? 'rgb(119, 107, 93)' : 'rgba(119, 107, 93, 0.5)', // 선택된 가사는 진한 색으로 표시합니다.
            }}
            onClick={() => toggleLyricSelection(index)}
            >
            {lyric}
            </button>
        ))}
        <div className='flex justify-center items-center'><button onClick={addLyrics} style={{ fontFamily: "Cafe24Oneprettynight" }} className='w-[80px] mt-8 border py-[4px] px-[10px] border-button_border bg-bg_button rounded-lg'>등록</button></div>
        </div>
      </div>
    </div>
    </div>
  );
};



export default AddLyricsModal;