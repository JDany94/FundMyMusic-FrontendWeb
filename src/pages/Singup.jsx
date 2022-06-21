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

  const { loading, setLoading, alert, showAlert } = useConcerts();
  const { setAuth } = useAuth();
  const { validate } = validations();

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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

      <form onSubmit={handleSubmit}>
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
        <div className="my-5">
          <input
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={rePassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Registrarse"
          className="bg-red-800 mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
        />
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
