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

export default function NavItem({ data, clickable = true }: NavProps & { clickable?: boolean }): JSX.Element {
  const location = useLocation();
  const { name, address, color, image, width, height } = data;
  const isActive = location.pathname === address;

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
      <Link to={`${address}`} className="flex items-center justify-center w-full h-full">
        {isActive ? <span>{name}</span> : <img src={image} alt={name} style={{ width: width, height: height }} />}
      </Link>
    </div>
  );
}
