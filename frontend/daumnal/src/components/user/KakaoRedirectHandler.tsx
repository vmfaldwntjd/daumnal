// KakaoRedirectHandler.tsx 수정된 부분
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NicknameModal from '../modal/NicknameModal';
import axiosInstance from '../../pages/api/axiosInstance';

const { Kakao } = window;

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
      // const redirect_uri = `${process.env.REACT_APP_SERVER_BASE_URL}/oauth`;
  
  
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
  
      const loginResponse = await axiosInstance.post(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/login`, {
        socialId: userInfoResponse.id.toString(),
        socialProvider: 'kakao',
      });
  
      const responseData = loginResponse.data;
      if (responseData && responseData.code === 200) {
        const localMemberId = localStorage.getItem('memberId');
        if (localMemberId !== responseData.data.memberId) {
          localStorage.removeItem('memberId');
          localStorage.removeItem('memberAccessToken');
          localStorage.removeItem('memberRefreshToken');
  
          localStorage.setItem('memberId', responseData.data.memberId);
          localStorage.setItem('memberAccessToken', responseData.data.memberAccessToken);
          localStorage.setItem('memberRefreshToken', responseData.data.memberRefreshToken);
        }
        setIsFirstLogin(responseData.data.firstLogin);
        if (responseData.data.firstLogin) {
        } else {
          navigate('/main');
        }
      } else if (responseData.code === 403) {
        // // 403 에러 처리, 로그아웃 요청 후 다시 로그인 시도
        // await Kakao.Auth.logout();
        // console.log('카카오 로그아웃 성공')
        // await handleLogout(); // 로그아웃 처리
        // console.log('서버 로그아웃 성공')
        // handleKakaoLogin(); // 다시 로그인 시도
        navigate('/main');
      }
    } catch (error) {
      console.error('로그인 과정에서 오류가 발생했습니다:', error);
      // if (error instanceof Error && 'response' in error) {
      //   const response = (error as any).response;
      //   if (response && response.status === 400) {
      //     const clientId = process.env.REACT_APP_KAKAO_CLIENT_ID;
      //     const redirectUri = encodeURIComponent(`${process.env.REACT_APP_LOCAL_BASE_URL}/oauth`);
      //     const kakaoAuthUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`;
      //     window.location.href = kakaoAuthUrl; // 사용자를 카카오 인증 페이지로 리디렉션
      //   }
      // } else {
      //   console.error('로그인 과정에서 오류가 발생했습니다:', error);
      // }
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

// 로그아웃 처리 함수
const handleLogout = async () => {
  try {
    const response = await axiosInstance.post(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/logout`);
    localStorage.clear();
    console.log('로그아웃 처리:', response.data.message);
  } catch (error) {
    console.error('로그아웃 과정에서 오류가 발생했습니다:', error);
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