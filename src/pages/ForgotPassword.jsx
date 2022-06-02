import { Link } from "react-router-dom";

const ForgotPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recuperar contraseña
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <input
            id="email"
            type="email"
            placeholder="Email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Enviar correo"
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
        <Link
          className="block text-center my-5 text-slate-600 uppercase text-sm"
          to="/singup"
        >
          ¿No tienes una cuenta? Registrate
        </Link>
      </nav>
    </>
  );
};

export default ForgotPassword;
