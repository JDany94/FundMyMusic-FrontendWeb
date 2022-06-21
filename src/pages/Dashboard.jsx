import useConcerts from "../hooks/useConcerts";
import PreviewConcert from "../components/PreviewConcert";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { useEffect } from "react";

const Dashboard = () => {
  const { concerts, loading, alert, getConcerts } = useConcerts();

  useEffect(() => {
    window.scrollTo(0, 0);
    getConcerts(true);
  }, []);

  const { msg } = alert;
  if (loading) return <Loading />;
  return (
    <>
      <h1 className="mt-4 text-white font-bold text-3xl uppercase text-center">
        Conciertos Publicados
      </h1>
      {msg && <Alert alert={alert} />}
      <div className="bg-gray-900 mt-10 rounded-xl">
        {concerts.length ? (
          concerts.map((concert) => (
            <PreviewConcert key={concert._id} concert={concert} />
          ))
        ) : (
          <p className=" text-center text-white uppercase font-bold p-5">
            No hay conciertos publicados
          </p>
        )}
      </div>
    </>
  );
};

export default Dashboard;
