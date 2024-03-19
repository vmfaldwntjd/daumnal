import React from 'react'

interface DiaryDetailModalProps {
    onClose: () => void; // onClose는 함수이며, 반환 값이 없음을 의미합니다.
  }

const DiaryDetailModal: React.FC<DiaryDetailModalProps> = ({ onClose }) => {



    return (
        <div className="fixed mr-[134px] inset-0 bg-black bg-opacity-30 flex justify-center items-center" onClick={onClose}>
          <div className="bg-bg_modal p-8 rounded-xl h-[90%] w-[600px]" onClick={(e) => e.stopPropagation()}>
            {/* 여기에 모달 내용을 추가하세요 */}
            <p>여기는 모달 내용입니다.</p>
          </div>
        </div>
      );
}

export default DiaryDetailModal