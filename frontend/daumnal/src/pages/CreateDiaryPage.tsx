import React, { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import InputHashTag from '../components/diary/createDiaryPage/InputHashTag';
import QuillEditor from '../components/diary/createDiaryPage/QuillEditor';


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
  const [image, setImage] = useState<string | null>(null);


  // 일기 제목 변경 이벤트 핸들러
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    // console.log('title:', title)
  };

  // 해시태그 변경 이벤트 핸들러
  const handleTagsChange = (newTags: string[]) => {
    setHashTag(newTags.join(' '));
    console.log('hashTag:', hashTag)
  }

  // 일기 내용 변경 이벤트 핸들러
  const handleContentChange = (newContent: string) => {
    setContent(newContent);
    // console.log('content:', content)
  };

  // 입력된 일기에서 태그 삭제 함수
  const removeHTMLTags = (str: string) => {
    return str.replace(/<[^>]*>?/gm, '');
  };

  const removeTagsContent: string = removeHTMLTags(content);

  // 이미지 첨부 변경 이벤트 처리
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

    if (e.target.files && e.target.files.length > 0) {
      const uploadImage:File = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(uploadImage);
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImage(dataUrl);
      };     
    }

  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form className=" max-w-[700px] mt-20 flex flex-col items-center justify-center ">
        {/* 오늘 날짜 */}
        <label className="w-full flex flex-col items-center mt-10">
          <input className="bg-bg_main text-3xl text-center w-full" type="text" name="date" value={date} readOnly />
        </label>
        {/* 오늘의 일기 */}
        <div className="flex items-center gap-4 justify-center mt-10">
          <p className='text-4xl'>오늘의 일기</p>
          <FontAwesomeIcon icon={faVolumeHigh} />
        </div>
        {/* 제목 입력 */}
        <div className="w-2/3 flex items-center justify-center mt-20 border-b-2 border-font_main">
          <FontAwesomeIcon icon={faPenToSquare} className='text-3xl' />
          <input value={title} onChange={handleTitleChange} className="bg-bg_main w-full text-2xl p-2 border-none focus:outline-none " type="text" placeholder='제목을 입력해 주세요' />
        </div>
        {/* 해시태그입력 */}
        <div className="w-2/3 flex items-center justify-center mt-10 border-b-2 border-font_main">
          <InputHashTag onTagsChange={handleTagsChange}/>
        </div>
        {/* 일기 내용 작성 */}
        <div className="mt-20">
          <QuillEditor onChange={handleContentChange} placeholder={''} />
        </div>
        {/* 이미지 첨부 */}
        <div className="flex items-center justify-center mt-20 ">
          <input type="file" onChange={handleImageChange} />
        </div> 
      </form>
      <button className="my-4">일기 등록</button> {/* 버튼을 폼 밖에 위치시키고, 마진을 주어서 간격을 조정합니다. */}
    </div>
  );
};

export default CreateDiary;


