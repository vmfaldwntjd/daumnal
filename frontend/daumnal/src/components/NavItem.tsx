import React from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import axiosInstance from '../pages/api/axiosInstance';
import Swal from 'sweetalert2';

interface NavProps {
  data: {
    name: string;
    address: string;
    color: string;
    image: string;
    width: string;
    height: string;
  };
  clickable?: boolean;
}

export default function NavItem({ data, clickable = true }: NavProps): JSX.Element {
  const location = useLocation();
  const navigate = useNavigate(); // React Router v6
  const { name, address, color, image, width, height } = data;
  const isActive = location.pathname === address || 
    (location.pathname === '/monthly-result' && address === '/calendar') ||
    (location.pathname === '/select-character' && address === '/create-diary') ||
    (location.pathname === '/music-result' && address === '/create-diary');

  const handleClick = async () => {
    if (address === '/create-diary') {
      try {
        const response = await axiosInstance.get(`${process.env.REACT_APP_SPRINGBOOT_BASE_URL}/diaries/today`);
        if (response.data.code === 200 && response.data.data.written) {
          Swal.fire({
            title: "이미 일기 작성을 완료했습니다.",
            icon: "info"
          });
        } else {
          // React Router v6
          navigate(address);
        }
      } catch (error) {
        // console.error("일기 작성 여부 조회 중 오류가 발생했습니다.", error);
      }
    } else {
      // React Router v6
      navigate(address);
    }
  };

  if (!clickable) {
    // 클릭이 비활성화된 경우
    return (
      <div className="w-full h-20 flex items-center justify-center" style={{ backgroundColor: color }}>
        {isActive ? <span>{name}</span> : <img src={image} alt={name} style={{ width: width, height: height }} />}
      </div>
    );
  }

  // 클릭이 활성화된 경우
    return (
      <div className="w-full h-20" style={{ backgroundColor: color }}>
        <div className="flex items-center justify-center w-full h-full" onClick={handleClick} style={{ cursor: 'pointer' }}>
          {isActive ? <span>{name}</span> : <img src={image} alt={name} style={{ width: width, height: height }} />}
        </div>
      </div>
    );
}
