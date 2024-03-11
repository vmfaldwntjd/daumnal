import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface QuillEditorProps {
  onChange: (content: string) => void; // 입력 내용 변경 시 호출될 함수
}

const QuillEditor: React.FC<QuillEditorProps> = ({ onChange }) => {

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
  onChange={handleContentChange} />;
}

export default QuillEditor;