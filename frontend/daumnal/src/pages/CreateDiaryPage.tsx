import React, { ChangeEvent, useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { faImage, faCircleXmark } from "@fortawesome/free-regular-svg-icons";
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
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('')


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
      const uploadFile:File = e.target.files[0]
      setImage(uploadFile);      
      console.log('uploadImage', e.target.files[0] )
      const reader = new FileReader();
      reader.readAsDataURL(uploadFile);
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        setImagePreview(dataUrl);
        
      };
      console.log('imageUrl', imagePreview )     
    }

  };

  const handleClick = () => {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleRemoveImage = () => {
    setImage(null)
    setImagePreview('')

    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  }
  

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen py-16">
      <div className='w-full flex items-center justify-between px-16'>
        {/* 오늘 날짜 */}
        <div className='w-[85px]'></div>
        <label className="flex items-center gap-4 justify-center">
          <p className="bg-bg_main text-3xl text-center">{date}</p>
          <FontAwesomeIcon icon={faVolumeHigh} />                   
        </label>
        <div>
          <button className="border text-xl py-2 px-4 border-button_border bg-bg_button rounded-lg">일기 등록</button>   
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
            <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
            <div className="relative w-full h-full">
              {imagePreview && (
                <>
                  <img src={imagePreview} alt="Diary" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover object-contain max-w-full max-h-full" />
                  <button
                    type="button"
                    onClick={handleRemoveImage} // 이미지를 삭제하는 함수를 호출
                    className="absolute right-0 top-0 transform -translate-y-1/2 translate-x-1/2 cursor-pointer"
                    style={{ outline: 'none', background: 'transparent' }}
                  >
                  <img src="./image/image_delete.png" alt="" className='w-10'/>
                  </button>
                </>
              )}
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0" style={{ pointerEvents: 'none' }}>
                <rect x="1" y="1" width="98%" height="98%" rx="8" ry="8"
                  style={{ 
                    fill: "none", 
                    stroke: imagePreview ? 'none' : 'rgba(156, 155, 150, 0.7)', 
                    strokeWidth: imagePreview ? 1 : 2, 
                    strokeDasharray: imagePreview ? "none" : "10, 5"
                  }} />
              </svg>
              {!image && (
                <button type='button' onClick={handleClick}
                  className="w-full h-full rounded-lg flex flex-col items-center justify-center bg-transparent focus:outline-none">
                  <FontAwesomeIcon icon={faImage} style={{ color: "rgba(105, 104, 100, 0.5)", fontSize: "60px" }} />
                  <p className='mt-8 px-2'>오늘의 일기를 대표할 이미지를 첨부해 보세요</p>            
                </button>
              )}
            </div>
          </div> 
        </div>

        <div className="w-px bg-gray-400 h-full pt-20 pb-10"></div> 

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

