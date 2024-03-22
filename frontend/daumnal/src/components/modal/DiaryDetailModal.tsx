import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DailyResultModal from './DailyResultModal';
import axiosInstance from '../../pages/api/axiosInstance';


interface DiaryDetailModalProps {
  onDiaryModalClose: () => void; 
  diaryModalList: number[][];
  selectedDiaryDate: Date | null;
  }

const DiaryDetailModal: React.FC<DiaryDetailModalProps> = ({ onDiaryModalClose, diaryModalList, selectedDiaryDate }) => {

  const [selectedDiaryId, setSelectedDiaryId] = useState<number>(0)
  const [currentDiaryIndex, setCurrentDiaryIndex] = useState<number>(-1)

  const [isDailyResultModalOpen, setIsDailyResultModalOpen] = useState<boolean>(false)
  const [isPrevDiary, setIsPrevDiary] = useState<boolean>(false)
  const [isNextDiary, setIsNextDiary] = useState<boolean>(false)

  const [diaryDate, setDiaryDate] = useState<string>('')
  const [diaryTitle, setDiaryTitle] = useState<string>('')
  const [diaryContent, setDiaryContent] = useState<string>('')
  const [diaryHashTag, setDiaryHashTag] = useState<string | null>(null)
  const [diaryImage, setDiaryImage] = useState<string | null>(null)
  const [diaryMusicId, setDiaryMusicId] = useState<number>()
  const [diaryEmotionId, setDiaryEmotionId] = useState<number>()


  // diaryId로 해당 diary 정보 가져오기 로직 구현
  // const getDiaryInfo = () => {
  //   axiosInstance.post
  // }

  useEffect(() => {

    console.log(selectedDiaryId)
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




  }, [selectedDiaryId])


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

  

    return (
      <div>
        { !isDailyResultModalOpen &&
        <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-40 flex justify-center items-center" onClick={onDiaryModalClose}>
          <button onClick={(e) => movePrevDiary(e)} className={` ${isPrevDiary ? "visible" : "invisible"} m-auto group`}>
            <FontAwesomeIcon icon={faChevronLeft} size="2xl" className="text-[60px] text-button_faChevron group-hover:text-white" />
          </button> 
          <div className="bg-bg_modal p-8 rounded-xl h-[90%] w-[600px] shadow-lg" onClick={(e) => e.stopPropagation()}>
            {/* 여기에 모달 내용을 추가하세요 */}
            <button onClick={() => setIsDailyResultModalOpen(true)} className='border text-sm py-2 px-2 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>오늘의 감정분석 보러가기</button>
            <p>여기는 모달 내용입니다.</p>
          </div>
          <button onClick={(e) => moveNextDiary(e)} className={` ${isNextDiary ? "visible" : "invisible"} m-auto group`}>
            <FontAwesomeIcon icon={faChevronRight} size="2xl" className="text-[60px]  text-button_faChevron group-hover:text-white"  />           
          </button> 
        </div>}
        { isDailyResultModalOpen && <DailyResultModal onDailyResultModalClose={()=> setIsDailyResultModalOpen(false)}/>}
      </div>

      );
}

export default DiaryDetailModal