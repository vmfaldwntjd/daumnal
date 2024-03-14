import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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

interface CharacterCardProps {
  imageUrl: string;
  name: string;
  context: string;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ imageUrl, name, context }) => {
  const navigate = useNavigate();

  // 선택된 캐릭터 이름 가지고 결과 페이지로 이동하는 함수
  const handleCharacterClick = (name: string) => () => {
    navigate("/musicresultpage", { state: { selectedCharacter: name } });
  }

  return (
    <Container onClick={handleCharacterClick(name)}>
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

export default CharacterCard;