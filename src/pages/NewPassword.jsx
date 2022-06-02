import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});

  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const checkToken = async () => {
      try {
        await axiosClient.get(`/user/reset-password/${token}`);
        setValidToken(true);
      } catch (error) {
        setAlert({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlert({
        msg: "La contraseña debe ser minimo de 6 caracteres",
        error: true,
      });
      return;
    }
    if (password !== rePassword) {
      setAlert({
        msg: "Las contraseñas no coinciden",
        error: true,
      });
      return;
    }

    try {
      const { data } = await axiosClient.post(`/user/reset-password/${token}`, {
        password,
      });
      setAlert({
        msg: data.msg,
        error: false,
      });
      setConfirmed(true);
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
        Reestablece tu contraseña
      </h1>

      {msg && <Alert alert={alert} />}

      {validToken && (
        <form
          className="my-10 bg-white shadow rounded-lg p-10"
          onSubmit={handleSubmit}
        >
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
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}
      {confirmed && (
        <Link
          className="block text-center my-5 text-slate-600 uppercase text-sm"
          to="/"
        >
          Iniciar Sesión
        </Link>
      )}
    </>
  );
};

export default NewPassword;
