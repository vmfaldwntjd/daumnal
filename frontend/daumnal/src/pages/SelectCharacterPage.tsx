// 캐릭터 선택 페이지
import React, {useEffect} from 'react';
import styled from 'styled-components';
import CharacterCard from '../components/music/CharacterCard';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const SelectCharacterPage: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 브라우저 히스토리 스택에 현재 페이지를 추가
    // 첫 번째 인자에 빈 문자열을 전달하여 타입 에러를 방지
    window.history.pushState({}, "", window.location.href);

    const handlePopstate = (event: PopStateEvent) => {
      Swal.fire({
        title: "정말로 나가시겠습니까?",
        text: "이 페이지를 나가면 노래를 추천받지 못해요!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "나가기",
        cancelButtonText: "취소"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/calendar')
        }
      })
      // 다시 현재 페이지 상태를 히스토리 스택에 추가하여
      // 사용자가 페이지를 떠나지 않도록 함
      window.history.pushState({}, "", window.location.href);
    };

    window.addEventListener('popstate', handlePopstate);

    return () => {
      // 컴포넌트가 언마운트될 때 이벤트 리스너를 제거
      window.removeEventListener('popstate', handlePopstate);
    };
  }, []);


  return (
    <div className="p-9">
      <p className="text-4xl mb-7">오늘의 나무를 골라 주세요!</p>
      {/* 캐릭터 목록 */}
      <Characters>
        <CharacterCard imageUrl="/image/dabom.png" name="다봄" category="SPRING" context="다봄이 설명" />
        <CharacterCard imageUrl="/image/dareum.png" name="다름" category="SUMMER" context="다름이 설명" />
        <CharacterCard imageUrl="/image/daeul.png" name="다을" category="FALL" context="다을이 설명" />
        <CharacterCard imageUrl="/image/daseol.png" name="다설" category="WINTER" context="다설이 설명" />
      </Characters>
    </div>
  );
};

const Characters = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default SelectCharacterPage;