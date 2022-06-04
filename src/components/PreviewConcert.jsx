import { Link } from "react-router-dom";

const PreviewConcert = ({ concert }) => {
  const { title, _id, place, status, date } = concert;
  return (
    <div className="border-b p-5 flex flex-col md:flex-row justify-between">
      <div>
        <p className="font-bold">{title}</p>
        <span className="pr-3 text-sm text-gray-500 uppercase">
          {place} - {date ? date.split("T")[0].replace(/-/g, "/") : date}
        </span>
        <span
          className={`${
            status === "Open" ? "bg-green-600" : "bg-red-600"
          } px-2 py-1 text-white uppercase text-sm rounded-full`}
        >
          {status}
        </span>
      </div>
      <Link
        to={`${_id}`}
        className="mt-3 text-gray-600 hover:text-gray-800 uppercase text-sm font-bold"
      >
        Ver concierto
      </Link>
    </div>
  );
};

export default PreviewConcert;
