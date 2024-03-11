import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.button`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 440px;
  align-items: center;
  justify-content: space-between;
  position: relative;
`;

const Text = styled.p`
  width: 200px;
  height: 200px;
  background-color: #F8F6EE;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Image = styled.img`
  margin-top: -40%;
  width: 90%;
  height: 70%;
`;

interface CharacterCardProps {
  imageUrl: string;
  name: string;
  context: string;
};

const CharacterCard: React.FC<CharacterCardProps> = ({ imageUrl, name, context }) => {
  const navigate = useNavigate();

  const handleCharacterClick = (name: string) => () => {
    navigate("/musicresultpage", { state: { selectedCharacter: name } });
  }

  return (
    <Container onClick={handleCharacterClick(name)}>
      <Text>
        <p className="mt-4 text-xl">{name}</p>
        <p className="text-xl">- - - - - - - - - - - - -</p>
        <p>{context}</p>
      </Text>
      <Image src={imageUrl} alt="캐릭터 이미지" />
    </Container>
  );
};

export default CharacterCard;
