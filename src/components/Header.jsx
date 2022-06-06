import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useConcerts from "../hooks/useConcerts";
import logo from "../images/logoHeader.png";
import { Transition } from "@headlessui/react";
import Searcher from "./Searcher";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
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
    <header>
      <nav className="bg-gray-900">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <div className="md:basis-1/4">
              <Link to={"/dashboard"}>
                <img className="xs:w-60 md:w-auto" src={logo} alt="" />
              </Link>
            </div>

            <div className="hidden md:block basis-1/2">
              <div className="flex justify-center">
                <button
                  // Concerts
                  onClick={handleClickConcerts}
                  className="flex justify-center gap-2 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  className="flex justify-center gap-2 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  className="flex justify-center gap-1 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleSearcher}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
              </div>
            </div>

            <div className="hidden md:block basis-1/4">
              <div className="flex justify-end">
                <button
                  // PROFILE
                  type="button"
                  className="flex justify-center gap-1 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleClickProfile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            </div>

            <div className="md:hidden basis-1/2 pb-2 pt-2">
              <div className="flex justify-end">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  type="button"
                  className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                  aria-controls="mobile-menu"
                  aria-expanded="false"
                >
                  {!isOpen ? (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="block h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <button
                  // Concerts
                  onClick={handleClickConcerts}
                  className="w-full flex justify-start gap-2 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  className="w-full flex justify-start gap-2 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  className="w-full flex justify-start gap-1 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleSearcher}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                  className="w-full flex justify-start gap-1 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  onClick={handleClickProfile}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
            </div>
          )}
        </Transition>
      </nav>
      <Searcher />
    </header>
  );
};

export default Header;
