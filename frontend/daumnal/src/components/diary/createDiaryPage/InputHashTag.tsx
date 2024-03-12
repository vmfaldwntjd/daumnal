import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHashtag, faTimes } from '@fortawesome/free-solid-svg-icons';

interface InputHashTagProps {
  onTagsChange: (tags: string[]) => void;
}

const InputHashTag: React.FC<InputHashTagProps> = ({ onTagsChange }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleHashTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value.replace(/\s/g,'');
    const regex = /[^a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣_]/g;

    if (newValue.length >= 10 || regex.test(newValue)) {
      return;
    }

    setCurrentTag(newValue);

  }

  const [isAlert, setIsAlert] = useState<boolean>(false)
  const handleAddTag = () => {
    if (tags.length < 3 && currentTag !== '') {
      const newTags = [...tags, currentTag];
      setTags(newTags);
      onTagsChange(newTags); 
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
    onTagsChange(newTags);
    setIsAlert(false)
  }

  useEffect(() => {
    onTagsChange(tags);
  }, [tags])

  return (
    <div>
        <FontAwesomeIcon icon={faHashtag} className='text-2xl'/>
        <input className="bg-bg_main w-60 p-2 text-xl border-none focus:outline-none " value={currentTag} onChange={handleHashTagChange}  
        onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleAddTag();
              event.preventDefault();
            }
          }} type="text" placeholder='해시태그를 입력해 주세요'/>
        <button type="button" onClick={handleAddTag} className='px-1 border border-gray-900 rounded-md bg'>추가</button>
        {isAlert && <div className='text-red-500 px-6'>해시태그는 최대 3개까지 입력 가능합니다.</div>}
        {tags.map((tag, index) => (
          <div key={index} className='px-6 '>
            <div className=' px-2 border border-font_main rounded-full inline-flex items-center'>
              <span>{tag}</span>
              <button type="button" onClick={() => handleDeleteTag(index)} className='ml-2'>x</button>
            </div>
            
          </div>
        ))}

    </div>
  );
};

export default InputHashTag;
