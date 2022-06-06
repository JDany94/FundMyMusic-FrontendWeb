import FormProfile from "../components/FormProfile";

const EditProfile = () => {
  return (
    <>
      <h1 className="mt-4 text-white font-bold text-3xl uppercase text-center">
        Editar Perfil
      </h1>
      <div className="mt-5 flex justify-center">
        <FormProfile />
      </div>
    </>
  );
};

export default EditProfile;
