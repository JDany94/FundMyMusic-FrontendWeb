import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import useAuth from "../hooks/useAuth";
import Loading from "../components/Loading";

const Singin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const { setAuth, auth } = useAuth();

  const navigate = useNavigate();

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };
  setAuth;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    setAlert({});
    setLoading(true);

    try {
      const { data } = await axiosClient.post(`/user/auth`, {
        email,
        password,
        from: "Artist",
      });
      localStorage.setItem("x-auth-token", data.token);
      setAuth(data);

      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      console.log(error);
      showAlert({
        msg: error.response.status !== 0
          ? error.response.data.msg
          : "Error de conexión",
        error: true,
      });
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

      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-red-800 mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-white uppercase text-sm"
          to="/singup"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-5 text-white uppercase text-sm"
          to="/forgot-password"
        >
          ¿Olvidaste la contraseña?
        </Link>
      </nav>
    </>
  );
};

export default Singin;
