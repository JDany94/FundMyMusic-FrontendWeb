const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "bg-[#830700]" : "bg-green-800"
      }  text-center p-2 rounded-full uppercase text-white font-bold text-sm my-5`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
