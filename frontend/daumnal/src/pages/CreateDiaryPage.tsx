import React, { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare, faHashtag, faTimes } from "@fortawesome/free-solid-svg-icons";
import InputHashTag from '../components/diary/InputHashTag';


const CreateDiary: React.FC = () => {

  const today = new Date();
  const date = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  
  const [title, setTitle] = useState<string>('')


  const [content, setContent] = useState()
  const [image, setImage] = useState()



  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    console.log(title)
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Diary 저장 로직을 여기에 작성하실 수 있습니다.
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
  };
  // handleChange, handleSubmit 함수는 이전과 동일하게 작성하시면 됩니다.

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* 오늘 날짜 */}
        <label>
          <input className="bg-bg_main" type="text" name="date" value={date} readOnly />
        </label>
        {/* 오늘의 일기 */}
        <div className="flex items-center gap-4">
          <p>오늘의 일기</p>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </div>
        {/* 제목 입력 */}
        <div>
          <FontAwesomeIcon icon={faPenToSquare} />
          <input value={title} onChange={handleTitleChange} className="bg-bg_main" type="text" placeholder='제목을 입력해 주세요' />
        </div>
        {/* 해시태그입력 */}
        <div>
         <InputHashTag></InputHashTag>
        </div>
        {/* 일기 내용 작성 */}
        <div>
          <input className="bg-bg_main border-2 border-black" type="text" placeholder='일기 내용 작성 에디터'/>
        </div>
        {/* 이미지 첨부 */}
        <div>
          <input type="file" onChange={handleFileChange} />
        </div> 
      </form>
    </div>
  );
};

export default CreateDiary;


