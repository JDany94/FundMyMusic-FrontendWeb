import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useConcerts from "../hooks/useConcerts";

const Profile = () => {
  const { singOutAuth, auth } = useAuth();
  const { singOutConcerts } = useConcerts();

  const { name, surname, email, phone, role } = auth;

  const handleSingOut = () => {
    singOutAuth();
    singOutConcerts();
    localStorage.removeItem("x-auth-token");
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white font-bold md:text-5xl">{name}</h1>
        <div>
          <div className="grid content-center mb-2">
            <Link
              to={`/dashboard/profile/edit`}
              className="flex items-center gap-2 text-white uppercase font-bold text-lg hover:text-[#BA0A00]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
              Editar
            </Link>
          </div>
          <div className="flex items-center gap-2 text-red-600 hover:text-[#830700]">
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
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <button
              type="button"
              className="uppercase font-bold text-lg"
              onClick={handleSingOut}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <p className="font-bold text-xl mt-4 text-white">Perfil</p>
      <div className="bg-gray-900 mt-5 rounded-xl">
        <div className="p-5">
          <p className="pb-2 text-sm text-white uppercase font-bold">Email</p>
          <p className="pb-3 text-md text-gray-500 uppercase">{email}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Nombre y apellidos
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{`${name} ${surname}`}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Teléfono
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{phone}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Tipo de perfil
          </p>
          <p className="text-md text-gray-500 uppercase">
            {role === "User" ? "Usuario" : "Artista"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
