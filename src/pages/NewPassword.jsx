import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import logo from "../images/logo.png";
import axiosClient from "../config/axiosClient";
import Alert from "../components/Alert";
import Loading from "../components/Loading";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
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
          setAlert({});
          navigate("/");
        }, 4000);
        console.log(error);
      }
    };
    checkToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

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
      setValidToken(false);
      setPassword("");
      setRePassword("");
      setTimeout(() => {
        setAlert({});
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
        <form onSubmit={handleSubmit}>
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
              value={rePassword}
              onChange={(e) => setRePassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar"
            className="bg-red-800 mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
          />
        </form>
      )}
    </>
  );
};

export default NewPassword;
