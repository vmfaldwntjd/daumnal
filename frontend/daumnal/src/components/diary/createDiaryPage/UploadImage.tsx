import React, {ChangeEvent, useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

interface UploadImageProps {
    setImage: (image: File | null) => void; // 상위 컴포넌트로 이미지 상태를 전달하기 위한 props
    setImagePreview: (imagePreview: string) => void;
    initialImage: File | null
  }

const UploadImage: React.FC<UploadImageProps> = ({ setImage, setImagePreview, initialImage }) => {
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [uploadImagePreview, setUploadImagePreview] = useState<string>('');

    useEffect(() => {
        // 초기 이미지 및 이미지 변경에 대한 로직을 하나의 useEffect로 통합
        const imageToPreview = uploadImage || initialImage;
        if (imageToPreview) {
            const reader = new FileReader();
            reader.readAsDataURL(imageToPreview);
            reader.onloadend = () => {
                const result = reader.result as string;
                setUploadImagePreview(result);
                setImagePreview(result); // 미리보기 URL을 상위 컴포넌트로 직접 전달
                // console.log(result)
            };
        } else {
            // 이미지가 없는 경우 상태 초기화
            setUploadImagePreview('');
            setImagePreview('');
        }
    }, [uploadImage, initialImage, setImagePreview]);

    useEffect(() => {
        setImage(uploadImage); // 상위 컴포넌트로 이미지 파일 전달
    }, [uploadImage, setImage]);

    
        // 이미지 첨부 변경 이벤트 처리
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
        const uploadFile:File = e.target.files[0]

        const allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;

        if (!allowedExtensions.exec(uploadFile.name)) {
            alert('지원되는 파일 형식이 아닙니다.');
            return;
        }

        if (uploadFile.size > 3 * 1024 * 1024) {
            alert('3MB 이하의 이미지만 첨부 가능합니다');
            return;
        }

        setUploadImage(uploadFile);       
        }

    };

    const handleClick = () => {
        document.getElementById('fileInput')?.click();
    };

    const handleRemoveImage = () => {
        setUploadImage(null)
        setUploadImagePreview('')

        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
        fileInput.value = '';
        }
    }


  return (
    <div className="w-full h-full max-h-[316px] flex items-center justify-center ">
    <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
    <div className="relative w-full h-full">
        {uploadImagePreview && (
        <>
            <img src={uploadImagePreview} alt="Diary" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover object-contain max-w-[90%] max-h-[90%]" />
            <button
            type="button"
            onClick={handleRemoveImage} // 이미지를 삭제하는 함수를 호출
            className="absolute right-2 top-2 transform -translate-y-1/2 translate-x-1/2 cursor-pointer"
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
            stroke: uploadImagePreview ? 'none' : 'rgba(156, 155, 150, 0.7)', 
            strokeWidth: uploadImagePreview ? 1 : 2, 
            strokeDasharray: uploadImagePreview ? "none" : "10, 5"
            }} />
        </svg>
        {!uploadImage && (
        <button type='button' onClick={handleClick}
            className="w-full h-full rounded-lg flex flex-col items-center justify-center bg-transparent focus:outline-none">
            <FontAwesomeIcon icon={faImage} style={{ color: "rgba(105, 104, 100, 0.5)", fontSize: "60px" }} />
            <p className='mt-8 px-2'>오늘의 일기를 대표할 이미지를 첨부해 보세요</p>            
        </button>
        )}
    </div>
    </div>
  )
}

export default UploadImage