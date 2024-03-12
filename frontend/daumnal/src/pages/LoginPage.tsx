import React from 'react';



const { Kakao } = window;

const LoginPage: React.FC = () => {

  const loginWithKakao = async () => {
    try {
      await Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth',
        scope: 'profile_nickname',
        prompt: 'login',
      });
    } catch (error) {
      console.error('카카오 로그인 에러:', error);
    }
  };

  return (
    <div className='text-center mt-20'>
      <h1>LoginPage</h1>
      <button onClick={loginWithKakao} style={{ border: 'none', background: 'transparent' }}>
        <img src="/image/kakao_login.png" alt="카카오 로그인" style={{ marginTop: '20px' }} />
      </button>
    </div>
  );
};

export default LoginPage;