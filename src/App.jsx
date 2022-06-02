import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Singin from "./pages/Singin";
import Singup from "./pages/Singup";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Singin />} />
          <Route path="singup" element={<Singup />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="forgot-password/:token" element={<NewPassword />} />
          <Route path="confirm-account/:id" element={<ConfirmAccount />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
