import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useConcerts from "../hooks/useConcerts";
import Searcher from "./Searcher";

const Sidebar = () => {
  const { auth, singOutAuth } = useAuth();
  const { handleSearcher, singOutConcerts } = useConcerts();

  const handleSingOut = () => {
    singOutAuth();
    singOutConcerts();
    localStorage.removeItem("x-auth-token");
  };

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold text-center">{auth.name}</p>
      <Link
        to="/dashboard"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Conciertos
      </Link>
      <Link
        to="new-concert"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
      >
        Publicar
      </Link>
      <button
        type="button"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 text-center rounded-lg"
        onClick={handleSearcher}
      >
        Buscar
      </button>
      <button
        type="button"
        className="bg-sky-600 w-full p-3 text-white uppercase font-bold block mt-5 rounded-lg"
        onClick={handleSingOut}
      >
        <div className="flex gap-2">
          <div className="flex-auto text-right">Cerrar Sesión</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 flex-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </div>
      </button>
      <Searcher />
    </aside>
  );
};

export default Sidebar;
