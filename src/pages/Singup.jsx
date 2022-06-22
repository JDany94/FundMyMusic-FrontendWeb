import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import logo from "../images/logo.png";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Loading from "../components/Loading";
import useConcerts from "../hooks/useConcerts";
import useAuth from "../hooks/useAuth";

import { validations } from "../helpers/validations";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [stageName, setStageName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const { loading, setLoading, alert, showAlert } = useConcerts();
  const { setAuth } = useAuth();
  const { validate } = validations();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const switchShowPass = () => setShowPass(!showPass);
  const switchShowRePass = () => setShowRePass(!showRePass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    const user = {
      email,
      stageName,
      name,
      surname,
      phone,
      password,
      rePassword,
      role: "Artist",
      from: "SingUp",
    };

    if (!validate(user)) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/user`, user);
      localStorage.setItem("x-auth-token", data.token);
      setAuth(data);
      setLoading(false);
      setEmail("");
      setStageName("");
      setName("");
      setSurName("");
      setPhone("");
      setPassword("");
      setRePassword("");
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      showAlert({
        msg:
          error.response.status !== 0
            ? error.response.data.msg
            : "Error de conexión",
        error: true,
      });
      console.log(error);
    }
  };

  const { msg } = alert;

  return (
    <>
      <div className="flex flex-col items-center">
        <Link to={"/"}>
          {" "}
          <img src={logo} alt="" />
        </Link>
      </div>

      {msg && <Alert alert={alert} />}
      {loading && <Loading />}

      <form>
        <div className="my-5">
          <input
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3  rounded-xl bg-gray-800 text-white font-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            type="text"
            placeholder="Nombre Artístico"
            className="w-full mt-3 p-3  rounded-xl bg-gray-800 text-white font-bold"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            type="text"
            placeholder="Nombre"
            className="w-full mt-3 p-3  rounded-xl bg-gray-800 text-white font-bold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            type="text"
            placeholder="Apellidos"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={surname}
            onChange={(e) => setSurName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            type="number"
            placeholder="Teléfono"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="my-8 flex bg-gray-800 rounded-xl">
          <input
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            className="w-full p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            className="p-3 text-white"
            onClick={switchShowPass}
          >
            {showPass ? (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
        <div className="my-5 flex bg-gray-800 rounded-xl">
          <input
            id="password"
            type={showRePass ? "text" : "password"}
            placeholder="Confirmar Contraseña"
            className="w-full p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
          <button
            type="button"
            className="p-3 text-white"
            onClick={switchShowRePass}
          >
            {showRePass ? (
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
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            ) : (
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
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                />
              </svg>
            )}
          </button>
        </div>
        <button
          onClick={handleSubmit}
          className="bg-red-800 mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
        >
          Registrarse
        </button>
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-white uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Iniciar Sesión
        </Link>
      </nav>
    </>
  );
};

export default Singup;
