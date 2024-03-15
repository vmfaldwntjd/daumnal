import React, {ChangeEvent, useState, useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faCircleXmark } from "@fortawesome/free-regular-svg-icons";

interface UploadImageProps {
    onImageChange: (image: File | null) => void; // 상위 컴포넌트로 이미지 상태를 전달하기 위한 props
  }

const UploadImage: React.FC<UploadImageProps> = ({ onImageChange }) => {
    const [uploadImage, setUploadImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string>('');


        // 이미지 첨부 변경 이벤트 처리
    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {

        if (e.target.files && e.target.files.length > 0) {
        const uploadFile:File = e.target.files[0]
        setUploadImage(uploadFile);      
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
        setUploadImage(null)
        setImagePreview('')

        const fileInput = document.getElementById('fileInput') as HTMLInputElement;
        if (fileInput) {
        fileInput.value = '';
        }
    }

    useEffect(() => {
        onImageChange(uploadImage); // uploadImage 상태가 변경될 때마다 상위 컴포넌트로 전달
    }, [uploadImage]);

  return (
    <div className="w-full h-full max-h-[316px] flex items-center justify-center ">
    <input type="file" onChange={handleImageChange} className="hidden" id="fileInput" />
    <div className="relative w-full h-full">
        {imagePreview && (
        <>
            <img src={imagePreview} alt="Diary" className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 object-cover object-contain max-w-[90%] max-h-[90%]" />
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
            stroke: imagePreview ? 'none' : 'rgba(156, 155, 150, 0.7)', 
            strokeWidth: imagePreview ? 1 : 2, 
            strokeDasharray: imagePreview ? "none" : "10, 5"
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