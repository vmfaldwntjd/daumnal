// 가사 모달
import React from 'react';
import styled from 'styled-components';

interface LyricsModalProps {
  onClickToggleModal: () => void; // 모달 토글 함수
}

const LyricsModal: React.FC<LyricsModalProps> = ({ onClickToggleModal }) => {
  // 가상의 노래 데이터
  const data = {
		"musicYoutubeId": "234232",
		"musicTitle": "About Summer",
		"musicSingerName": "이루리",
		"musicCoverUrl": "url",
    "mysicLyrics": "너와 차를 타고 노래했었지\n긴 여름이 끝나가 지금 어딨니\n넌 하늘을 바라보며 얘기했지\n난 너에게 가고 있어\n널 처음 만난 여름\n깊이 빠져가던 마음\n멈출 줄 몰랐던 밤\n식어가는 새벽 공기\n두근거리던 우리\n영원할 것 같았던 마음\n타오르던 우리\n빛나던 그 해 여름\n널 만난 여름으로 갈 거야\n그때 난 아무것도 없었지만\n네가 있었던 널 만난 여름으로 갈 거야\n우리 다시 시작해보자\n나란히 누워서 속삭이던 밤\n난 너 없이 살 수 없어 말해\n감당할 수없이 커져버린 날\n넌 내 손을 잡아줬어\n널 처음 만난 여름\n깊이 빠져가던 마음\n멈출 줄 몰랐던 밤\n식어가는 새벽 공기\n두근거리던 우리\n영원할 것 같았던 마음\n타오르던 우리\n빛나던 그 해 여름\n네가 곁에 있을 때\n나는 더 많은 걸 꿈꾸고\n행복했어\n네가 내 곁에 있을 때\n난 더 나다워졌어\n네가 내 곁에 있을 때\n널 만난 여름으로 갈 거야\n그때 난 아무것도 없었지만\n네가 있었던 널 만난 여름으로 갈 거야\n우리 다시 시작해보자"
	}

  // 줄 단위로 가사 분할
  const lyricsLines = data.mysicLyrics.split('\n');

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
  width: 64%;
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