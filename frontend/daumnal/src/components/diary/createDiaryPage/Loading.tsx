// 로딩 페이지
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axiosImage from '../../../pages/api/axiosImage';
import axiosInstance from '../../../pages/api/axiosInstance';
import Swal from 'sweetalert2'

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
  font-size: 50px;
`;


interface LoadingProps {
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  removeTagsContent: string;
  title:string;
  hashTag:string;
  content:string;
  image:File | null;
}

type DiaryEmotion = {
  fear: number,
  surprise: number,
  angry: number,
  sadness: number,
  neutral: number,
  happiness: number,
  disgust: number,
};

const LoadingPage: React.FC<LoadingProps> = ({ setIsLoading, removeTagsContent, title, hashTag, content, image }) => {
  
  const [loadedImages, setLoadedImages] = useState<number>(0);

  const navigate = useNavigate();

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };


  useEffect(() => {
    if (loadedImages === 16) {
    // console.log( removeTagsContent )
    axiosInstance.post(`${process.env.REACT_APP_FASTAPI_BASE_URL}/diaries`, {
      'diaryContent': removeTagsContent
    })
    .then(function (response) {
      // console.log(response)
      if (response.data.code === 200) {
        // console.log(response)

        Swal.fire({
          'title': '감정 분석이 완료되었습니다!',
          'text' : '오늘의 나무를 선택해주세요',
          'icon' : 'success',
          confirmButtonText: "확인"
        })

        const emotion: DiaryEmotion = response.data.data.diaryEmotion

        const fear = emotion.fear.toString()
        const surprise = emotion.surprise.toString()
        const angry = emotion.angry.toString()
        const sadness = emotion.sadness.toString()
        const neutral = emotion.neutral.toString()
        const happiness = emotion.happiness.toString()
        const disgust = emotion.disgust.toString()

        // console.log('emotion', emotion)
        // console.log('fear', fear)

        const formData = new FormData();

        formData.append('diaryTitle', title);
        formData.append('diaryContent', content);
        formData.append('diaryHashTag', hashTag);
        formData.append('diaryEmotion.fear', fear)
        formData.append('diaryEmotion.surprise', surprise)
        formData.append('diaryEmotion.angry', angry)
        formData.append('diaryEmotion.sadness', sadness)
        formData.append('diaryEmotion.neutral', neutral)
        formData.append('diaryEmotion.happiness', happiness)
        formData.append('diaryEmotion.disgust', disgust)
        if (image != null) formData.append('diaryPhoto', image);

        formData.forEach((value, key) => {
          // console.log(key, value, typeof(value));
        });
        
        //일기 등록하는 axios 로직 구현
        axiosImage.post(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries`, formData)
        .then (function (response:any) {
          // console.log(response.data)
          navigate('/select-character', { state: { diaryId: response.data.data.diaryId } })
        })
        .catch(function (error:any) {
          // console.log('일기 등록 에러발생', error.response);
        });
        
      }

      else if (response.data.status === "emotionLack") {
        Swal.fire({
          title: "감정분석에 실패했어요",
          text: "조금만 더 감정을 담아서 써주세요",
          icon: "error"
        });
        setIsLoading(false)
      }

      else if (response.data.status === "sentenceLack" ) {
        Swal.fire({
          title: "감정 분석에 실패했어요",
          text: "문장이 너무 적어요",
          icon: "error"
        });
        setIsLoading(false)
      }
    })
    .catch(function (error:any) {
      // console.log('감정 분석 에러발생', error);
    });
  }
  }, [loadedImages]);

 
  return (
    <div className="flex flex-col items-center p-10">
      <Images>
        <Image src="/image/dabom.png" onLoad={handleImageLoad}/>
        <Image src="/image/dareum.png" onLoad={handleImageLoad}/>
        <Image src="/image/daeul.png" onLoad={handleImageLoad}/>
        <Image src="/image/daseol.png" onLoad={handleImageLoad}/>
        <Image src="/image/dabom.png" onLoad={handleImageLoad}/>
        <Image src="/image/dareum.png" onLoad={handleImageLoad}/>
        <Image src="/image/daeul.png" onLoad={handleImageLoad}/>
        <Image src="/image/daseol.png" onLoad={handleImageLoad}/>
      </Images>
      <div className='flex flex-col w-[1200px] text-[45px] h-[250px] justify-center items-center py-8'>
        <div>오늘 적은 일기에서 감정을 추출하고 있어요!</div>
        <img src='./image/LoadingBar.gif' alt="" className='w-[500px] mt-4'/>
      </div>
      <Images>
        <Image src="/image/daseol.png" onLoad={handleImageLoad}/>
        <Image src="/image/daeul.png" onLoad={handleImageLoad}/>
        <Image src="/image/dareum.png" onLoad={handleImageLoad}/>
        <Image src="/image/dabom.png" onLoad={handleImageLoad}/>
        <Image src="/image/daseol.png" onLoad={handleImageLoad}/>
        <Image src="/image/daeul.png" onLoad={handleImageLoad}/>
        <Image src="/image/dareum.png" onLoad={handleImageLoad}/>
        <Image src="/image/dabom.png" onLoad={handleImageLoad}/>
      </Images>
    </div>
  );
};

export default LoadingPage;
