import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CheckinPage from "./pages/CheckinPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanel from "./pages/AdminPanel";
import DoctorPage from "./pages/DoctorPage";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header";
import { Box } from "@mui/material";

function App() {
  const location = useLocation(); // Get current location

  return (
    <Box sx={{ backgroundColor: '#EAE7D6', minHeight: '100vh' }}>
      {!location.pathname.startsWith('/user') && <Header />} {/* Conditionally render Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/doctor" element={<DoctorPage />} />
        
        {/* User Dashboard Routes */}
        <Route path="/user" element={<UserDashboard><Dashboard /></UserDashboard>} />
        <Route path="/user/dashboard" element={<UserDashboard><Dashboard /></UserDashboard>} />
        <Route path="/user/medical-records" element={<UserDashboard><div>Medical Records</div></UserDashboard>} />
        <Route path="/user/appointments" element={<UserDashboard><div>Book Appointment</div></UserDashboard>} />
        <Route path="/user/messages" element={<UserDashboard><div>Messages & Comments</div></UserDashboard>} />
        <Route path="/user/profile" element={<UserDashboard><div>Account</div></UserDashboard>} />
      </Routes>
    </Box>
  );
}

export default App;
