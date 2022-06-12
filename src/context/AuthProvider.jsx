import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../config/axiosClient";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState({});

  const navigate = useNavigate();
// TODO arreglar el cargando cuando abres despues de un tiempo
  useEffect(() => {
    const authenticateUser = async () => {
      const token = localStorage.getItem("x-auth-token");
      if (!token) {
        setLoading(false);
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        const { data } = await axiosClient.get("/user/profile", config);
        setAuth(data);
        navigate("/dashboard");
      } catch (error) {
        setAuth({});
      } finally {
        setLoading(false);
      }
    };
    authenticateUser();
  }, []);

  const singOutAuth = () => {
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        singOutAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
