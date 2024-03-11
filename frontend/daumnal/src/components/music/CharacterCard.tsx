import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 270px;
  height: 440px;
  align-items: center;
  justify-content: space-between; /* 요소들을 수직으로 동일한 간격으로 분배 */
  position: relative; /* Container를 상대 위치로 설정 */
`;

const Text = styled.p`
  width: 200px;
  height: 200px;
  background-color: #F8F6EE;
  border-radius: 30px;
`;

const Image = styled.img`
  margin-top: -30%;
  width: 80%;
  height: 65%;
`;

const CharacterCard: React.FC<{ imageUrl: string }> = ({ imageUrl }) => {
  return (
    <Container>
      <Text></Text>
      <Image src={imageUrl} alt="캐릭터 이미지" />
    </Container>
  );
};

export default CharacterCard;
