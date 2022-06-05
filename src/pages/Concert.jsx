import { useParams, Link } from "react-router-dom";
import useConcerts from "../hooks/useConcerts";
import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import ModalDeleteConcert from "../components/ModalDeleteConcert";
import Alert from "../components/Alert";

const Concert = () => {
  const params = useParams();
  const { getConcert, concert, loading, handleModalDeleteConcert, alert } =
    useConcerts();

  const [modal, setModal] = useState(false);

  useEffect(() => {
    getConcert(params.id);
  }, [params]);

  const {
    title,
    genre,
    place,
    date,
    description,
    capacity,
    minimumSales,
    gift,
    available,
    price,
    status,
    soldOut,
  } = concert;

  const { msg } = alert;

  if (loading) return <Loading />;

  return (
    <div>
      {msg && <Alert alert={alert} />}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white font-bold md:text-5xl">{title}</h1>
        <div>
          {status === "Fecha Abierta" ? (
            <div className="grid content-center mb-2">
              <Link
                to={`/dashboard/concert/edit/${params.id}`}
                className="flex items-center gap-2 text-white uppercase font-bold text-lg hover:text-[#BA0A00]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                  />
                </svg>
                Editar
              </Link>
            </div>
          ) : null}
          <div className="flex items-center gap-2 text-red-600 hover:text-[#830700]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <button
              type="button"
              className="uppercase font-bold text-lg"
              onClick={handleModalDeleteConcert}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <span
          className={`${
            status === "Fecha Abierta" ? "bg-green-600" : "bg-red-600"
          } px-2 py-1 text-white uppercase text-sm rounded-full`}
        >
          {status}
        </span>
        {soldOut ? (
          <div className="pl-2">
            <span className="bg-green-600 px-2 py-1 text-white uppercase text-sm rounded-full">
              SoldOut
            </span>
          </div>
        ) : null}
      </div>

      <p className="font-bold text-xl mt-4 text-white">Detalles</p>
      <div className="bg-gray-900 mt-5 rounded-xl">
        <div className="p-5">
          <p className="pb-3 text-md text-gray-500 uppercase">
            {place} - {date ? date.split("T")[0].replace(/-/g, "/") : date}
          </p>
          <p className="pb-2 text-sm text-white uppercase font-bold">Género</p>
          <p className="pb-3 text-md text-gray-500 uppercase">{genre}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Descripción
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{description}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Recompensas por pre-venta
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">
            {gift === "" ? "N/A" : gift}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-5">
        <p className="font-bold text-xl text-white">Crowdfunding</p>
      </div>
      <div className="bg-gray-900 shadow mt-5 rounded-lg">
        <div className="p-5">
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Capacidad
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{capacity}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Ventas minimas para celebración
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{minimumSales}</p>
          <p className="pb-2 text-sm text-white uppercase font-bold">Precio</p>
          <p className="pb-3 text-md text-gray-500 uppercase">{price} €</p>

          <p className="pb-2 text-sm text-white uppercase font-bold">
            Entradas vendidas
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">
            {capacity - available}
          </p>
          <p className="pb-2 text-sm text-white uppercase font-bold">
            Entradas disponibles
          </p>
          <p className="pb-3 text-md text-gray-500 uppercase">{available}</p>
        </div>
      </div>
      <ModalDeleteConcert modal={modal} setModal={setModal} />
    </div>
  );
};

export default Concert;
