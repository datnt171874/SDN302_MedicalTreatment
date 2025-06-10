import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckinPage from "./pages/CheckinPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanel from "./pages/AdminPanel";
import DoctorPage from "./pages/DoctorPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/doctor" element={<DoctorPage />} />
      </Routes>
    </>
  );
}

export default App;
