import { Link } from "react-router-dom";
import { useState } from "react";
import Alert from "../components/Alert";
import axios from "axios";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if ([email, name, surname, phone, password, repassword].includes("")) {
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
    setAlert({});

    // API
    try {
      const JSON = {
        email,
        name,
        surname,
        phone,
        password,
        role: "Artist",
      };
      const { data } = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/user`, JSON);

      setAlert({
        msg: data.msg,
        error: false,
      });

      setEmail("");
      setName("");
      setSurName("");
      setPhone("");
      setPassword("");
      setRePassword("");

    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Registrarse
      </h1>

      {msg && <Alert alert={alert} />}

      <form
        className="my-10 bg-white shadow rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="name"
            type="text"
            placeholder="Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="surname"
            type="text"
            placeholder="Apellidos"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={surname}
            onChange={(e) => setSurName(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="phone"
            type="number"
            placeholder="Teléfono"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <input
            id="re-password"
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Registrarse"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-600 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Iniciar Sesión
        </Link>
      </nav>
    </>
  );
};

export default Singup;
