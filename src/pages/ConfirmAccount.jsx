import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alert from "../components/Alert";
import axiosClient from "../config/axiosClient";
import Loading from "../components/Loading";
import { useNavigate } from "react-router-dom";

const ConfirmAccount = () => {
  const [alert, setAlert] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const params = useParams();
  const { id } = params;

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
      navigate("/");
    }, 5000);
  };

  useEffect(() => {
    const confirmAccount = async () => {
      setLoading(true);
      try {
        const { data } = await axiosClient.get(`/user/confirm/${id}`);
        setLoading(false);
        showAlert({
          msg: data.msg,
          error: false,
        });
        setConfirmed(true);
      } catch (error) {
        setLoading(false);
        showAlert({
          msg: "Link inválido",
          error: true,
        });
        console.log(error);
      }
    };
    confirmAccount();
  }, []);

  const { msg } = alert;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Confirma tu cuenta
      </h1>
      <div className="mt-20 md:mt-10 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alert alert={alert} />}
        {loading && <Loading />}
        {confirmed && (
          <Link
            className="block text-center my-5 text-slate-600 uppercase text-sm"
            to="/"
          >
            Iniciar Sesión
          </Link>
        )}
      </div>
    </>
  );
};

export default ConfirmAccount;
