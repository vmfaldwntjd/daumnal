// 캐릭터 선택 페이지
import React from 'react';
import styled from 'styled-components';
import CharacterCard from '../components/music/CharacterCard';

const SelectCharacterPage: React.FC = () => {

  return (
    <div className="p-9">
      <p className="text-5xl mb-9 mt-3 ml-5">오늘의 나무를 골라 주세요!</p>
      {/* 캐릭터 목록 */}
      <Characters>
        <CharacterCard imageUrl="/image/dabom.png" name="다봄" category="SPRING" keywords={["#밝음", "#신나요", "#OST_좋아"]} />
        <CharacterCard imageUrl="/image/dareum.png" name="다름" category="SUMMER" keywords={["#청량", "#즐거움", "#내적_댄스"]} />
        <CharacterCard imageUrl="/image/daeul.png" name="다을" category="FALL" keywords={["#새벽", "#힙하다", "#감성_러버"]} />
        <CharacterCard imageUrl="/image/daseol.png" name="다설" category="WINTER" keywords={["#포근", "#잔잔함", "#위로가_돼"]} />
      </Characters>
    </div>
  );
};

const Characters = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default SelectCharacterPage;