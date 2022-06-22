import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../images/logo.png";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";
import Loading from "../components/Loading";
import useConcerts from "../hooks/useConcerts";
import { validations } from "../helpers/validations";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [validToken, setValidToken] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);

  const { loading, setLoading, alert, showAlert } = useConcerts();
  const { validate } = validations();

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    window.scrollTo(0, 0);
    const checkToken = async () => {
      setLoading(true);
      try {
        await axiosClient.get(`/user/reset-password/${token}`);
        setValidToken(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showAlert({
          msg: error.response.data.msg,
          error: true,
        });
        setTimeout(() => {
          window.location = "https://fundmymusic.es";
        }, 3000);
        console.log(error);
      }
    };
    checkToken();
  }, []);

  const switchShowPass = () => setShowPass(!showPass);
  const switchShowRePass = () => setShowRePass(!showRePass);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    const user = {
      password,
      rePassword,
      from: "NewPass",
    };

    if (!validate(user)) {
      return;
    }

    setLoading(true);
    try {
      const { data } = await axiosClient.post(`/user/reset-password/${token}`, {
        password,
      });
      setLoading(false);
      showAlert({
        msg: data.msg,
        error: false,
      });
      setValidToken(false);
      setPassword("");
      setRePassword("");
      setTimeout(() => {
        window.location = "https://fundmymusic.es";
      }, 3000);
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
      <h1 className="pt-8 pb-3 text-white font-bold uppercase text-3xl text-center">
        Reestablece tu contraseña
      </h1>

      {msg && <Alert alert={alert} />}
      {loading && <Loading />}

      {validToken && (
        <form>
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
      )}
    </>
  );
};

export default NewPassword;
