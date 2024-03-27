import React, { useState, useEffect } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';

interface BGM {
  backgroundMusicId: string;
  backgroundMusicYoutubeId: string;
  backgroundMusicTitle: string;
  backgroundMusicCategory: string;
}

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

const ChangeBGMModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [bgms, setBgms] = useState<BGM[]>([]);
  const [selectedBGM, setSelectedBGM] = useState<string>('');

  useEffect(() => {
    const fetchBgms = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/background-musics`);
        if (response.data.code === 200) {
          setBgms(response.data.data.backGroundMusics);
        }
      } catch (error) {
        console.error('BGM 정보를 가져오는 중 오류가 발생했습니다.', error);
      }
    };

    const fetchMemberSelectedBGM = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/background-musics/member-select`);
        if (response.data.code === 200) {
          setSelectedBGM(response.data.data.backgroundMusicId);
        }
      } catch (error) {
        console.error('회원의 배경 음악 정보 조회 중 오류가 발생했습니다.', error);
      }
    };

    if (isOpen) {
      fetchBgms();
      fetchMemberSelectedBGM();
    }
  }, [isOpen]);

  const handleBGMChange = async () => {
    try {
      const response = await axiosInstance.patch(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/background-musics/${selectedBGM}`);
      if (response.data.code === 200) {
        alert('BGM이 변경되었습니다!');
        onClose();
      }
    } catch (error) {
      console.error('BGM 변경 중 오류가 발생했습니다.', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div
            className="flex flex-col items-center bg-bg_nav p-4 rounded-lg shadow-lg"
            style={{ width: '700px', height: '450px', transform: 'translateX(-50px)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <h2 className="text-center text-lg">BGM 선택</h2>
            {/* 이미지 추가 부분 */}
            <div className="flex justify-center">
                <img src="./image/main_tree.png" alt="메인 나무" style={{height: '300px', marginBottom: '2px' }} />
            </div>
            <select
                value={selectedBGM}
                onChange={(e) => setSelectedBGM(e.target.value)}
                className="focus:outline-none p-2 w-[80%] rounded-md text-center"
                >
                {bgms.map((bgm) => (
                    <option key={bgm.backgroundMusicId} value={bgm.backgroundMusicId}>
                    {bgm.backgroundMusicTitle}
                    </option>
                ))}
            </select>
            <div className="flex justify-center mt-4">
                <button
                onClick={handleBGMChange}
                className="bg-bg_button hover:bg-bg_button text-black font-bold py-2 px-4 rounded-lg"
                style={{ color: '#696864', marginRight: '10px' }}>
                확인
                </button>
                <button
                onClick={onClose}
                className="bg-bg_button hover:bg-bg_button text-black font-bold py-2 px-4 rounded-lg"
                style={{ color: '#696864' }}>
                취소
                </button>
            </div>
        </div>
    </div>
  );
};

export default ChangeBGMModal;
