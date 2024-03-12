import { Link, useLocation } from "react-router-dom";

interface NavProps {
  data: {
    name: string;
    address: string;
    color: string;
    image: string;
    width: string;
    height: string;
  };
}

export default function NavItem({ data }: NavProps): JSX.Element {
  const { name, address, color, image, width, height } = data;
  const location = useLocation(); // 현재 위치를 가져옵니다.

  const isActive = location.pathname === address; // 현재 위치와 NavItem의 경로가 같은지 확인합니다.

  return (
    <div className="w-full h-20" style={{ backgroundColor: color }}>
      <Link to={`${address}`} className="flex items-center justify-center w-full h-full" >
        {isActive ? (
          <span>{name}</span>
        ) : (
          <img src={image} alt={name} style={{ width: width, height: height }} />
        )}
      </Link>
    </div>
  );
}
