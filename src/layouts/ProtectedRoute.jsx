import { Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Loading from "../components/Loading";

const ProtectedRoute = () => {
  const { auth, loading } = useAuth();
  if (loading) return <Loading />;

  return (
    <>
      {auth._id ? (
        <>
          <div className="bg-gray-700 md:flex min-h-screen">
            <Sidebar />
            <main className="p-10 flex-1">
              <Outlet />
            </main>
          </div>
        </>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default ProtectedRoute;
