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

  const handleAddTag = () => {
    if (tags.length < 3 && currentTag !== '') {
      const newTags = [...tags, currentTag];
      setTags(newTags);
      onTagsChange(newTags); 
      setCurrentTag('');
    }
  }

  const handleDeleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    onTagsChange(newTags);
  }

  useEffect(() => {
    onTagsChange(tags);
  }, [tags])

  return (
    <div>
        <FontAwesomeIcon icon={faHashtag} />
        <input className="bg-bg_main" value={currentTag} onChange={handleHashTagChange} type="text" placeholder='해시태그를 입력해_주세요'/>
        <button onClick={handleAddTag} disabled={tags.length >= 3}>추가</button>
        {tags.map((tag, index) => (
          <div key={index}>
            <span>{tag}</span>
            <button onClick={() => handleDeleteTag(index)}>x</button>
          </div>
        ))}

    </div>
  );
};

export default InputHashTag;
