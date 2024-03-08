// import "./Navigation.css";
import { Link } from "react-router-dom";

interface NavProps {
  data: {
    name: string;
    address: string;
  };
}

export default function NavItem({ data }: NavProps): JSX.Element {
  const { name, address } = data;

  return (

    <div>
      <Link to={`${address}`} className="" >
      {name}
    </Link>
    </div>
    
  );
}