import React from 'react';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Result = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Text = styled.p`
  width: 600px;
  height: 360px;
  border-radius: 100px;
  background-color: #F5F5EB;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;

const Music = styled.p`
  display: flex;
`;

const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(156, 155, 150, 0.5);
  background-color: #FFF1DD;
  font-size: large;
`;

interface MusicResultPageProps {
  selectedCharacter: string;
}

const MusicResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedCharacter } = location.state as MusicResultPageProps;

  const handleResultClick = () => {
    navigate("/calendarpage");
  }

  const getCharacterImageUrl = (characterName: string): string => {
    switch (characterName) {
      case "다봄":
        return "/image/dabom.png";
      case "다름":
        return "/image/dareum.png";
      case "다을":
        return "/image/daeul.png";
      case "다결":
        return "/image/dagyeol.png";
      default:
        return "/image/dabom.png";
    }
  };

  const characterImageUrl = getCharacterImageUrl(selectedCharacter);

  return (
    <div>
      <Container>
        <Result>
          <Text>
            <p className="text-4xl mb-14">{selectedCharacter}이가 추천해 준 오늘의 노래는</p>
            <Music>
              <FontAwesomeIcon className="mr-6" icon={faQuoteLeft} />

              {/* 받은 결과 */}
              <img className="w-24 h-24 mr-4" src="/image/playlist_default.png" alt="앨범 커버" />
              <div className="flex font-NanumSquare">
                <div className="space-y-2 mt-auto mb-auto">
                  <p className="text-2xl">노래 제목</p>
                  <p className="text-xl">아티스트</p>
                </div>
              </div>

              <FontAwesomeIcon className="ml-6" icon={faQuoteRight} />
            </Music>
          </Text>
          <img className="w-80 ml-3" src={characterImageUrl} alt="캐릭터 이미지" />
        </Result>
        <Button onClick={handleResultClick}>확인</Button>
      </Container>
    </div>
  );
};

export default MusicResultPage;