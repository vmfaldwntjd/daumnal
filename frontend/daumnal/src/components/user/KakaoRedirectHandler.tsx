// KakaoRedirectHandler.tsx 수정된 부분
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NicknameModal from '../modal/NicknameModal';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null);

  const handleKakaoLogin = async () => {
    try {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get('code');
      if (!code) {
        console.error('카카오 인증 코드가 없습니다.');
        return;
      }

      const client_id = process.env.REACT_APP_KAKAO_CLIENT_ID;
      const redirect_uri = `${process.env.REACT_APP_LOCAL_BASE_URL}/oauth`;

      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      window.Kakao.Auth.setAccessToken(response.data.access_token);

      const userInfoResponse = await window.Kakao.API.request({
        url: '/v2/user/me',
      });

      const loginResponse = await axios.post(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/login`, {
        socialId: userInfoResponse.id.toString(),
        socialProvider: 'kakao',
      });

      const responseData = loginResponse.data;
      if (responseData && responseData.code === 200) {
        // 여기서 로컬 스토리지에 저장하는 로직을 추가합니다.
        localStorage.setItem('memberId', responseData.data.memberId);
        localStorage.setItem('memberAccessToken', responseData.data.memberAccessToken);
        localStorage.setItem('memberRefreshToken', responseData.data.memberRefreshToken);

        setIsFirstLogin(responseData.data.firstLogin);
        if (responseData.data.firstLogin) {
          // 첫 로그인이면 닉네임 모달을 띄웁니다.
        } else {
          // 첫 로그인이 아니라면 바로 메인 페이지로 이동합니다.
          navigate('/main');
        }
      } else if (responseData.code === 403) {
        // 이미 로그인 한 상태라면 메인 페이지로 이동합니다.
        navigate('/main');
      }
    } catch (error) {
      console.error('로그인 과정에서 오류가 발생했습니다:', error);
    }
  };

  useEffect(() => {
    handleKakaoLogin();
  }, []);

 // 닉네임 제출 후 처리
 const handleNicknameSubmit = async (nickname: string) => {
  // 여기서 닉네임을 서버에 저장하는 API 호출 로직 추가
  console.log(nickname); // 예시로 콘솔에 출력
  navigate('/main'); // 닉네임 저장 후 메인 페이지로 이동
};

  return (
    <>
      <NicknameModal
        isOpen={isFirstLogin === true}
        onClose={() => setIsFirstLogin(false)}
        onSubmit={handleNicknameSubmit}
      />
    </>
  );
};

export default KakaoRedirectHandler;