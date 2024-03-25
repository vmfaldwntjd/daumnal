import React, { useState } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface CharacterCardProps {
  imageUrl: string;
  name: string;
  category: string;
  context: string;
};

interface ApiResponse {
  data: any;
  code: number;
  status: string;
  message: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({ imageUrl, name, category, context }) => {
  const navigate = useNavigate();
  const [musicId, setMusicId] = useState<number>() // 노래 id

  // 선택된 캐릭터에 대한 노래 추천 결과 요청 및 페이지 이동 핸들러
  const handleCharacterClick = (category: string) => () => {
    // 선택된 캐릭터에 대한 노래 추천 결과 요청
    axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/musics/${category}/diaries/2`) // 2 -> %{diaryId}
      .then(response => {
        console.log('노래 추천 요청 성공!', response.data);
        if (response.data.status === "OK") {
          console.log(response.data.data)
          setMusicId(response.data.data.musicId)
        } else {
          console.log(response.data.status)
        }
      })
      .catch(error => {
        console.log('노래 추천 요청 오류 발생!', error);
      });

    // 결과 페이지로 이동
    navigate("/music-result", { state: { selectedCharacter: name, musicId: musicId } });
  }

  return (
    <Container onClick={handleCharacterClick(category)}>
      {/* 캐릭터 설명 */}
      <Text>
        <p className="mt-4 text-3xl">{name}</p>
        <p className="text-2xl">- - - - - - - - - - - - - - -</p>
        <p className="text-xl">{context}</p>
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
  margin-top: -50%;
  width: 300px;
`;

export default CharacterCard;