// KakaoRedirectHandler.tsx 수정된 부분
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NicknameModal from '../modal/NicknameModal';
import axiosInstance from '../../pages/api/axiosInstance';

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
      const redirect_uri = `${process.env.REACT_APP_SERVER_BASE_URL}/oauth`;

      const response = await axios.post(
        `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${client_id}&redirect_uri=${redirect_uri}&code=${code}`,
        {},
        {
          headers: {
            'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        }
      );

      console.log(response)

      window.Kakao.Auth.setAccessToken(response.data.access_token);

      const userInfoResponse = await window.Kakao.API.request({
        url: '/v2/user/me',
      });

      const loginResponse = await axiosInstance.post(`http://j10a107.p.ssafy.io:8080/members/login`, {
        socialId: userInfoResponse.id.toString(),
        socialProvider: 'kakao',
      });

      const responseData = loginResponse.data;
      if (responseData && responseData.code === 200) {
        console.log(responseData)
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
  try {
    const memberId = localStorage.getItem('memberId'); // 로컬 스토리지에서 memberId 가져오기
    if (!memberId) {
      console.error('memberId 정보를 찾을 수 없습니다.');
      return;
    }

    const response = await axiosInstance.post(
      `${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/nickname`,
      { memberNickname: nickname },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.code === 201) {
      // 성공 응답 처리
      console.log(response.data.message); // 성공 메시지 로그로 출력
      navigate('/main'); // 메인 페이지로 이동
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const statusCode = error.response?.status;
      switch (statusCode) {
        case 400:
          alert('닉네임을 올바르게 입력해주세요.');
          break;
        case 403:
          alert('닉네임 등록이 불가능합니다.');
          break;
        default:
          console.error('닉네임 저장 과정에서 오류가 발생했습니다:', error);
      }
    } else {
      console.error('알 수 없는 오류가 발생했습니다:', error);
    }
  }
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