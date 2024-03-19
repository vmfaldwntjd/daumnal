// 캐릭터 선택 페이지
import React from 'react';
import styled from 'styled-components';
import CharacterCard from '../components/music/CharacterCard';

const SelectCharacterPage: React.FC = () => {
  return (
    <div className="p-9">
      <p className="text-4xl mb-7">오늘의 나무를 골라 주세요!</p>
      {/* 캐릭터 목록 */}
      <Characters>
        <CharacterCard imageUrl="/image/dabom.png" name="다봄" context="다봄이 설명" />
        <CharacterCard imageUrl="/image/dareum.png" name="다름" context="다름이 설명" />
        <CharacterCard imageUrl="/image/daeul.png" name="다을" context="다을이 설명" />
        <CharacterCard imageUrl="/image/daseol.png" name="다설" context="다설이 설명" />
      </Characters>
    </div>
  );
};

const Characters = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default SelectCharacterPage;