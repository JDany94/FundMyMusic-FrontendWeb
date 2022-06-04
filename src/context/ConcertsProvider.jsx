import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ConcertsContext = createContext();

const ConcertsProvider = ({ children }) => {
  const [concerts, setConcerts] = useState([]);
  const [alert, setAlert] = useState({});
  const [concert, setConcert] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalDeleteConcert, setModalDeleteConcert] = useState(false);
  const [searcher, setSearcher] = useState(false);

  const navigate = useNavigate();
  const { auth } = useAuth();

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
      showAlert({
        msg: "Concierto editado correctamente",
        error: false,
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
      showAlert({
        msg: "Concierto creado correctamente",
        error: false,
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
      showAlert({
        msg: data.msg,
        error: false,
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

  const handleSearcher = () => {
    setSearcher(!searcher);
  };

  const singOutConcerts = () => {
    setConcerts([]);
    setConcert({});
    setAlert({});
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
        deleteConcert,
        handleModalDeleteConcert,
        modalDeleteConcert,
        handleSearcher,
        searcher,
        singOutConcerts,
      }}
    >
      {children}
    </ConcertsContext.Provider>
  );
};

export { ConcertsProvider };

export default ConcertsContext;
