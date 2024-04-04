import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faTrashCan, faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import DailyResultModal from './DailyResultModal';
import axiosInstance from '../../pages/api/axiosInstance';
import DiaryMusicPlayBar from '../diary/CalendarPage/DiaryMusicPlayBar';
import Swal from 'sweetalert2'
import AddLyricsModal from './AddLyricsModal';


interface DiaryDetailModalProps {
  onDiaryModalClose: () => void; 
  diaryModalList: number[][];
  selectedDiaryDate: Date | null;
  }

  const DiaryDetailModal: React.FC<DiaryDetailModalProps> = ({ onDiaryModalClose, diaryModalList, selectedDiaryDate }) => {

  const [selectedDiaryId, setSelectedDiaryId] = useState<number>(0)
  const [currentDiaryIndex, setCurrentDiaryIndex] = useState<number>(-1)

  const [isDailyResultModalOpen, setIsDailyResultModalOpen] = useState<boolean>(false)
  const [isAddLyricsModalOpen, setIsAddLyricsModalOpen] = useState<boolean>(false)
  const [isPrevDiary, setIsPrevDiary] = useState<boolean>(false)
  const [isNextDiary, setIsNextDiary] = useState<boolean>(false)
  const [isDeletedHovered, setIsDeletedHovered] = useState<boolean>(false)

  const [diaryDate, setDiaryDate] = useState<string>('')
  const [diaryTitle, setDiaryTitle] = useState<string>('')
  const [diaryContent, setDiaryContent] = useState<string>('')
  const [diaryHashTag, setDiaryHashTag] = useState<string | null>(null)
  const [diaryImage, setDiaryImage] = useState<string | null>(null)
  const [diaryMusicId, setDiaryMusicId] = useState<string>()
  const [diaryEmotionId, setDiaryEmotionId] = useState<string>()
  const [diaryMusicLyrics, setDiaryMusicLyrics] = useState<string[]>([])
  const [diaryRegisteredLyrics, setDiaryRegisteredLyrics] = useState<number[]>([])


  // diaryId로 해당 diary 정보 가져오기 로직 구현
  const getDiaryInfo = () => {
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/${selectedDiaryId}`)
    .then (function (response:any) {
      const diaryInfo = response.data.data
      const dateParts = diaryInfo.diaryCreatedAt.match(/\d+/g);
      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const date = new Date(year, month, day);
      const dayOfWeek = date.toLocaleDateString('ko-KR', { weekday: 'long' });

      setDiaryDate(`${diaryInfo.diaryCreatedAt} ${dayOfWeek}`)
      setDiaryTitle(diaryInfo.diaryTitle)
      setDiaryContent(diaryInfo.diaryContent)
      setDiaryHashTag(diaryInfo.diaryHashTag)
      setDiaryImage(diaryInfo.diaryPhotoUrl)
      setDiaryMusicId(diaryInfo.musicId)
      setDiaryEmotionId(diaryInfo.emotionId)

    })
    .catch(function (error:any) {
      // console.log('일기 상세 조회 에러 발생', error.response);
    });
  }

  const getDiaryLyrics = () => {
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/${selectedDiaryId}/musics/lyrics`)
    .then (function (response:any) {
      const lyrics: string[] = response.data.data.musicLyrics.split('\n')
      setDiaryMusicLyrics(lyrics)
      setDiaryRegisteredLyrics(response.data.data.diaryLyricsLineNumbers)
    })
    .catch(function (error:any) {
      // console.log('일기 가사 조회 에러 발생', error.response);
    });
  }

  useEffect(() => {

    // console.log(selectedDiaryId)
    let showPrev = true;
    let showNext = true;
  
    if (currentDiaryIndex === 0) {
      showPrev = false; 
    }
  
    if (currentDiaryIndex === diaryModalList.length - 1) {
      showNext = false; 
    }
  
    setIsPrevDiary(showPrev);
    setIsNextDiary(showNext);

    getDiaryInfo()
    getDiaryLyrics()

  }, [selectedDiaryId])

  useEffect(() => {
    if (!isAddLyricsModalOpen) {
      getDiaryLyrics()
    }
  }, [isAddLyricsModalOpen])


  useEffect(() => {

    if (selectedDiaryDate) {

      const selectedDiaryDay = selectedDiaryDate.getDate();
      const currentDiary = diaryModalList.find(diary => diary[0] === selectedDiaryDay);

      if (currentDiary) {
        
        const newIndex = diaryModalList.findIndex(diary => diary[0] === selectedDiaryDay)
        setCurrentDiaryIndex(newIndex)
        setSelectedDiaryId(currentDiary[1]); 

      } else {
        setSelectedDiaryId(0);
      }

    } else {
      setSelectedDiaryId(0);
    }

  }, [selectedDiaryDate]);


  const movePrevDiary = (e:any) => {

    e.stopPropagation();
    const newIndex = currentDiaryIndex - 1
    setCurrentDiaryIndex(newIndex)
    setSelectedDiaryId(diaryModalList[newIndex][1]);

  }

  const moveNextDiary = (e:any) => {

    e.stopPropagation();
    const newIndex = currentDiaryIndex + 1
    setCurrentDiaryIndex(newIndex) 
    setSelectedDiaryId(diaryModalList[newIndex][1]);

  }

  const deleteDiary = () => {
    Swal.fire({
      title: "일기를 삭제 하시겠습니까?",
      text: "삭제 후에는 복구가 불가합니다",
      icon: "question",
      showCancelButton: true,
      cancelButtonText: "취소",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "삭제"
    }).then((result) => {
      if (result.isConfirmed) {
        axiosInstance.delete(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/${selectedDiaryId}`)
        .then (function (response:any) {
          if (response.data.code == 200) {
            Swal.fire({
              title: "일기가 삭제 되었습니다",
              icon: "success"
            });
            onDiaryModalClose()
          }
        })
      }
    });
    
  }


  

  return (
    <div>
      { !isDailyResultModalOpen &&
      <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-40 flex justify-center items-center" onClick={onDiaryModalClose}>
          <button onClick={(e) => movePrevDiary(e)} className={` ${isPrevDiary ? "visible" : "invisible"} m-auto group`}>
            <FontAwesomeIcon icon={faChevronLeft} size="2xl" className="text-[60px] text-button_faChevron group-hover:text-white" />
          </button> 

          <div className="flex flex-col bg-bg_modal p-12 my-8 rounded-xl h-[90%] w-[600px] shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className='overflow-y-auto'>
              <div className='diaryInfo flex flex-col items-center justify-center'>

                <div className='flex flex-row mb-8 items-center justify-center w-full'>
                  <FontAwesomeIcon icon={faEllipsisVertical} className="text-xl text-[#776B5D] w-full invisible"/>
                  <DiaryMusicPlayBar diaryMusicId={diaryMusicId}/> 
                  <div className='flex flex-row items-center justify-center text-center w-full'>
                    <button onClick={deleteDiary}  onMouseEnter={() => setIsDeletedHovered(true)} onMouseLeave={() => setIsDeletedHovered(false)}>
                    {isDeletedHovered ? 
                      (<FontAwesomeIcon icon={faTrashCan} className="text-lg text-[#776B5D]" /> ) 
                      : (<FontAwesomeIcon icon={faEllipsisVertical} className="text-xl text-[#776B5D]"/>)
                    }
                    </button>            
                  </div>                  
                </div>

                <div className='text-2xl text-bold mb-4 '>{diaryDate}</div>
                <div className='text-2xl text-bold'>{diaryTitle}</div>
                {diaryHashTag && <div className='mt-2 '>{diaryHashTag.split(' ').map(tag => `#${tag}`).join(' ')}</div> }
                {diaryImage && <img src={diaryImage} alt="Diary" className="max-h-[250px] mt-8 mb-4"/>}
                <div dangerouslySetInnerHTML={{ __html: diaryContent }} className='mt-4 w-[90%]'></div>
                <div className='w-[90%] mt-8 border-t-2 border-b-2 border-[rgba(105,104,100,0.5)] py-6 flex flex-col items-center'>
                {diaryRegisteredLyrics.length > 0 ? (
                  diaryRegisteredLyrics.map((index) => (
                    <p key={index}>{diaryMusicLyrics[index]}</p>))
                    ) 
                    : (<><p className=''>마음에 드는 가사를 등록해보세요!</p></>)}
                <button onClick={() => {setIsAddLyricsModalOpen(true)}} className='flex flex-row text-sm underline underline-offset-4 mt-4'>가사 등록하기 <img src="./image/lyrics_pencil.png" alt="" className='w-[17px] ml-[2px]'/></button>
                {isAddLyricsModalOpen && 
                <AddLyricsModal setIsAddLyricsModalOpen = {setIsAddLyricsModalOpen} diaryId = {selectedDiaryId} diaryMusicLyrics = {diaryMusicLyrics} diaryRegisteredLyrics = {diaryRegisteredLyrics}  />}
                </div>
                <button onClick={() => setIsDailyResultModalOpen(true)} className='mt-8 border text-sm py-2 px-4 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>오늘의 감정분석 {`>>`}</button>
                
              </div>
            </div>
          </div>

          <button onClick={(e) => moveNextDiary(e)} className={` ${isNextDiary ? "visible" : "invisible"} m-auto group`}>
            <FontAwesomeIcon icon={faChevronRight} size="2xl" className="text-[60px]  text-button_faChevron group-hover:text-white"  />           
          </button> 
        </div>}
        { isDailyResultModalOpen && <DailyResultModal onDailyResultModalClose={()=> setIsDailyResultModalOpen(false)} onDiaryModalClose={onDiaryModalClose} diaryEmotionId={diaryEmotionId} diaryDate={diaryDate}/> }
      </div>

      );
}

export default DiaryDetailModal
