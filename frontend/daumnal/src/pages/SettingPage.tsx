import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './api/axiosInstance';
import NicknameModal from '../components/modal/NicknameModal';
import ChangeBGMModal from '../components/modal/ChangeBgmModal';
import Swal from 'sweetalert2';

const { Kakao } = window;

const SettingPage: React.FC = () => {

  // 닉네임 상태 관리
  const [nickname, setNickname] = useState('');
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  // BGM 모달 상태 관리
  const [isBGMModalOpen, setIsBGMModalOpen] = useState(false);

  // BGM 모달을 여는 함수
  const openBGMModal = () => {
    setIsBGMModalOpen(true);
  };

  // BGM 모달을 닫는 함수
  const closeBGMModal = () => {
    setIsBGMModalOpen(false);
  };

  useEffect(() => {
    // 페이지 로드 시 닉네임 조회 요청
    axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/nickname`)
      .then(response => {
        // 요청 성공 시 닉네임 상태 업데이트
        if (response.data.code === 200) {
          setNickname(response.data.data.memberNickname);
        }
      })
      .catch();
  }, []);

  const navigate = useNavigate();

  const logoutWithKakao = async () => {
    try {
      // Kakao.Auth.logout 함수 호출
      await Kakao.Auth.logout();

      // axios를 이용하여 서버에 로그아웃 요청을 보냅니다.
      const response = await axiosInstance.post(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/logout`);

      // 응답 코드에 따른 조건 분기
      switch(response.data.code) {
        case 200:
          // console.log(response.data.message); 
          localStorage.clear();
          Swal.fire({
            icon: "success",
            title: "로그아웃 되었습니다!",
            showConfirmButton: false,
            timer: 1500
          });
          navigate('/');
          break;
        case 401:
          // jwt 권한이 없는 경우
          // console.error(response.data.message);
          Swal.fire({
            title: "로그아웃 오류",
            text: "유효하지 않는 토큰입니다!",
            icon: "warning"
          });
          navigate('/login'); // 로그인 페이지로 이동하거나 적절한 조치를 취합니다.
          break;
        case 404:
          // 존재하지 않는 회원인 경우
          // console.error(response.data.message);
          Swal.fire({
            title: "로그아웃 오류",
            text: "존재하지 않는 회원 id입니다!",
            icon: "warning"
          });
          break;
        case 403:
          // 이미 로그아웃 된 회원인 경우
          // console.error(response.data.message);
          Swal.fire({
            title: "로그아웃 오류",
            text: "해당 회원은 이미 로그아웃 상태입니다!",
            icon: "warning"
          });
          break;
        default:
          // 회원 탈퇴 처리된 회원 또는 기타 예외 처리
          // console.error('로그아웃 처리 중 예외 발생:', response.data.message);
          Swal.fire({
            title: "로그아웃 오류",
            text: "로그아웃 처리 중 예외 발생했습니다. 관리자에게 문의해보세요.",
            icon: "error"
          });
      }

    } catch (error) {
      // console.error('서버 통신 에러:', error);
      Swal.fire({
        title: "로그아웃 오류",
        text: "서버 통신 에러가 발생했습니다. 관리자에게 문의해보세요.",
        icon: "error"
      });
    }
  };


  const updateNickname = async (newNickname: string) => {
    try {
      const response = await axiosInstance.patch(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/members/nickname`, {
        memberNickname: newNickname
      });
  
      if (response.data.code === 200) {
        Swal.fire({
          icon: "success",
          title: "닉네임이 수정되었습니다.",
          showConfirmButton: false,
          timer: 1500
        });
        setIsModalOpen(false); // 모달을 닫습니다.
        setNickname(newNickname); // 새로운 닉네임으로 상태 업데이트
      } else {
        // 닉네임 관련 예외 상황 처리
        switch(response.data.code) {
          case 403:
            if(response.data.message === "회원님은 닉네임 등록을 하지 않은 상태입니다!" || 
               response.data.message === "초기에 닉네임을 등록하지 않은 회원입니다!") {
              Swal.fire({
                title: "닉네임 변경 오류",
                text: "닉네임을 먼저 등록해주세요!",
                icon: "warning"
              });
            } else if(response.data.message === "해당 회원은 로그아웃 한 상태입니다!" || 
                      response.data.message === "해당 회원은 탈퇴 처리된 회원입니다!") {
              Swal.fire({
                title: "닉네임 변경 오류",
                text: "접근 권한이 없습니다. 로그인 상태를 확인해주세요.",
                icon: "warning"
              });
            }
            break;
          case 400:
            Swal.fire({
              title: "닉네임 변경 실패",
              text: response.data.message,
              icon: "warning"
            });
            break;
          case 401:
            Swal.fire({
              title: "닉네임 변경 실패",
              text: "로그인이 필요합니다. 유효한 세션을 확인해주세요.",
              icon: "warning"
            });
            break;
          default:
            Swal.fire({
              title: "닉네임 변경 실패",
              text: response.data.message,
              icon: "error"
            });
        }
      }
    } catch (error) {
      // console.error('닉네임 변경 중 오류가 발생했습니다.', error);
      Swal.fire({
        title: "닉네임 변경 실패",
        text: "닉네임 변경 중 오류가 발생했습니다. 다시 시도해 주세요.",
        icon: "error"
      });
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
        {nickname ? `${nickname}의 일기장` : `익명의 일기장`}
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
          onClick={() => setIsModalOpen(true)}
        />
        <img
          src="./image/setting_BGM.png"
          alt="BGM 변경"
          className="mt-10 hover:cursor-pointer"
          style={{ width: '823px', height: '82px' }}
          onClick={openBGMModal}
        />
        <img
          src="./image/setting_logout.png"
          alt="로그아웃"
          className="mt-10 hover:cursor-pointer"
          style={{ width: '823px', height: '82px' }}
          onClick={logoutWithKakao}
        />
      </div>
      <NicknameModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={(newNickname) => updateNickname(newNickname)}
        isFromSettingPage={true}
      />
      {isBGMModalOpen && <ChangeBGMModal isOpen={isBGMModalOpen} onClose={closeBGMModal} />}
    </div>
    
  );
};

export default SettingPage;
