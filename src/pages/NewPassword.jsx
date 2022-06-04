import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [alert, setAlert] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const { token } = params;

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  useEffect(() => {
    const checkToken = async () => {
      setLoading(true);
      try {
        await axiosClient.get(`/user/reset-password/${token}`);
        setValidToken(true);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        showAlert({
          msg: "Error de conexión",
          error: true,
        });
        console.log(error);
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
    setAlert({});
    setLoading(true);

    try {
      const { data } = await axiosClient.post(`/user/reset-password/${token}`, {
        password,
      });
      setLoading(false);
      setAlert({
        msg: data.msg,
        error: false,
      });
      setConfirmed(true);
      setPassword("");
      setRePassword("");
      setTimeout(() => {
        setAlert({});
        navigate("/");
      }, 4000);
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: "Error de conexión",
        error: true,
      });
      console.log(error);
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu contraseña
      </h1>

      {msg && <Alert alert={alert} />}
      {loading && <Loading />}

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
