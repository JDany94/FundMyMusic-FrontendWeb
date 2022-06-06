import useConcerts from "../hooks/useConcerts";
import PreviewConcert from "../components/PreviewConcert";
import Loading from "../components/Loading";
import Alert from "../components/Alert";

const Dashboard = () => {
  const { concerts, loading, alert } = useConcerts();

  const { msg } = alert;

  if (loading) return <Loading />;
  return (
    <>
      <h1 className="text-white font-bold text-3xl uppercase text-center">Conciertos Publicados</h1>
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
