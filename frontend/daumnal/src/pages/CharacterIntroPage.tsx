// 캐릭터 선택 페이지
import React from 'react';
import styled from 'styled-components';

const CharacterIntroPage: React.FC = () => {

  return (
    <div className="p-[30px]">
      <p className="text-4xl mb-[18px]">나무 친구들을 소개할게요</p>
      {/* 캐릭터 목록 */}
      <Characters>
        {/* 다봄 */}
        <Character className="mr-[35px] relative">
          <img className="h-[270px] absolute top-[10px] left-[25px] hover:" src="/image/dabom.png"/>
          <Text className="absolute right-[55px]">
            <p className="text-3xl">다봄</p>
            <p className="text-2xl">- - - - - - - - - - - - - - - - - - - - - -</p>
            <p className="text-2xl">드라마 OST와 아이돌 음악으로</p>
            <p className="text-2xl">신나게 만들어 드릴 거예요.</p>
            <p className="text-2xl">저와 함께라면 밝고 통통 튀는</p>
            <p className="text-2xl">기분을 만끽할 수 있어요!</p>
          </Text>
        </Character>
        {/* 다름 */}
        <Character className="relative">
          <img className="h-[280px] absolute top-[5px]" src="/image/dareum.png"/>
          <Text className="absolute right-[55px]">
            <p className="text-3xl">다름</p>
            <p className="text-2xl">- - - - - - - - - - - - - - - - - - - - - -</p>
            <p className="text-2xl">댄스 음악과 청량한 음악으로</p>
            <p className="text-2xl">하루를 상쾌하게 만들어 드릴게요!</p>
            <p className="text-2xl">저와 함께라면 매일매일</p>
            <p className="text-2xl">즐거움으로 가득 찰 거예요~</p>
          </Text>
        </Character>
        {/* 다을 */}
        <Character className="relative mt-[30px] mr-[35px]">
          <Text className="absolute left-[40px]">
            <p className="text-3xl">다을</p>
            <p className="text-2xl">- - - - - - - - - - - - - - - - - - - - - -</p>
            <p className="text-2xl">R&B와 감성 힙합으로</p>
            <p className="text-2xl">감정을 깊게 더해 드릴게요.</p>
            <p className="text-2xl">저와 함께라면 일상에 찾아오는</p>
            <p className="text-2xl">각별한 순간들이 더욱 특별해질 거예요.</p>
          </Text>
          <img className="h-[270px] absolute top-[10px] right-[10px]" src="/image/daeul.png"/>
        </Character>
        {/* 다설 */}
        <Character className="mt-[30px] relative">
          <Text className="absolute left-[60px]">
            <p className="text-3xl">다설</p>
            <p className="text-2xl">- - - - - - - - - - - - - - - - - - - - - -</p>
            <p className="text-2xl">감성적인 발라드로</p>
            <p className="text-2xl">마음에 따뜻함을 전해 드릴게요.</p>
            <p className="text-2xl">저와 함께라면 하루의 끝에</p>
            <p className="text-2xl">포근한 순간을 경험하실 수 있어요.</p>
          </Text>
          <img className="h-[305px] absolute top-[-10px] right-[10px]" src="/image/daseol.png"/>
        </Character>
      </Characters>
    </div>
  );
};

const Characters = styled.div`
  display: flex;
  flex-wrap: wrap;
  
`;

const Character = styled.div`
  display: flex;
  width: 645px;
  height: 275px;
  background-color: #F8F6EE;
  border-radius: 30px;
  &:hover img {
    transform: scale(1.1);
    transition: transform 0.3s ease;
  }
`;

const Text = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
`;

export default CharacterIntroPage;