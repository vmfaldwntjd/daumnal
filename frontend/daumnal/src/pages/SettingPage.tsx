import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axiosInstance';
import NicknameModal from '../components/modal/NicknameModal';

const { Kakao } = window;

const SettingPage: React.FC = () => {

  // 닉네임 상태 관리
  const [nickname, setNickname] = useState('');
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 닉네임 조회 요청
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/nickname`)
      .then(response => {
        // 요청 성공 시 닉네임 상태 업데이트
        if (response.data.code === 200) {
          setNickname(response.data.data.memberNickname);
        }
      })
      .catch(error => console.error("닉네임 조회 중 오류가 발생했습니다.", error));
  }, []);

  const navigate = useNavigate();

  const logoutWithKakao = async () => {
    try {
      // Kakao.Auth.logout 함수 호출
      await Kakao.Auth.logout();

      // axios를 이용하여 서버에 로그아웃 요청을 보냅니다.
      const response = await axiosInstance.post(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/logout`);

      if (response.data.code === 200) {
        console.log(response.data.message); 

        localStorage.clear();

        alert('로그아웃 되었습니다!');

        navigate('/');
      }

    } catch (error) {
      console.error('카카오 로그아웃 에러:', error);
    }
  };

  const updateNickname = async (newNickname: string) => {
    try {
      // axiosInstance를 이용하여 서버에 PATCH 요청을 보냅니다.
      const response = await axiosInstance.patch(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/nickname`, {
        memberNickname: newNickname
      });
  
      // 서버 응답이 성공(200)이면 알림창을 띄우고 페이지를 리로드합니다.
      if (response.data.code === 200) {
        alert('닉네임이 수정되었습니다.');
        setIsModalOpen(false); // 모달을 닫습니다.
        setNickname(newNickname); // 새로운 닉네임으로 상태 업데이트
      } else {
        // 응답 코드가 200이 아닌 경우, 에러 메시지를 알림창으로 띄웁니다.
        alert(`닉네임 변경에 실패했습니다: ${response.data.message}`);
      }
    } catch (error) {
      console.error('닉네임 변경 중 오류가 발생했습니다.', error);
      alert('닉네임 변경 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };
  
  return (
    <div className='text-center mt-20' style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '85vh', // 부모 컨테이너의 높이를 전체 화면으로 설정
    }}>
      <div style={{ 
        fontSize: '35px',
        marginTop: '10px',
      }}>
        {nickname ? `${nickname}의 일기장` : `익명의 일기장`}
      </div>
      <hr style={{
        width: '823px',
        backgroundColor: '#696864',
        height: '1.5px',
        border: 'none',
        marginTop: '10px',
      }}/>
      <div className="image-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
        <img
          src="./image/setting_nickname.png"
          alt="닉네임 수정"
          className="mt-10 hover:cursor-pointer"
          style={{ width: '823px', height: '82px' }}
          onClick={() => setIsModalOpen(true)}
        />
        <img
          src="./image/setting_BGM.png"
          alt="BGM 변경"
          className="mt-10 hover:cursor-pointer"
          style={{ width: '823px', height: '82px' }}
        />
        <img
          src="./image/setting_logout.png"
          alt="로그아웃"
          className="mt-10 hover:cursor-pointer"
          style={{ width: '823px', height: '82px' }}
          onClick={logoutWithKakao}
        />
      </div>
      <NicknameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(newNickname) => updateNickname(newNickname)}
      />
    </div>
    
  );
};

export default SettingPage;
