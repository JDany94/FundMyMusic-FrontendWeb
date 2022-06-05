import { Link } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Loading from "../components/Loading";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email === "" || email.length < 6) {
      setAlert({
        msg: "El correo es inválido",
        error: true,
      });
      return;
    }

    setAlert({});
    setLoading(true);

    try {
      const { data } = await axiosClient.post(`/user/reset-password`, {
        email,
      });
      setLoading(false);
      setAlert({
        msg: data.msg,
        error: false,
      });
      setEmail("");
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: error.response.data.msg,
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
      <h1 className="pt-8 pb-3 text-white font-bold text-3xl uppercase text-center">
        Recuperar contraseña
      </h1>

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
        <input
          type="submit"
          value="Enviar correo"
          className="bg-[#BA0A00] mb-5 w-full py-3 text-white uppercase font-bold rounded-xl hover:cursor-pointer hover:bg-[#830700] transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-white uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Iniciar Sesión
        </Link>
        <Link
          className="block text-center my-5 text-white uppercase text-sm"
          to="/singup"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
