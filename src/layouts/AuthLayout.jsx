import { Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <>
      <main className="container mx-auto p-5 md:flex md:justify-center">
        <div className="md:w-2/3 lg:w-2/5">
          <Outlet />
        </div>
      </main>
    </>
  );
};
export default AuthLayout;
