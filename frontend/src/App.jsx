import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CheckinPage from "./pages/CheckinPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanel from "./pages/AdminPanel";
import DoctorPage from "./pages/DoctorPage";
import User from "./pages/User";
import Header from "./components/Header";

function App() {
  const location = useLocation(); // Get current location

  return (
    <>
      {location.pathname !== '/user' && <Header />} {/* Conditionally render Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;
