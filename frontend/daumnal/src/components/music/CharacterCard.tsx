import React from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CharacterCardProps {
  imageUrl: string;
  name: string;
  category: string;
  keywords: string[];
};

interface ApiResponse {
  data: any;
  code: number;
  status: string;
  message: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ imageUrl, name, category, keywords }) => {
  const location = useLocation();
  const navigate = useNavigate();
  // 일기 id
  const { diaryId } = location.state;

  // 선택된 캐릭터에 대한 노래 추천 결과 요청 및 페이지 이동 핸들러
  const handleCharacterClick = (category: string) => () => {
    // console.log(`일기 id: ${diaryId}, 카테고리: ${category}`);
    // 선택된 캐릭터에 대한 노래 추천 결과 요청
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_FASTAPI_BASE_URL}/musics/${category}/diaries/${diaryId}`)
      .then(response => {
        // console.log('노래 추천 요청 성공!', response.data);
        if (response.data.status === "OK") {
          // console.log(response.data.data.musicId)
          // 결과 페이지로 이동
          navigate("/music-result", { state: { selectedCharacter: name, musicId: response.data.data.musicId } });
        } else {
          // console.log(`status: ${response.data.status}: message: ${response.data.message}`);
        }
      })
      .catch(error => {
        // console.log('노래 추천 요청 오류 발생!', error);
      });
  }

  return (
    <Container onClick={handleCharacterClick(category)}>
      {/* 캐릭터 설명 */}
      <Text>
        <p className="mt-4 text-3xl">{name}</p>
        <p className="text-2xl">- - - - - - - - - - - - - - -</p>
        <p className="text-2xl">
          {keywords.map((keyword, index) => (
            <p className="mb-2" key={index}>{keyword}</p>
        )) }</p>
      </Text>
      {/* 캐릭터 이미지 */}
      <Image src={imageUrl} alt="캐릭터 이미지" />
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Text = styled.p`
  width: 260px;
  height: 300px;
  background-color: #F8F6EE;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  margin-top: -45%;
  height: 350px;
`;

export default CharacterCard;