import { Link } from "react-router-dom";

const PreviewConcert = ({ concert }) => {
  const { title, _id, place, status, date, soldOut } = concert;
  return (
    <div className="border-b border-gray-700 p-4 flex flex-col md:flex-row justify-between">
      <div>
        <div className="pb-2">
          <p className="font-bold text-white text-lg">{title}</p>
          <span className="text-sm text-gray-400 uppercase">
            {place} - {date ? date.split("T")[0].replace(/-/g, "/") : date}
          </span>
        </div>
        <div className="flex gap-2 xs:mb-3 md:mb-0">
          <div
            className={`${
              status === "Open" ? "bg-green-600" : "bg-red-600"
            } p-3 text-white uppercase text-sm rounded-full`}
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
          </div>
          {soldOut ? (
            <div className={"bg-red-600 p-3 text-white rounded-full"}>
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
            </div>
          ) : null}
        </div>
      </div>
      <div className="grid content-center">
        <Link
          to={`${_id}`}
          className="flex items-center gap-2 text-white hover:text-[#BA0A00] uppercase text-sm font-bold"
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          Ver concierto
        </Link>
      </div>
    </div>
  );
};

export default PreviewConcert;
