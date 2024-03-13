import React from 'react';

const MainPage: React.FC = () => {
  return (
    <div className='text-center mt-10' style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      transform: 'translateX(16px)', // 여기에 transform 속성 추가
    }}>
      <img src="/image/login_logo.png" alt="메인 로고" style={{ 
        width: '330px', 
        height: '198px',
        margin: 'auto', // 자동 마진을 통해 수평 중앙 정렬
      }}/>
      <img src="/image/main_tree.png" alt="메인 나무" style={{
        width: '165px',
        height: '207px',
        margin: 'auto',
      }}/>
      <hr style={{
        width: '500px',
        backgroundColor: '#696864',
        height: '1px',
        border: 'none',
        marginTop: '20px',
      }}/>
      <div style={{ 
        fontSize: '35px', // 글자 크기를 50px로 설정
        marginTop: '10px', // hr과 동일한 여백을 위해 추가
      }}>
        익명의 일기장
      </div>
      <hr style={{
        width: '500px',
        backgroundColor: '#696864',
        height: '1.5px',
        border: 'none',
        marginTop: '10px',
      }}/>
      <div style={{ 
        fontSize: '25px',
        marginTop: '30px',
        fontWeight: 'bold',
      }}>
        "일기는 나의 가장 친한 친구, 가장 믿음직한 상담자이다." <br />
        -앤 프랭크-
      </div>
    </div>
  );
};

export default MainPage;
