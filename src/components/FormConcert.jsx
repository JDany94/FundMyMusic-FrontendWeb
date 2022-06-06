import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useConcerts from "../hooks/useConcerts";
import Alert from "./Alert";
import Loading from "./Loading";
import SwitchForm from "./Switch";

const GENRE = [
  "Electronic",
  "Rock",
  "Jazz",
  "Dubstep",
  "Blues",
  "Techno",
  "Country",
  "Pop",
  "Hip-Hop",
  "Evergreen",
  "Heavy Metal",
  "Música Clásica",
  "K-Pop",
  "Música independiente",
  "Salsa",
  "Reggaeton",
  "Reggae",
];

const FormConcert = () => {
  const [id, setId] = useState(null);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [minimumSales, setMinimumSales] = useState("");
  const [gift, setGift] = useState("");
  const [price, setPrice] = useState("");

  const {
    showAlert,
    alert,
    submitConcert,
    concert,
    loading,
    enabledSwitch,
    handleEnabledSwitch,
  } = useConcerts();

  const params = useParams();

  useEffect(() => {
    handleEnabledSwitch(false);
  }, []);

  useEffect(() => {
    if (params.id) {
      setId(concert._id);
      setTitle(concert.title);
      setGenre(concert.genre);
      setPlace(concert.place);
      setDate(concert.date?.split("T")[0]);
      setDescription(concert.description);
      setCapacity(concert.capacity);
      setMinimumSales(concert.minimumSales);
      setGift(concert.gift);
      if (concert.gift !== "") {
        handleEnabledSwitch(true);
      }
      setPrice(concert.price);
    }
  }, [params]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      [
        title,
        genre,
        place,
        date,
        description,
        capacity,
        minimumSales,
        price,
      ].includes("")
    ) {
      showAlert({
        msg: "Faltan campos por llenar",
        error: true,
      });
      return;
    }

    if (
      parseInt(capacity) <= 0 ||
      parseInt(minimumSales) < 0 ||
      parseInt(price) <= 0
    ) {
      showAlert({
        msg: "Capacidad, precio o ventas minimas incorrectas",
        error: true,
      });
      return;
    }

    if (parseInt(capacity) < parseInt(minimumSales)) {
      showAlert({
        msg: "Las ventas minimas no pueden ser mayores que la capacidad",
        error: true,
      });
      return;
    }

    const JSON = {
      id,
      title,
      genre,
      place,
      date,
      description,
      capacity,
      minimumSales,
      gift,
      price,
    };

    await submitConcert(JSON);

    setId(null);
    setTitle("");
    setGenre("");
    setPlace("");
    setDate("");
    setDescription("");
    setCapacity("");
    setMinimumSales("");
    setGift("");
    setPrice("");
  };

  const { msg } = alert;

  return (
    <form className="md:w-1/2" onSubmit={handleSubmit}>
      {msg && <Alert alert={alert} />}
      {loading && <Loading />}
      <div className="text-center mb-5">
        <label className="text-white uppercase font-bold text-md">
          Datos del concierto
        </label>
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Título"
          className=" w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <select
          type="text"
          className="w-full p-2 mt-2 rounded-xl bg-gray-800 text-gray-400 font-bold"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="">-- Género --</option>
          {GENRE.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      <div className="mb-5">
        <input
          type="text"
          placeholder="Lugar del concierto"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center mb-5">
        <label className="w-full mt-2 text-white uppercase text-md font-bold">
          Fecha del concierto
        </label>
        <input
          // TODO: Validar fechas anteriores al presente
          type="date"
          className="w-full p-2 mt-2 rounded-xl bg-gray-800 text-gray-400 font-bold"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <textarea
          rows={5}
          placeholder="Descripción"
          className="resize-none w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          type="number"
          placeholder="Capacidad del concierto"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
        />
      </div>
      <div className="mb-5">
        <input
          type="number"
          placeholder="Entradas vendidas necesarias para cerrar la fecha del concierto"
          className=" w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={minimumSales}
          onChange={(e) => setMinimumSales(e.target.value)}
        />
      </div>
      <div className="flex justify-center items-center mb-5">
        <p className="w-full mt-2 text-white uppercase text-md font-bold">
          Recompensas para la pre-venta
        </p>
        <SwitchForm />
      </div>
      {enabledSwitch && (
        <div className="mb-5">
          <input
            type="text"
            placeholder="Detalles de la recompensa"
            className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
            value={gift}
            onChange={(e) => setGift(e.target.value)}
          />
        </div>
      )}
      <div className="mb-5">
        <input
          type="number"
          placeholder="Precio de las entradas (€)"
          className="w-full p-2 mt-2 placeholder-gray-400 rounded-xl bg-gray-800 text-white font-bold"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>
      <input
        type="submit"
        value={id ? "Actualizar concierto" : "Publicar concierto"}
        className="bg-red-800 mb-5 w-full py-3 text-white uppercase font-bold rounded-full hover:cursor-pointer hover:bg-[#830700] transition-colors"
      />
    </form>
  );
};

export default FormConcert;
