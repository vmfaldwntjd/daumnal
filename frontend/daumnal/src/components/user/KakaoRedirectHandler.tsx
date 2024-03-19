// KakaoRedirectHandler.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NicknameModal from '../modal/NicknameModal';

const KakaoRedirectHandler = () => {
  const navigate = useNavigate();
  const [isFirstLogin, setIsFirstLogin] = useState<boolean | null>(null); // 첫 로그인 여부를 상태로 관리합니다.

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

      console.log('사용자 정보:', userInfoResponse);

      // 사용자 정보를 바탕으로 서버에 로그인 요청을 보냅니다.
      const loginResponse = await axios.post(`${process.env.REACT_APP_MOCK_SERVER}/members/login`, {
        socialId: userInfoResponse.id.toString(),
        socialProvider: 'kakao',
      });

      const responseData = loginResponse.data;
      console.log(responseData)
      console.log(responseData.data)
      // 변수 이름 변경 및 올바른 경로로 접근
      const isFirstLoginResponse = responseData.data.firstLogin;// 응답 데이터가 정의되어 있는지 확인하고 올바른 경로로 접근
      console.log(isFirstLoginResponse); // 수정된 변수 이름으로 변경

      if (responseData && responseData.code === 200 && responseData.status === "OK") {
        setIsFirstLogin(isFirstLoginResponse); // 첫 로그인 여부에 따라 상태 업데이트
        if (isFirstLoginResponse) {
          // 첫 로그인이면 모달이 올바르게 열릴 것입니다.
        } else {
          navigate('/main'); // 첫 로그인이 아니면 바로 메인 페이지로 이동
        }
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