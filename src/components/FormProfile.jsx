import { useState, useEffect } from "react";
import useConcerts from "../hooks/useConcerts";
import useAuth from "../hooks/useAuth";
import Alert from "./Alert";
import Loading from "./Loading";

const FormProfile = () => {
  const [email, setEmail] = useState("");
  const [stageName, setStageName] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState("");

  const { auth } = useAuth();

  const { showAlert, loading, alert, editProfile, validName } = useConcerts();

  useEffect(() => {
    setEmail(auth.email);
    setStageName(auth.stageName);
    setName(auth.name);
    setSurname(auth.surname);
    setPhone(auth.phone);
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);

    // TODO: sacar de aqui las validaciones
    if ([email, stageName, name, surname, phone].includes("")) {
      showAlert({
        msg: "Faltan campos por llenar",
        error: true,
      });
      return;
    }

    if (phone.length < 6) {
      showAlert({
        msg: "Teléfono no válido",
        error: true,
      });
      return;
    }

    if (!(validName(name) && validName(surname))) {
      showAlert({
        msg: "Nombre o Apellidos no válidos",
        error: true,
      });
      return;
    }

    const JSON = {
      _id: auth._id,
      stageName,
      name,
      surname,
      phone,
    };

    await editProfile(JSON);

    setEmail("");
    setStageName("");
    setName("");
    setSurname("");
    setPhone("");
  };

  const { msg } = alert;

  return (
    <form className="md:w-1/4 w-full" onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} />}
      {loading && <Loading />}
      <div className="mb-5">
        <input
          disabled
          type="text"
          placeholder="Email"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-gray-600 font-bold"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Nombre Artístico"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={stageName}
          onChange={(e) => setStageName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Nombre"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Apellidos"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={surname}
          onChange={(e) => setSurname(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          type="number"
          placeholder="Teléfono"
          className=" w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={"Actualizar perfil"}
        className="bg-red-800 mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
      />
    </form>
  );
};

export default FormProfile;
