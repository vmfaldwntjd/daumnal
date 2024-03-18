import React, { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import InputHashTag from '../components/diary/createDiaryPage/InputHashTag';
import QuillEditor from '../components/diary/createDiaryPage/QuillEditor';
import UploadImage from '../components/diary/createDiaryPage/UploadImage';
import axios from 'axios';


const CreateDiary: React.FC = () => {

  // 오늘의 날짜
  const today:Date = new Date();
  const weekdays:string[] = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayOfWeek:string = weekdays[today.getDay()];
  const date:string = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${dayOfWeek}`;
  
  
  // 변수 지정
  const [title, setTitle] = useState<string>('')
  const [hashTag, setHashTag] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [removeTagsContent, setRemoveTagsContent] = useState<string>('')
  const [image, setImage] = useState<File | null>(null);

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


  // 일기 제목 변경 이벤트 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 30) {
      setTitle(e.target.value);
    } 
    else {
      return
    }
  };

  // 해시태그 변경 이벤트 핸들러
  const handleTagsChange = (newTags: string[]) => {
    setHashTag(newTags.join(' '));
    // console.log('hashTag:', hashTag)
  }

  // 일기 내용 변경 이벤트 핸들러
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // console.log('content', content)
  };


  // 입력된 일기에서 태그 삭제 함수
  const removeHTMLTags = (str: string) => {
    const newStr = str.replace(/<[^>]*>?/gm, '');
    setRemoveTagsContent(newStr)
    // console.log('removeTagsContent', removeTagsContent)
    return 
  };

  // content 상태가 변경될 때마다 setRemoveTagsContent 업데이트
  useEffect(() => {
    removeHTMLTags(content);
  }, [content]);


  // 이미지 변경 이벤트 핸들러
  const handleImageChange = (selectedImage: File | null) => {
    setImage(selectedImage);
 };

 // 일기등록 버튼을 누르면 실행되는 함수
 const createDiary = () => {
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
    // 여기에 성공 시 수행할 작업을 추가할 수 있습니다. 예를 들어, 사용자에게 알림을 보내거나 화면을 갱신할 수 있습니다.
  })
  .catch(function (error) {
    console.log(error);
    // 여기에 실패 시 수행할 작업을 추가할 수 있습니다. 예를 들어, 오류 메시지를 사용자에게 보여주는 것입니다.
  });

 }

  
  

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen py-16">
      <div className='w-full flex items-center justify-between px-16'> {/* 위쪽 구역 */}
        {/* 오늘 날짜 */}
        <div className='w-[85px]'></div>
        <label className="flex items-center gap-4 justify-center">
          <p className="bg-bg_main text-3xl text-center">{date}</p>
          <FontAwesomeIcon icon={faVolumeHigh} />                   
        </label>
        <div>
          <button onClick={createDiary} className="border text-xl py-2 px-4 border-button_border bg-bg_button rounded-lg">일기 등록</button>   
        </div>
                  
      </div>
      <div className="flex w-full h-full justify-between pt-16"> 
        <div className="w-1/2 flex flex-col items-center px-16"> {/* 왼쪽 구역 */}          
          {/* 제목 입력 */}
          <div className="w-full flex items-center justify-center border-b-2 border-font_main">
            <FontAwesomeIcon icon={faPenToSquare} className='text-2xl' />
            <input value={title} onChange={handleTitleChange} className="bg-bg_main w-full text-center mr-6 text-xl p-2 border-none focus:outline-none " type="text" placeholder='제목을 입력해 주세요' />
          </div>
          {/* 해시태그입력 */}
          <div className="w-full flex items-center justify-center mt-10">
            <InputHashTag onTagsChange={handleTagsChange}/>
          </div>
          {/* 이미지 첨부 */}
          <div className="w-full h-full max-h-[316px] flex items-center justify-center mt-10 ">
            <UploadImage onImageChange={handleImageChange}/>   
          </div> 
        </div>

        <div className="w-px bg-bg_line h-full pt-20 pb-10"></div> {/* 구분 선 */}

        <div className="w-1/2 flex flex-col items-center px-16"> {/* 오른쪽 구역 */}
          {/* 일기 내용 작성 */}
          <div className="w-full ">
            <QuillEditor onChange={handleContentChange} placeholder={''} />
          </div>
        </div>
      </div>
    </div>

  );
};

export default CreateDiary;

