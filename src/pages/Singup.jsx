import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../images/logo.png";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Loading from "../components/Loading";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [stageName, setStageName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [alert, setAlert] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [email, stageName, name, surname, phone, password, repassword].includes(
        ""
      )
    ) {
      setAlert({
        msg: "Todos los campos son obligatorios",
        error: true,
      });
      return;
    }
    if (password !== repassword) {
      setAlert({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }
    if (password.length < 6) {
      setAlert({
        msg: "La contraseña debe ser de minimo 6 caracteres",
        error: true,
      });
      return;
    }
    if (phone.length < 9) {
      setAlert({
        msg: "Teléfono no válido",
        error: true,
      });
      return;
    }
    setAlert({});
    setLoading(true);

    // API
    try {
      const JSON = {
        email,
        stageName,
        name,
        surname,
        phone,
        password,
        role: "Artist",
      };
      const { data } = await axiosClient.post(`/user`, JSON);
      setAlert({
        msg: data.msg,
        error: false,
      });

      setLoading(false);

      setEmail("");
      setStageName("");
      setName("");
      setSurName("");
      setPhone("");
      setPassword("");
      setRePassword("");

      setTimeout(() => {
        setAlert({});
        navigate("/");
      }, 4000);
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: error.response.status !== 0
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
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3  rounded-xl bg-gray-800 text-white font-bold"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="name"
            type="text"
            placeholder="Nombre Artístico"
            className="w-full mt-3 p-3  rounded-xl bg-gray-800 text-white font-bold"
            value={stageName}
            onChange={(e) => setStageName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            className="w-full mt-3 p-3  rounded-xl bg-gray-800 text-white font-bold"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="surname"
            type="text"
            placeholder="Apellidos"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={surname}
            onChange={(e) => setSurName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="phone"
            type="number"
            placeholder="Teléfono"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
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
        <div className="my-5">
          <input
            id="re-password"
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full mt-3 p-3 rounded-xl bg-gray-800 text-white font-bold"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Registrarse"
          className="bg-[#BA0A00] mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
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
