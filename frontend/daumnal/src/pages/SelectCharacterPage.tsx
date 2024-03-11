import React from 'react';
import styled from 'styled-components';
import CharacterCard from '../components/music/CharacterCard';

const Characters = styled.div`
  display: flex;
  margin: 0px 30px;
`

const SelectCharacterPage: React.FC = () => {
  return (
    <div>
      {/* 페이지 문구 */}
      <p className="m-10 text-3xl">오늘의 나무를 골라 주세요!</p>
      {/* 캐릭터 */}
      <Characters>
        <CharacterCard imageUrl="/image/dabom.png" name="다봄" context="다봄이 설명" />
        <CharacterCard imageUrl="/image/dareum.png" name="다름" context="다름이 설명" />
        <CharacterCard imageUrl="/image/daeul.png" name="다을" context="다을이 설명" />
        <CharacterCard imageUrl="/image/dagyeol.png"  name="다결" context="다결이 설명" />
      </Characters>
    </div>
  );
};

export default SelectCharacterPage;