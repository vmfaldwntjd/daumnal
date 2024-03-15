// 로딩 페이지
import React from 'react';
import styled from 'styled-components';

const Images = styled.div`
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  gap: 8px;
`;

const Image = styled.img`
  width: 150px;
`;

const Text = styled.p`
  width: 1200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 30px;
  border-radius: 40px;
  font-size: 60px;
  background-color: #F8F6EE;
`;

const LoadingPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center p-10">
      <Images>
        <Image src="/image/dabom.png" />
        <Image src="/image/dareum.png" />
        <Image src="/image/daeul.png" />
        <Image src="/image/daseol.png" />
        <Image src="/image/dabom.png" />
        <Image src="/image/dareum.png" />
        <Image src="/image/daeul.png" />
        <Image src="/image/daseol.png" />
      </Images>
      <Text>오늘 적은 일기에서 감정을 추출하고 있어요!</Text>
      <Images>
        <Image src="/image/daseol.png" />
        <Image src="/image/daeul.png" />
        <Image src="/image/dareum.png" />
        <Image src="/image/dabom.png" />
        <Image src="/image/daseol.png" />
        <Image src="/image/daeul.png" />
        <Image src="/image/dareum.png" />
        <Image src="/image/dabom.png" />
      </Images>
    </div>
  );
};

export default LoadingPage;