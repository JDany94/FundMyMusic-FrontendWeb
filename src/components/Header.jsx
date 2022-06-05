import logoHeader from "../images/logoHeader.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="px-4 py-5 bg-gray-900">
      <div className="flex flex-col items-center">
        <Link to={"/dashboard"}>
          {" "}
          <img src={logoHeader} alt="" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
