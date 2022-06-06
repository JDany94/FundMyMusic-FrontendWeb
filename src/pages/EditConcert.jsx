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
      <h1 className="text-white font-bold text-3xl uppercase text-center">
        Editar concierto: {title}
      </h1>
      <div className="mt-5 flex justify-center">
        <FormConcert />
      </div>
    </>
  );
};

export default EditConcert;
