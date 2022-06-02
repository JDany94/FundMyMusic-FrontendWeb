import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Alert from "../components/Alert";

const ConfirmAccount = () => {
  let bugNextConfig = true;

  const [alert, setAlert] = useState({});
  const [confirmed, setConfirmed] = useState(false);

  const params = useParams();
  const { id } = params;

  useEffect(() => {
    const confirmAccount = async () => {
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/user/confirm/${id}`;
        const { data } = await axios(url);
        setAlert({
          msg: data.msg,
          error: false,
        });
        bugNextConfig = false;
        setConfirmed(true);
      } catch (error) {
        if (bugNextConfig) {
          setAlert({
            msg: error.response.data.msg,
            error: true,
          });
        }
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
