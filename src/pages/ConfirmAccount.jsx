import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import logo from "../images/logo.png";
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
      <div className="flex flex-col items-center">
        <Link to={"/"}>
          {" "}
          <img src={logo} alt="" />
        </Link>
      </div>
      <h1 className="pt-8 pb-3 text-white font-black uppercase text-3xl text-center">
        Confirma tu cuenta
      </h1>
      <div>
        {msg && <Alert alert={alert} />}
        {loading && <Loading />}
        {confirmed && (
          <Link
            className="block text-center my-5 text-white uppercase text-sm"
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
