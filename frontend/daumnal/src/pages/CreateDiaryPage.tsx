import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faPenToSquare, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import InputHashTag from '../components/diary/createDiaryPage/InputHashTag';
import QuillEditor from '../components/diary/createDiaryPage/QuillEditor';
import UploadImage from '../components/diary/createDiaryPage/UploadImage';
import Loading from '../components/diary/createDiaryPage/Loading';
import DiaryMusicPlayBar from '../components/diary/createDiaryPage/BGMPlayBar';
import axiosInstance from './api/axiosInstance';
import Swal from 'sweetalert2'

interface BackgroundMusic {
  backgroundMusicId: number;
  backgroundMusicYoutubeId: string;
  backgroundMusicTitle: string;
  backgroundMusicCategory: string;
}

// 응답 객체의 타입을 정의합니다.
interface ApiResponse {
  code: number;
  status: string;
  message: string;
  data: BackgroundMusic;
}

const CreateDiary: React.FC = () => {

  // 오늘의 날짜
  const today:Date = new Date();
  const weekdays:string[] = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const dayOfWeek:string = weekdays[today.getDay()];
  const date:string = `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 ${dayOfWeek}`;
  
  
  // 변수 지정
  const [title, setTitle] = useState<string>('')
  const [hashTag, setHashTag] = useState<string>('')
  const [hashTags, setHashTags] = useState<string[]>([])
  const [content, setContent] = useState<string>('')
  const [removeTagsContent, setRemoveTagsContent] = useState<string>('')
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [iconState, setIconState] = useState<boolean>(true);
  const [backgroundMusicYoutubeId, setBackgroundMusicYoutubeId] = useState<string>('');


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
    setHashTags(newTags);
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
    const newStr = str.replace(/<[^>]*>/gm, (match) => {
      return match.startsWith('</') ? '.' : '';
    });
    setRemoveTagsContent(newStr)
    // console.log('removeTagsContent', removeTagsContent)
    return 
  };

  // content 상태가 변경될 때마다 setRemoveTagsContent 업데이트
  useEffect(() => {
    removeHTMLTags(content);
  }, [content]);

  useEffect(() => {
    const fetchBackgroundMusic = async () => {
      try {
        // ApiResponse 타입을 사용하여 axios 응답의 구조를 명시합니다.
        const response = await axiosInstance.get<ApiResponse>(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/background-musics/member-select`);
        if (response.data && response.data.status === 'OK') {
          setBackgroundMusicYoutubeId(response.data.data.backgroundMusicYoutubeId);
        }
      } catch (error) {
        // console.error('배경 음악 정보를 가져오는 데 실패했습니다.', error);
      }
    };

    fetchBackgroundMusic();
  }, []);


  // 이미지 변경 이벤트 핸들러
  const handleImageChange = (selectedImage: File | null) => {
    setImage(selectedImage);
 };


 // 일기등록 버튼을 누르면 실행되는 함수
 const goToLoadingPage = () => {

  if (title && removeTagsContent &&  removeTagsContent.length >= 20 && removeTagsContent.length <= 3000 ) {
    setIsLoading(true);
  }

  else if (!title) {
    Swal.fire({
      title: "제목을 입력해주세요",
      text: "제목은 최대 20자까지 입력 가능합니다",
      icon: "warning"
    });
  }

  else if (removeTagsContent.length < 20) {
    Swal.fire({
      title: "일기가 너무 짧아요",
      text: "내용을 20자 이상 입력해주세요",
      icon: "warning"
    });
  }

  else if (removeTagsContent.length > 3000) {
    Swal.fire({
      title: "일기는 최대 3000자까지 입력 가능합니다.",
      text: '현재 글자 수 : ' + removeTagsContent.length,
      icon: "warning"
    });
  }
};

// 아이콘 클릭 이벤트 핸들러
const toggleIcon = () => {
  setIconState(!iconState);
};

  return (
    <div>
    {!isLoading && <div className="flex flex-col items-center justify-center w-full h-screen py-16">
      <div className='w-full flex items-center justify-between px-16'>
        {/* 오늘 날짜 */}
        <div className='w-[85px]'></div>
        <label className="flex items-center gap-4 justify-center">
            <p className="bg-bg_main text-3xl text-center">{date}</p>
            {/* 조건부 렌더링을 사용하여 아이콘 변경 */}
            {iconState ? (
              <button onClick={toggleIcon} ><FontAwesomeIcon icon={faVolumeHigh} /></button>
            ) : (
              <button onClick={toggleIcon} ><FontAwesomeIcon icon={faVolumeXmark} style={{color: "#696864"}}/></button>
            )}
          </label>
        <div>
          <button onClick={goToLoadingPage} className="border text-xl py-2 px-4 border-button_border bg-bg_button rounded-lg">일기 등록</button>   
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
            <InputHashTag setHashTags={handleTagsChange} initialTags={hashTags}/>
          </div>
          {/* 이미지 첨부 */}
          <div className="w-full h-full max-h-[316px] flex items-center justify-center mt-10 ">
            <UploadImage setImage={handleImageChange} setImagePreview={setImagePreview} initialImage={image}/>   
          </div> 
        </div>

        <div className="w-px bg-bg_line h-full pt-20 pb-10"></div> {/* 구분 선 */}

        <div className="w-1/2 flex flex-col items-center px-16"> {/* 오른쪽 구역 */}
          {/* 일기 내용 작성 */}
          <div className="w-full ">
            <QuillEditor setContent={handleContentChange} placeholder={''} initialContent={content} />
          </div>
        </div>

      </div>
    </div>}

    {/* Loading 모달 */}
    <div>
     {isLoading && <Loading setIsLoading={setIsLoading} removeTagsContent={removeTagsContent} title={title} hashTag={hashTag} content={content} image={image} />} 
    </div>
    <DiaryMusicPlayBar
      backgroundMusicYoutubeId={backgroundMusicYoutubeId}
      playState={iconState}
    />
  </div>
  );
};


export default CreateDiary;