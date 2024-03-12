// KakaoRedirectHandler.tsx
import React, { useEffect } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

const { Kakao } = window;

const handleKakaoLogin = async (navigate: (path: string) => void) => {
  try {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get('code');
    if (!code) {
      console.error('카카오 인증 코드가 없습니다.');
      return;
    }


    // 서버로 소셜 ID를 전송하는 로직을 추가
    // axios.post('/api/save-social-id', { socialId: response.data.access_token });


    // 사용자 정보 가져오기
    else {

      const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
      const redirect_uri = `${process.env.REACT_APP_FRONTEND_BASE_URL}/oauth`;

      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,      {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      window.Kakao.Auth.setAccessToken(response.data.access_token); 

      const userInfoResponse = await Kakao.API.request({
      url: '/v2/user/me',
    });

    console.log('사용자 정보:', userInfoResponse);

    // 닉네임 정보 추출
    const nickname = userInfoResponse.kakao_account.profile.nickname;

    // 서버로 닉네임 정보 전송하는 로직 추가
    // axios.post('/api/save-nickname', { nickname });

    // 로그인이 성공하면 mainpage로 이동
    navigate('/mainpage');
  }
  } catch (error: any) {
    console.log('사용자 정보:', error);
  }
};

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    handleKakaoLogin(navigate);
  }, []); 

  return <div>kakao login 완료</div>;
};

export default KakaoRedirectHandler
