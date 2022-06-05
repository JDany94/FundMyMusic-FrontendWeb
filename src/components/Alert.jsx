const Alert = ({ alert }) => {
  return (
    <div
      className={`${
        alert.error ? "bg-[#830700]" : "bg-green-800"
      }  text-center p-3 rounded-xl uppercase text-white font-bold text-sm my-10`}
    >
      {alert.msg}
    </div>
  );
};

export default Alert;
