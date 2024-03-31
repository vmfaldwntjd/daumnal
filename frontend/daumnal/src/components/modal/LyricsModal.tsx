// 가사 모달
import React from 'react';
import styled from 'styled-components';

interface LyricsModalProps {
  lyrics: string;
  onClickToggleModal: () => void; // 모달 토글 함수
}

const LyricsModal: React.FC<LyricsModalProps> = ({ lyrics, onClickToggleModal }) => {
  // 줄 단위로 가사 분할
  const lyricsLines = lyrics.split('\n');

  return (
    <ModalBackdrop onClick={onClickToggleModal}> {/* 배경 클릭 시 모달 닫기 */}
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* 모달 컨텐츠 클릭 시 버블링 방지 */}
        {/* 가사 */}
        {lyricsLines.map((line, index) => (
          <p key={index} className="mt-5">{line}</p>
        ))}
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 63.9%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const ModalContent = styled.div`
  width: 45%;
  height: 73%;
  overflow-y: auto; /* 세로 스크롤 추가 */
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  color: #776B5D;
  font-size: 20px;
  padding-bottom: 15px;
`;

export default LyricsModal;