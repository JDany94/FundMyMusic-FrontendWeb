import { useState, useEffect, createContext } from "react";
import axiosClient from "../config/axiosClient";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2/dist/sweetalert2.all.js";
import axios from "axios";

const ConcertsContext = createContext();

const ConcertsProvider = ({ children }) => {
  const [concerts, setConcerts] = useState([]);
  const [alert, setAlert] = useState({});
  const [concert, setConcert] = useState({});
  const [loading, setLoading] = useState(false);
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

  const validName = (val) => {
    return /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
      val
    );
  };

  const showAlert = (alert) => {
    setAlert(alert);
    setTimeout(() => {
      setAlert({});
    }, 5000);
  };

  const submitConcert = async (concert, file) => {
    if (concert.id) {
      await editConcert(concert);
    } else {
      await newConcert(concert, file);
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
        position: "center",
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

  const newConcert = async (concert, file) => {
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

      let formData = new FormData();
      formData.append("file", file);
      await axios({
        url: "http://localhost:4000/api/files",
        method: "POST",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        data: formData,
      })
        .then(async (response) => {
          concert.FlyerURL = response.data.url;
          concert.FlyerPublicId = response.data.publicId;
          concert.FlyerSize = response.data.size;
          const { data } = await axiosClient.post(
            "/concerts/artist",
            concert,
            config
          );

          setConcerts([...concerts, data]);
          setLoading(false);
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Concierto creado correctamente",
            showConfirmButton: false,
            timer: 1500,
            color: "#fff",
            background: "#111827",
          });
          navigate("/dashboard");
        })
        .catch(function (error) {
          setLoading(false);
          showAlert({
            msg: "Error de conexión",
            error: true,
          });
          console.log(error);
          navigate("/dashboard");
        });
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
        position: "center",
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
        position: "center",
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
        handleSearcher,
        searcher,
        singOutConcerts,
        handleEnabledSwitch,
        enabledSwitch,
        editProfile,
        validName,
      }}
    >
      {children}
    </ConcertsContext.Provider>
  );
};

export { ConcertsProvider };

export default ConcertsContext;
