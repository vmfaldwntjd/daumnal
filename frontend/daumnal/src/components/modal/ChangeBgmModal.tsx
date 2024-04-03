import React, { useState, useEffect } from 'react';
import axiosInstance from '../../pages/api/axiosInstance';
import Swal from 'sweetalert2';
import styled from 'styled-components';
import Select, { SingleValue } from 'react-select';

interface BGM {
  backgroundMusicId: string;
  backgroundMusicYoutubeId: string;
  backgroundMusicTitle: string;
  backgroundMusicCategory: string;
}

interface OptionType {
  value: string;
  label: string;
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
        Swal.fire({
          title: "BGM 변경 오류",
          text: "BGM 정보를 가져오는 중 오류가 발생했습니다. 관리자에게 문의해보세요.",
          icon: "info"
        });
      }
    };

    const fetchMemberSelectedBGM = async () => {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/background-musics/member-select`);
        if (response.data.code === 200) {
          setSelectedBGM(response.data.data.backgroundMusicId);
        }
      } catch (error) {
        Swal.fire({
          title: "BGM 변경 오류",
          text: "회원의 배경 음악 정보 조회 중 오류가 발생했습니다.",
          icon: "warning"
        });
      }
    };

    if (isOpen) {
      fetchBgms();
      fetchMemberSelectedBGM();
    }
  }, [isOpen]);

  const options: OptionType[] = bgms.map((bgm: BGM) => ({
    value: bgm.backgroundMusicId,
    label: bgm.backgroundMusicTitle,
  }));

  const handleBGMChange = async () => {
    try {
      const response = await axiosInstance.patch(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/background-musics/${selectedBGM}`);
      if (response.data.code === 200) {
        Swal.fire({
          title: "BGM이 변경되었습니다!",
          icon: "success",
          showConfirmButton: false,
          timer: 1500
        });
        onClose();
      }
    } catch (error) {
      // console.error('BGM 변경 중 오류가 발생했습니다.', error);
    }
  };

  const handleChange = (selectedOption: SingleValue<OptionType>) => {
    if (selectedOption) {
      setSelectedBGM(selectedOption.value);
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
            <Select
              value={options.find(option => option.value === selectedBGM)}
              onChange={handleChange}
              options={options}
              isSearchable={false} // 드롭다운 내 검색 필드를 비활성화
              styles={{
                control: (provided, state) => ({
                  ...provided,
                  borderColor: state.isFocused ? 'transparent' : 'transparent', // 포커스 되었을 때와 아닐 때 모두 투명한 테두리 적용
                  boxShadow: 'none', // 박스 쉐도우 제거
                  '&:hover': { borderColor: 'transparent' }, // 마우스 호버 시 테두리 색상
                  width: 'auto',
                  minWidth: '300px',
                }),
                option: (provided, state) => ({
                  ...provided,
                  backgroundColor: state.isFocused ? '#f2f2f2' : 'white',
                  color: 'black',
                  cursor: 'initial',
                }),
              }}
            />
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
