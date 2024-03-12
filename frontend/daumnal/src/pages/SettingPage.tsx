import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Kakao } = window;

const SettingPage: React.FC = () => {

  const navigate = useNavigate();

  const logoutWithKakao = async () => {
    try {
      // Kakao.Auth.logout 함수 호출
      await Kakao.Auth.logout();
      console.log(Kakao.Auth.getAccessToken());

      alert('로그아웃 되었습니다!');

      navigate('/');

    } catch (error) {
      console.error('카카오 로그아웃 에러:', error);
    }
  };

  return (
    <div className='text-center mt-20'>
      <h1>Setting</h1>
      <button className='mt-5 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700' onClick={logoutWithKakao}>
        로그아웃
      </button>
    </div>
  );
};

export default SettingPage;
