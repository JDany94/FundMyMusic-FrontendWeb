const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu contraseña
      </h1>

      <form className="my-10 bg-white shadow rounded-lg p-10">
        <div className="my-5">
          <input
            id="password"
            type="password"
            placeholder="Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <div className="my-5">
          <input
            id="re-password"
            type="password"
            placeholder="Confirmar Contraseña"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
          />
        </div>
        <input
          type="submit"
          value="Guardar"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>
    </>
  );
};

export default NewPassword