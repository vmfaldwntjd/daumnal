import React, {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DailyResultModal from './DailyResultModal';
import axios from 'axios';
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
  const getDiaryInfo = () => {
    axios.get('https://7a0464f2-3707-4ae0-bc93-13a5c84152ad.mock.pstmn.io/diaryId')
    .then (function (response:any) {
      const diaryInfo = response.data.data
      console.log(diaryInfo)
      setDiaryDate(diaryInfo.diaryCreatedAt)
      setDiaryTitle(diaryInfo.diaryTitle)
      setDiaryContent(diaryInfo.diaryContent)
      setDiaryHashTag(diaryInfo.diaryHashTag)
      setDiaryImage(diaryInfo.diaryPhotoUrl)
      setDiaryMusicId(diaryInfo.musicId)
      setDiaryEmotionId(diaryInfo.emotionId)
    })
    .catch(function (error:any) {
      console.log('일기 상세 조회 에러 발생', error.response);
    });
  }

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

    getDiaryInfo()


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

          <div className="flex flex-col bg-bg_modal p-12 my-8 rounded-xl h-[90%] w-[600px] shadow-lg" onClick={(e) => e.stopPropagation()}>
            <div className='overflow-y-auto'>
              <div className='diaryInfo flex flex-col items-center'>
                <div className='text-2xl text-bold mb-4 '>{diaryDate}</div>
                <div className='text-2xl text-bold mb-4'>{diaryTitle}</div>
                {diaryHashTag && <div className='mb-4'>{diaryHashTag.split(' ').map(tag => `#${tag}`).join(' ')}</div> }
                {diaryImage && <img src={diaryImage} alt="Diary" className="max-h-[250px] mb-8"/>}
                <div dangerouslySetInnerHTML={{ __html: diaryContent }}></div>
                <button onClick={() => setIsDailyResultModalOpen(true)} className='mt-8 border text-sm py-2 px-4 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>오늘의 감정분석 {`>>`}</button>
              </div>
            </div>
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