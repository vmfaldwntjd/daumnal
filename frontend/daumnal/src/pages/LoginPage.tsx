// // LoginPage.tsx
// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { handleKakaoLogin } from './KakaoRedirectHandler';

// const { Kakao } = window;

// const LoginPage: React.FC = () => {
//   const navigate = useNavigate();

//   const loginWithKakao = async () => {
//     try {
//       const response = await Kakao.Auth.authorize({
//         redirectUri: 'http://localhost:3000/oauth',
//         scope: 'profile_nickname',
//         prompt: 'login',
//       });

//       // handleKakaoLogin 함수를 호출하여 토큰 요청
//       await handleKakaoLogin(navigate);
//     } catch (error) {
//       console.error('카카오 로그인 에러:', error);
//     }
//   };

//   return (
//     <div className='text-center mt-20'>
//       <h1>LoginPage</h1>
//       <button onClick={loginWithKakao} style={{ border: 'none', background: 'transparent' }}>
//         <img src="/image/kakao_login.png" alt="카카오 로그인" style={{ marginTop: '20px' }} />
//       </button>
//     </div>
//   );
// };

// export default LoginPage;

// LoginPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { handleKakaoLogin } from './KakaoRedirectHandler';

const { Kakao } = window;

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const loginWithKakao = async () => {
    try {
      const response = await Kakao.Auth.authorize({
        redirectUri: 'http://localhost:3000/oauth',
        scope: 'profile_nickname',
        prompt: 'login',
      });

      // 로그인 성공 후 토큰 요청
      await handleKakaoLogin(navigate);
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
