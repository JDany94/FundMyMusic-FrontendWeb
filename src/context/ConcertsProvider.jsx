import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.all.js";

const ConcertsContext = createContext();

const ConcertsProvider = ({ children }) => {
  const [concerts, setConcerts] = useState([]);
  const [alert, setAlert] = useState({});
  const [concert, setConcert] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalDeleteConcert, setModalDeleteConcert] = useState(false);
  const [enabledSwitch, setEnabledSwitch] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const navigate = useNavigate();
  const { auth, setAuth } = useAuth();

  useEffect(() => {
    const getConcerts = async () => {
      try {
        const token = localStorage.getItem("x-auth-token");
        if (!token) return;
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await axiosClient.get("/concerts/artist", config);
        setConcerts(data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    getConcerts();
  }, [auth]);

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitConcert = async (concert) => {
    if (concert.id) {
      await editConcert(concert);
    } else {
      await newConcert(concert);
    }
  };

  const editConcert = async (concert) => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) return;
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(
        `/concerts/artist/${concert.id}`,
        concert,
        config
      );

      const syncConcerts = concerts.map((concertState) =>
        concertState._id === data._id ? data : concertState
      );
      setConcerts(syncConcerts);
      setLoading(false);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Concierto editado correctamente",
        showConfirmButton: false,
        timer: 1500,
        color: "#fff",
        background: "#111827",
      });
      navigate(`/dashboard/${data._id}`);
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: "Error de conexión",
        error: true,
      });
      console.log(error);
      navigate("/dashboard");
    }
  };

  const newConcert = async (concert) => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) return;
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.post(
        "/concerts/artist",
        concert,
        config
      );

      setConcerts([...concerts, data]);
      setLoading(false);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Concierto creado correctamente",
        showConfirmButton: false,
        timer: 1500,
        color: "#fff",
        background: "#111827",
      });
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: "Error de conexión",
        error: true,
      });
      console.log(error);
      navigate("/dashboard");
    }
  };

  const getConcert = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.get(`/concerts/artist/${id}`, config);
      setConcert(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: "Error de conexión",
        error: true,
      });
      console.log(error);
      navigate("/dashboard");
    }
  };

  const deleteConcert = async (id) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.delete(
        `/concerts/artist/${id}`,
        config
      );

      const syncConcerts = concerts.filter(
        (concertsState) => concertsState._id !== id
      );
      setConcerts(syncConcerts);
      setLoading(false);
      Swal.fire({
        position: "top",
        icon: "success",
        title: data.msg,
        showConfirmButton: false,
        timer: 1500,
        color: "#fff",
        background: "#111827",
      });
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: "Error de conexión",
        error: true,
      });
      navigate("/dashboard");
    }
  };

  const handleModalDeleteConcert = () => {
    setModalDeleteConcert(!modalDeleteConcert);
  };

  const handleEnabledSwitch = (boolean) => {
    setEnabledSwitch(boolean);
  };

  const handleSearcher = () => {
    setSearcher(!searcher);
  };

  const singOutConcerts = () => {
    setConcerts([]);
    setConcert({});
    setAlert({});
  };

  const editProfile = async (user) => {
    try {
      const token = localStorage.getItem("x-auth-token");
      if (!token) return;
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axiosClient.put(`/user/profile`, user, config);
      setAuth(data);
      setLoading(false);
      Swal.fire({
        position: "top",
        icon: "success",
        title: "Perfil editado correctamente",
        showConfirmButton: false,
        timer: 1500,
        color: "#fff",
        background: "#111827",
      });
      navigate(`/dashboard/profile`);
    } catch (error) {
      setLoading(false);
      showAlert({
        msg: "Error de conexión",
        error: true,
      });
      console.log(error);
      navigate("/dashboard");
    }
  };

  return (
    <ConcertsContext.Provider
      value={{
        concerts,
        showAlert,
        alert,
        submitConcert,
        getConcert,
        concert,
        loading,
        setLoading,
        deleteConcert,
        handleModalDeleteConcert,
        modalDeleteConcert,
        handleSearcher,
        searcher,
        singOutConcerts,
        handleEnabledSwitch,
        enabledSwitch,
        editProfile,
      }}
    >
      {children}
    </ConcertsContext.Provider>
  );
};

export { ConcertsProvider };

export default ConcertsContext;
