import React, { useState, useEffect } from 'react';
import axiosInstance from './api/axiosInstance';

const MainPage: React.FC = () => {

  // 닉네임 상태 관리
  const [nickname, setNickname] = useState('');

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

  return (
    <div className='text-center mt-20' style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      height: '100vh', // 화면 전체 높이를 차지하도록 설정
      margin: '0', // 상단 여백 제거
      transform: 'translateX(16px)', // 여기에 transform 속성 추가
    }}>
      <style>
        {`
          .mainText {
            color: #696864;
            font-size: 25px;
            font-weight: bold; 
          }
        `}
      </style>
      <img src="/image/login_logo.png" alt="메인 로고" style={{ width: '330px', height: '198px'}}/>
      <img src="/image/main_tree.png" alt="메인 나무" style={{ width: '165px', height: '207px', marginTop: '30px'}}/>
      <hr style={{
        width: '500px',
        backgroundColor: '#696864',
        height: '1px',
        border: 'none',
        marginTop: '20px',
      }}/>
      <div style={{ 
        fontSize: '35px', 
        marginTop: '10px',
      }}>
        {nickname ? `${nickname}의 일기장` : `익명의 일기장`}
      </div>
      <hr style={{
        width: '500px',
        backgroundColor: '#696864',
        height: '1.5px',
        border: 'none',
        marginTop: '10px',
      }}/>
      <div className="mainText">
        "일기는 나의 가장 친한 친구, 가장 믿음직한 상담자이다." <br />
        -앤 프랭크-
      </div>
    </div>
  );
};

export default MainPage;