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
      <p className='m-10 text-3xl'>오늘의 나무를 골라 주세요!</p>
      <Characters>
        <CharacterCard imageUrl="/image/dabom.png" />
        <CharacterCard imageUrl="/image/dareum.png" />
        <CharacterCard imageUrl="/image/daeul.png" />
        <CharacterCard imageUrl="/image/dagyeol.png" />
      </Characters>
    </div>
  );
};

export default SelectCharacterPage;