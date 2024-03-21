import React from 'react'

interface DailyResultModalprops {
    onDailyResultModalClose : () => void; 
}

const DailyResultModal: React.FC<DailyResultModalprops> = ( {onDailyResultModalClose} ) => {
  return (
    <div>
         <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-40 flex justify-center items-center"  >  
          <div className="bg-bg_modal p-8 rounded-xl h-[90%] w-[600px] shadow-lg">

            <button onClick={onDailyResultModalClose} className='border text-sm py-2 px-2 border-button_border bg-bg_button rounded-lg lg:text-[17px] lg:px-4'>
                일기로 돌아가는 버튼!
            </button>

            <p>여기는 일별 감정분석 모달입니다. 예쁘게 만들어주세요. 화이팅입니다!!!!</p>

          </div>
        </div>
    </div>
  )
}

export default DailyResultModal