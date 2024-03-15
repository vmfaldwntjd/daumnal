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
        익명의 일기장
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
    </div>
    
  );
};

export default SettingPage;
