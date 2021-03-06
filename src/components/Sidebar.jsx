import { useNavigate, Link } from "react-router-dom";
import logo from "../images/logoSide.png";
import useConcerts from "../hooks/useConcerts";
import Searcher from "./Searcher";

const Sidebar = () => {
  const { handleSearcher, singOutConcerts } = useConcerts();

  const navigate = useNavigate();

  const handleClickNewConcert = () => {
    navigate("/dashboard/new-concert");
  };

  const handleClickConcerts = () => {
    navigate("/dashboard");
  };

  const handleClickProfile = () => {
    navigate("/dashboard/profile");
  };

  return (
    <aside className="flex flex-col bg-gray-900 p-4">
      <div className="flex justify-center mb-3">
        <Link to={"/dashboard"}>
          <img src={logo} alt="" />
        </Link>
      </div>
      <div className="flex  xs:flex-col md:flex-col xs:justify-center md:justify-start items-center gap-5 mb-4 mt-2">
        <button
          // Concerts
          onClick={handleClickConcerts}
          className="flex justify-center gap-3 bg-red-800 p-4 text-white uppercase font-bold block  items-center rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"
            />
          </svg>
          <p className="font-bold">Conciertos</p>
        </button>
        <button
          // NEW CONCERT
          onClick={handleClickNewConcert}
          className="flex justify-center gap-3 bg-red-800 p-4 text-white uppercase font-bold block   text-center rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
          <p className="font-bold">Publicar</p>
        </button>
        <button
          // SEARCH
          type="button"
          className="flex justify-center gap-3 bg-red-800 p-4 text-white uppercase font-bold block   text-center rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
          onClick={handleSearcher}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="font-bold">Buscar</p>
        </button>
        <button
          // PROFILE
          type="button"
          className="flex justify-center gap-3 bg-red-800 p-4 text-white uppercase font-bold block   text-center rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
          onClick={handleClickProfile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          <p className="font-bold">Perfil</p>
        </button>
      </div>

      <Searcher />
    </aside>
  );
};

export default Sidebar;
