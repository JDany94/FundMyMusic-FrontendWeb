import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthLayout from "./layouts/AuthLayout";
import ProtectedRoute from "./layouts/ProtectedRoute";

import Singin from "./pages/Singin";
import Singup from "./pages/Singup";
import ForgotPassword from "./pages/ForgotPassword";
import NewPassword from "./pages/NewPassword";
import ConfirmAccount from "./pages/ConfirmAccount";
import Dashboard from "./pages/Dashboard";
import NewConcert from "./pages/NewConcert";
import Concert from "./pages/Concert";
import EditConcert from "./pages/EditConcert";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import { AuthProvider } from "./context/AuthProvider";
import { ConcertsProvider } from "./context/ConcertsProvider";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ConcertsProvider>
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Singin />} />
              <Route path="singup" element={<Singup />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="forgot-password/:token" element={<NewPassword />} />
              <Route path="confirm-account/:id" element={<ConfirmAccount />} />
            </Route>
            <Route path="/dashboard" element={<ProtectedRoute />}>
              <Route index element={<Dashboard />} />
              <Route path="new-concert" element={<NewConcert />} />
              <Route path="profile" element={<Profile />} />
              <Route path=":id" element={<Concert />} />
              <Route path="concert/edit/:id" element={<EditConcert />} />
              <Route path="profile/edit" element={<EditProfile />} />
            </Route>
          </Routes>
        </ConcertsProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
