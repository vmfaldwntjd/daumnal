import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import './QuillEditor.css'

interface QuillEditorProps {
  onChange: (content: string) => void; // 입력 내용 변경 시 호출될 함수
  placeholder: string
}

const QuillEditor: React.FC<QuillEditorProps> = ({ onChange, placeholder }) => {

  const [inputContent, setInputContent] = useState<string>('');

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          ['bold', 'italic', 'underline', 'strike'],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [
            {
              color: [],
            },
            { background: [] },
          ],
        ],
      },
    };
  }, []);

  const handleContentChange = (content: string) => {
    setInputContent(content);
    onChange(content); // 부모 컴포넌트로 변경된 내용 전달
  };

  return <ReactQuill theme="snow" modules={modules}
  value={inputContent}
  onChange={handleContentChange} 
  placeholder='감정을 담아 솔직한 일기를 작성해주세요'/>; 
}

export default QuillEditor;
