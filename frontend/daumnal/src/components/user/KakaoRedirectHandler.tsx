// KakaoRedirectHandler.tsx 수정된 부분
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NicknameModal from '../modal/NicknameModal';
import axiosInstance from '../../pages/api/axiosInstance';
import Swal from 'sweetalert2';

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
      // const redirect_uri = `${process.env.REACT_APP_LOCAL_BASE_URL}/oauth`;
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
        // 기존 로컬 스토리지 정보를 항상 삭제합니다.
        localStorage.removeItem('memberId');
        localStorage.removeItem('memberAccessToken');
        localStorage.removeItem('memberRefreshToken');
      
        // 새로운 로그인 정보로 로컬 스토리지를 업데이트합니다.
        localStorage.setItem('memberId', responseData.data.memberId);
        localStorage.setItem('memberAccessToken', responseData.data.memberAccessToken);
        localStorage.setItem('memberRefreshToken', responseData.data.memberRefreshToken);
      
        setIsFirstLogin(responseData.data.firstLogin);
        if (!responseData.data.firstLogin) {
          navigate('/main', { replace: true });
        }
      } else {
        // console.error('로그인 과정에서 예상치 못한 오류가 발생했습니다:', responseData.message);
      }      
    } catch (error) {
      // console.error('로그인 과정에서 오류가 발생했습니다:', error);
    }
  };
  
  useEffect(() => {
    handleKakaoLogin();
  }, []);

  const handleNicknameSubmit = async (nickname: string) => {
    try {
      const memberId = localStorage.getItem('memberId'); // 로컬 스토리지에서 memberId 가져오기
      if (!memberId) {
        // console.error('memberId 정보를 찾을 수 없습니다.');
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
        // console.log(response.data.message); // 성공 메시지 로그로 출력
        navigate('/main', { replace: true }); // 메인 페이지로 이동
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data.message;
        switch (statusCode) {
          case 400:
            if(errorMessage === "닉네임을 입력해주세요!" || errorMessage === "닉네임 입력시 한글 또는 영어로 입력해주세요!" || errorMessage === "닉네임 입력 길이는 15자 이하로 입력 바랍니다!" || errorMessage === "이미 존재한 닉네임입니다!") {
              Swal.fire({
                title: "닉네임 입력 오류",
                text: errorMessage,
                icon: "info"
              });
            }
            break;
          case 403:
            if(errorMessage === "회원님은 이미 닉네임 등록 완료하였습니다!" || errorMessage === "해당 회원은 로그아웃 한 상태입니다!" || errorMessage === "해당 회원은 탈퇴 처리된 회원입니다!") {
              Swal.fire({
                title: "닉네임 입력 오류",
                text: errorMessage,
                icon: "info"
              });
            }
            break;
          case 401:
            if(errorMessage === "유효하지 않는 토큰입니다!") {
              Swal.fire({
                title: "닉네임 입력 오류",
                text: errorMessage,
                icon: "info"
              });
            }
            break;
          default:
            // console.error('닉네임 저장 과정에서 오류가 발생했습니다:', error);
        }
      } else {
        // console.error('알 수 없는 오류가 발생했습니다:', error);
      }
    }
  };
  
// 로그아웃 처리 함수
const handleLogout = async () => {
  try {
    localStorage.clear();
    // console.log('로그아웃 처리 성공')
  } catch (error) {
    // console.error('로그아웃 과정에서 오류가 발생했습니다:', error);
  }
};

  return (
    <>
      <NicknameModal
        isOpen={isFirstLogin === true}
        onClose={() => setIsFirstLogin(false)}
        onSubmit={handleNicknameSubmit}
        isFromSettingPage={false}
      />
    </>
  );
};

export default KakaoRedirectHandler;