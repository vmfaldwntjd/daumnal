import React, { useState, useEffect, SetStateAction, Dispatch } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faTimes } from '@fortawesome/free-solid-svg-icons';

interface InputHashTagProps {
  setHashTags: (tags: string[]) => void;
  initialTags: string[];
}

const InputHashTag: React.FC<InputHashTagProps> = ({ setHashTags, initialTags }) => {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleHashTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\s/g,'');
    const regex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]/g;

    if (newValue.length > 10 || regex.test(newValue)) {
      return;
    }

    setCurrentTag(newValue);

  }

  const [isAlert, setIsAlert] = useState<boolean>(false)
  const handleAddTag = () => {
    if (tags.length < 3 && currentTag !== '') {
      const newTags = [...tags, currentTag];
      setTags(newTags);
      setCurrentTag('');
    }
    else {
      setIsAlert(true)
    }
  }

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    setIsAlert(false)
  }

  useEffect(() => {
    setHashTags(tags)
  }, [tags])

  return (
    <div className='w-full'>
    <div className='w-full flex items-center justify-between border-b-2 border-font_main'>
        <FontAwesomeIcon icon={faHashtag} className='text-2xl'/>
        <input className="bg-bg_main w-2/3 p-2 text-center ml-2 text-xl border-none focus:outline-none " value={currentTag} onChange={handleHashTagChange}  
        onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleAddTag();
              event.preventDefault();
            }
          }} type="text" placeholder='해시태그를 입력해 주세요'/>
        <button type="button" onClick={handleAddTag} className='border border-button_border bg-bg_button rounded-lg text-font_main px-2'>추가</button>       
    </div>  
    <div>
      {isAlert && <div className='text-red-500 px-6 pt-2'>해시태그는 최대 3개까지 입력 가능합니다.</div>}
      <div className='flex flex-wrap px-6 mt-4'>
        {tags.map((tag, index) => (
          <div key={index} className='mr-2 mb-2'>
            <div className='bg-bg_hashtag  text-font_main px-2 rounded-full inline-flex items-center'>
              <span>{tag}</span>
              <button type="button" onClick={() => handleDeleteTag(index)} className='ml-2'>x</button>
            </div>            
          </div>
        ))}    
      </div>
    </div>   
    </div>



    

  );
};

export default InputHashTag;
