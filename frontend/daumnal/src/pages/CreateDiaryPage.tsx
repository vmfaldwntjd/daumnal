import React, { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import InputHashTag from '../components/diary/createDiaryPage/InputHashTag';
import QuillEditor from '../components/diary/createDiaryPage/QuillEditor';


const CreateDiary: React.FC = () => {

  // 오늘의 날짜
  const today = new Date();
  const date:string = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일`;
  
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
    // console.log('hashTag:', hashTag)
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
    <div>
      <form>
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
         <InputHashTag onTagsChange={handleTagsChange}/>
        </div>
        {/* 일기 내용 작성 */}
        <div>
          <QuillEditor onChange={handleContentChange}/>
        </div>
        {/* 이미지 첨부 */}
        <div>
          <input type="file" onChange={handleImageChange} />
        </div> 
      </form>
    </div>
  );
};

export default CreateDiary;


