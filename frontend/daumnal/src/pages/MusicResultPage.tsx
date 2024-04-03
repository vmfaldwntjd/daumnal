// 추천 노래 결과 페이지
import React, { useState, useEffect } from 'react';
import axiosInstance from './api/axiosInstance';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';

interface ApiResponse {
  data: any;
  code: number;
  status: string;
  message: string;
}

const MusicResultPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [musicCoverUrl, setMusicCoverUrl] = useState<string>('') // 노래 앨범 커버 경로
  const [musicTitle, setMusicTitle] = useState<string>('') // 노래 제목
  const [musicSingerName, setMusicSingerName] = useState<string>('') // 노래 아티스트

  // 캐릭터 선택 페이지에서 선택된 캐릭터, 받은 노래 id 가져오기
  const { selectedCharacter, musicId } = location.state;

  // 결과 확인 후 확인 버튼 클릭시 캘린더 페이지로 이동시키는 함수
  const handleResultClick = () => {
    navigate("/calendar");
  }

  // 캐릭터 이름에 따라서 이미지 경로 설정하는 함수
  const getCharacterImageUrl = (characterName: string): string => {
    switch (characterName) {
      case "다봄":
        return "/image/dabom.png";
      case "다름":
        return "/image/dareum.png";
      case "다을":
        return "/image/daeul.png";
      case "다설":
        return "/image/daseol.png";
      default:
        return "/image/dabom.png";
    }
  };

  // 캐릭터 이미지 경로 지정
  const characterImageUrl = getCharacterImageUrl(selectedCharacter);
    
  useEffect(() => {
    // console.log(`추천받은 노래 id: ${musicId}`)
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/musics/${musicId}`)
    .then(response => {
      // console.log('추천된 노래 정보 요청 성공!', response.data);
      if (response.data.code === 200) {
        // console.log(`${response.data.status}: ${response.data.message}`);
        setMusicCoverUrl(response.data.data.musicCoverUrl)
        setMusicTitle(response.data.data.musicTitle)
        setMusicSingerName(response.data.data.musicSingerName)
      } else {
        // console.log(`${response.data.status}: ${response.data.message}`);
      }
    })
    .catch(error => {
      // console.log('추천된 노래 정보 요청 오류 발생!', error);
    });
  }, []);

  useEffect(() => {
    // 브라우저 히스토리 스택에 현재 페이지를 추가
    window.history.pushState({}, "", window.location.href);

    const handlePopstate = (event: PopStateEvent) => {
      // 사용자를 특정 페이지로 리다이렉트
      navigate('/calendar')
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);

  return (
    <div>
      <Container>
        <Result>
          <Text>
            <p className="text-4xl mb-14">{selectedCharacter}이가 추천해 준 오늘의 노래는</p>
            <Music>
              <FontAwesomeIcon className="mr-6" icon={faQuoteLeft} />

              {/* 받은 결과 */}
              <img className="w-24 h-24 mr-4" src={musicCoverUrl} alt="앨범 커버" />
              <div className="flex font-NanumSquare">
                <div className="space-y-2 mt-auto mb-auto">
                  <p className="text-2xl">{musicTitle}</p>
                  <p className="text-xl">{musicSingerName}</p>
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

export default MusicResultPage;