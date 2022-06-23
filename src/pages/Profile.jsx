import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useConcerts from "../hooks/useConcerts";
import Loading from "../components/Loading";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import axios from "axios";

const Profile = () => {
  const [APK, setAPK] = useState(undefined);
  const [loadAPK, setLoadAPK] = useState(false);
  const { singOutAuth, auth } = useAuth();
  const { singOutConcerts, loadUserData, loading } = useConcerts();

  useEffect(() => {
    window.scrollTo(0, 0);
    loadUserData();
  }, []);

  const { name, surname, email, phone, role, stageName } = auth;
  const handleSingOut = () => {
    Swal.fire({
      title: "¿Desea cerrar sesión?",
      icon: "question",
      color: "#fff",
      background: "#111827",
      showCancelButton: true,
      confirmButtonColor: "#BA0A00",
      cancelButtonColor: "#3085d6",
      cancelButtonText: "Cancelar",
      confirmButtonText: "Cerrar Sesión",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        singOutAuth();
        singOutConcerts();
        localStorage.removeItem("x-auth-token");
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setLoadAPK(true);
    let formData = new FormData();
    formData.append("file", APK);
    const { data } = await axios({
      url: `${import.meta.env.VITE_BACKEND_URL}/files/apk`,
      method: "POST",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: data,
      showConfirmButton: false,
      timer: 1500,
      color: "#fff",
      background: "#111827",
    });
    setLoadAPK(false);
  };

  const { msg } = alert;

  if (loading) return <Loading />;

  return (
    <div>
      {msg && <Alert alert={alert} />}

      <div className="flex xs:flex-col md:flex-row justify-between gap-5">
        <h1 className="text-white font-bold text-5xl">{name}</h1>
        <div>
          <Link
            to={`/dashboard/profile/edit`}
            className="mb-3 flex gap-2 text-white uppercase font-bold text-lg hover:text-[#BA0A00]"
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
          <div className="flex gap-2 text-red-600 hover:text-[#830700]">
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
            Nombre artístico
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{stageName}</p>
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
      {auth.email === `${import.meta.env.VITE_ADMIN}` ? (
        <form
          className="md:w-1/3 bg-gray-900 mt-5 p-3 rounded-xl"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <div className="mb-5">
            <input
              type="file"
              name="file"
              id="file"
              className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
              onChange={(e) => setAPK(e.target.files[0])}
            />
          </div>
          {loadAPK && <Loading />}
          <input
            type="submit"
            value={"Upload APK"}
            className="bg-red-800 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
          />
        </form>
      ) : null}
    </div>
  );
};

export default Profile;
