import React, {useState} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import DailyResultModal from './DailyResultModal';

interface DiaryDetailModalProps {
  onDiaryModalClose: () => void; 
  }

const DiaryDetailModal: React.FC<DiaryDetailModalProps> = ({ onDiaryModalClose }) => {

  const [isDailyResultModalOpen, setIsDailyResultModalOpen] = useState<boolean>(false)



    return (
      <div>
        { !isDailyResultModalOpen &&
        <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-40 flex justify-center items-center" onClick={onDiaryModalClose}>
          <button className=' m-auto'>
            <FontAwesomeIcon icon={faChevronLeft} size="2xl" className="text-[60px]" style={{color: "#cccccc"}} />
          </button>    
          <div className="bg-bg_modal p-8 rounded-xl h-[90%] w-[600px] shadow-lg" onClick={(e) => e.stopPropagation()}>
            {/* 여기에 모달 내용을 추가하세요 */}
            <button onClick={() => setIsDailyResultModalOpen(true)} className='border text-sm py-2 px-2 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>오늘의 감정분석 보러가기</button>
            <p>여기는 모달 내용입니다.</p>
          </div>
          <button className=' m-auto'>
            <FontAwesomeIcon icon={faChevronRight} size="2xl" className="text-[60px]" style={{color: "#cccccc"}} />            
          </button>
        </div>}
        { isDailyResultModalOpen && <DailyResultModal onDailyResultModalClose={()=> setIsDailyResultModalOpen(false)}/>}
      </div>

      );
}

export default DiaryDetailModal