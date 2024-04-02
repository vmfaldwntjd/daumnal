// 플레이리스트 수정 모달
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faImage } from "@fortawesome/free-solid-svg-icons";
import axiosInstance from '../../pages/api/axiosInstance';
import axiosImage from '../../pages/api/axiosImage';
import Swal from 'sweetalert2';

interface EditPlaylistModalProps {
  onClickToggleModal: () => void; // 모달 토글 함수
  selectedPlaylistId: number | null;
}

const EditPlaylistModal: React.FC<EditPlaylistModalProps> = ({ onClickToggleModal, selectedPlaylistId }) => {
  // 플레이리스트 제목 상태
  const [playlistName, setPlaylistName] = useState('');
  // 플레이리스트 커버 이미지 상태
  const [playlistCover, setPlaylistCover] = useState<File | null>(null);
  // 플레이리스트 커버 이미지 미리보기 상태
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  // 파일 입력(input[type="file"])의 ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 플레이리스트 제목 변경 이벤트 핸들러
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistName(event.target.value);
  };

  // 플레이리스트 커버 이미지 변경 이벤트 핸들러
  const handleCoverChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedFile = event.target.files[0];
      setPlaylistCover(selectedFile);

      // 선택된 파일의 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  // 플레이리스트 커버 이미지 삭제 핸들러
  const handleDeleteCover = () => {
    setPlaylistCover(null);
    setPreviewImage(null);
    // 파일 입력(input[type="file"]) 값 초기화
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // 플레이리스트 정보 변경
  useEffect(() => {
    if (selectedPlaylistId) {
      axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${selectedPlaylistId}`)
        .then(response => {
          // console.log('해당 플레이리스트 정보 요청 성공!', response.data);
          if (response.data.code === 200) {
            // console.log(`${response.data.status}: ${response.data.message}`);
            setPlaylistName(response.data.data.playlistName);
            setPreviewImage(response.data.data.playlistCoverUrl);
          } else {
            // console.log(`${response.data.status}: ${response.data.message}`);
          }
        })
        .catch(error => {
          // console.error('해당 플레이리스트 정보 요청 실패!', error);
        });
    }
  }, [selectedPlaylistId]);

  // 수정 확인 요청 함수
  const handleConfirm = () => {
    if (selectedPlaylistId) {
      const formData = new FormData();
      formData.append('playlistName', playlistName);
      if (playlistCover) {
        formData.append('playlistCover', playlistCover);
      }

      axiosImage.patch(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/playlists/${selectedPlaylistId}`, formData)
        .then(response => {
          // console.log('해당 플레이리스트 정보 수정 요청 성공!', response.data);
          if (response.data.code === 200) {
            // console.log(`${response.data.status}: ${response.data.message}`);
            Swal.fire({
              title: "플레이리스트 정보 수정이 완료되었습니다",
              icon: "success",
              timer: 1000
            });
            window.location.reload(); // 페이지 새로고침
          } else {
            // console.log(`${response.data.status}: ${response.data.message}`);
          }
        })
        .catch(error => {
          // console.error('해당 플레이리스트 정보 수정 요청 실패!', error);
        });
    }
  };

  return (
    <ModalBackdrop onClick={onClickToggleModal}> {/* 배경 클릭 시 모달 닫기 */}
      <ModalContent onClick={(e) => e.stopPropagation()}> {/* 모달 컨텐츠 클릭 시 버블링 방지 */}
        {/* 플레이리스트 제목 */}
        <div className="flex items-center justify-center w-full border-b-2 border-[#9c9388] mb-8">
          <FontAwesomeIcon icon={faPenToSquare} className='text-3xl text-[#9c9388]' />
          <TitleInput type="text" value={playlistName} placeholder='플레이리스트 이름을 입력해 주세요' onChange={handleTitleChange} />
        </div>
        {/* 플레이리스트 커버 이미지 */}
        <div className="relative w-full mb-8">
          {/* 점선 */}
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0" style={{ pointerEvents: 'none' }}>
            <rect x="1" y="1" width="99%" height="99%" rx="8" ry="8"
                style={{ 
                fill: "none", 
                stroke: previewImage ? 'none' : '#9c9388', 
                strokeWidth: previewImage ? 1 : 2, 
                strokeDasharray: previewImage ? "none" : "10, 5"
                }} />
          </svg>
          {/* 파일 입력(input[type="file"]) */}
          <input type="file" accept="image/*" onChange={handleCoverChange} ref={fileInputRef} style={{ display: 'none' }} />
          {/* 이미지 업로드 버튼 */}
          <button className="flex items-center justify-center w-full h-[300px]" onClick={() => fileInputRef.current?.click()}>
            {/* 이미지 미리보기 또는 메시지 */}
            {previewImage ? (
              <PreviewImage src={previewImage} alt="플레이리스트 커버 이미지 미리보기" />
            ) : (
              <p className="text-[#9c9388]">
                <FontAwesomeIcon icon={faImage} className='text-3xl' />
                <p className="text-xl text-[#a9a9a9] mt-2">플레이리스트 커버 이미지를 첨부해 보세요</p>
              </p>
            )}
          </button>
          {/* 이미지 삭제 버튼 */}
          {previewImage && (
            <button className="absolute right-2 top-2 transform -translate-y-1/2 translate-x-1/2 cursor-pointer" onClick={handleDeleteCover}>
              <img src="./image/image_delete.png" alt="이미지 삭제" className='w-10'/>
            </button>
          )}
        </div>
        <Button onClick={handleConfirm}>확인</Button>
      </ModalContent>
    </ModalBackdrop>
  );
};

const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 63.9%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 50%;
  height: 75%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 2px 2px 5px -1px rgba(0, 0, 0, 0.5);
  color: #776B5D;
  position: absolute;
  z-index: 2;
`;

const TitleInput = styled.input`
  width: 100%;
  font-size: 20px;
  padding: 8px;
  border: none;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 70px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(156, 155, 150, 0.5);
  background-color: #FFF1DD;
  font-size: 16px;
`;

const PreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

export default EditPlaylistModal;