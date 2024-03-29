// 캐릭터 선택 페이지
import React from 'react';
import styled from 'styled-components';

const CharacterIntroPage: React.FC = () => {

  return (
    <div className="p-9">
      <p className="text-4xl mb-7">나무 친구들을 소개합니다</p>
      {/* 캐릭터 목록 */}
      <Characters>
        {/* 다봄 */}
        <Character>
          <img src="/image/dabom.png"/>
        </Character>
        {/* 다름 */}
        <Character>
          <img src="/image/dareum.png"/>
        </Character>
        {/* 다을 */}
        <Character>
          <img src="/image/daeul.png"/>
        </Character>
        {/* 다설 */}
        <Character>
          <img src="/image/daseol.png"/>
        </Character>
      </Characters>
    </div>
  );
};

const Characters = styled.div`
  display: flex;
  justify-content: space-around;
`;

const Character = styled.div`
  
`;

export default CharacterIntroPage;