import { useParams, Link } from "react-router-dom";
import useConcerts from "../hooks/useConcerts";
import { useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const Concert = () => {
  const params = useParams();
  const { getConcert, concert, loading, deleteConcert, alert } = useConcerts();

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

  const handleDelete = () => {
    Swal.fire({
      title: "¿Eliminar?",
      text: "Es probable que ya se hayan vendido algunas entradas...",
      icon: "error",
      color: "#fff",
      background: "#111827",
      showCancelButton: true,
      confirmButtonColor: "#BA0A00",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteConcert(params.id);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Concierto eliminado",
          showConfirmButton: false,
          timer: 1500,
          color: "#fff",
          background: "#111827",
        });
      }
    });
  };

  const { msg } = alert;

  if (loading) return <Loading />;

  return (
    <div>
      {msg && <Alert alert={alert} />}
      <div className="flex xs:flex-col md:flex-row justify-between gap-5 items-center">
        <div>
          <h1 className="text-white font-bold text-5xl mb-5">{title}</h1>
          <div className="flex gap-2">
            <div
              className={`${
                status === "Open" ? "bg-green-600" : "bg-red-700"
              } flex gap-2 items-center py-2 px-3 text-white text-sm rounded-full`}
            >
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
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="font-bold">
                {status === "Open" ? "Fecha Abierta" : "Fecha Cerrada"}
              </p>
            </div>
            {soldOut ? (
              <div className="flex gap-2 bg-red-700 items-center py-2 px-3 text-white text-sm rounded-full">
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
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
                <p className="font-bold">Agotado</p>
              </div>
            ) : null}
          </div>
        </div>
        <div>
          {status === "Open" ? (
            <Link
              to={`/dashboard/concert/edit/${params.id}`}
              className="mb-3 flex gap-2 text-white uppercase font-bold text-lg hover:text-[#BA0A00]"
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
          ) : null}
          <div className="flex gap-2 text-red-600 hover:text-[#830700]">
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
              onClick={handleDelete}
            >
              Eliminar
            </button>
          </div>
        </div>
      </div>
      <div className="mt-5 flex gap-4 xs:flex-col md:flex-row">
        <div className="flex justify-center">
          <img
            className="rounded-xl"
            src={concert.FlyerURL}
            style={{ width: "290px", height: "340px" }}
          />
        </div>
        <div className="bg-gray-900 w-full rounded-xl flex items-center">
          <div className="p-5">
            <p className="pb-3 text-md text-gray-500 uppercase">
              {place} -{" "}
              {date
                ? date
                    .split("T")[0]
                    .split("-")
                    .reverse()
                    .join()
                    .replace(/,/g, "/")
                : date}
            </p>
            <p className="pb-2 text-sm text-white uppercase font-bold">
              Género
            </p>
            <p className="pb-3 text-md text-gray-500 uppercase">{genre}</p>
            <p className="pb-2 text-sm text-white uppercase font-bold">
              Descripción
            </p>
            <p className="pb-3 text-md text-gray-500 uppercase">
              {description}
            </p>
            <p className="pb-2 text-sm text-white uppercase font-bold">
              Recompensas por pre-venta
            </p>
            <p className="pb-3 text-md text-gray-500 uppercase">
              {gift === "" ? "N/A" : gift}
            </p>
          </div>
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
    </div>
  );
};

export default Concert;
