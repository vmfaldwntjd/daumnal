// 로딩 페이지
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

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

  const location = useLocation();
  const { title, hashTag, content, removeTagsContent, image } = location.state || {};

  type EmotionState = {
    fear: number,
    surprise: number,
    angry: number,
    sadness: number,
    neutral: number,
    happiness: number,
    disgust: number,
  };

  
  const [emotion, setEmotion] = useState<EmotionState | null>(null)

  useEffect(() => {
    // console.log('emotion', emotion); 
  }, [emotion]);


  useEffect(() => {
    console.log( title, hashTag, content, removeTagsContent, image )
    axios.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/diaries`, {
      'diaryContent': removeTagsContent
    })
    .then(function (response) {
      if (response.data.code == 200) {
        console.log(1)
        // console.log(response.data.data.diaryEmotion)
        setEmotion(response.data.data.diaryEmotion)
        // console.log('emotion', emotion)
      }
    })
    .catch(function (error:any) {
      console.log('에러발생', error);
    });
  }, []);

 
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