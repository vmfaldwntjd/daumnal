import React from 'react';

const { Kakao } = window;

const LoginPage: React.FC = () => {

  const loginWithKakao = async () => {
    try {
      await Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth',
        scope: 'profile_nickname',
        prompt: 'select_account',
      });
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
    }
  };

  return (
    <div className='text-center mt-20' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <style>
        {`
          .bracket, .nextDay, .introText {
            color: #696864;
          }
          
          .bracket {
            font-size: 50px; 
            margin: 0 50px;
          }
          
          .introText {
            display: inline;
            font-size: 25px;
            font-weight: bold; 
          }
        `}
      </style>
      <img src="/image/login_logo.png" alt="로그인 로고" style={{width: '330px', height: '198px'}}/>
      <div style={{ height: '50px' }}></div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <span className="bracket">[</span>
        <p className="introText">
          일기와 음악과 힐링,<br />
          여러분의 [다음:날]을 시작하세요.
        </p>
        <span className="bracket">]</span>
      </div>
      <div style={{ height: '50px' }}></div>
      <button onClick={loginWithKakao} style={{ border: 'none', background: 'transparent', marginTop: '20px', width: '310px', height: '47px' }}>
        <img src="/image/kakao_login.png" alt="카카오 로그인" />
      </button>
    </div>
  );
};

export default LoginPage;