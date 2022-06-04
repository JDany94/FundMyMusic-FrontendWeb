import useConcerts from "../hooks/useConcerts";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import FormConcert from "../components/FormConcert";

const EditConcert = () => {
  const params = useParams();
  const { getConcert, concert } = useConcerts();

  useEffect(() => {
    getConcert(params.id);
  }, []);

  const { title } = concert;

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center justify-between">
        <h1 className="font-black text-4xl mb-5">Editar concierto: {title}</h1>
      </div>
      <div className="mt-10 flex justify-center">
        <FormConcert />
      </div>
    </>
  );
};

export default EditConcert;
