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
import UpcomingAppointments from "./pages/UpcomingAppointments";
import MedicalRecords from "./pages/MedicalRecords";
import BookAppointment from "./pages/BookAppointment";
import MessagesComments from "./pages/MessagesComments";
import Account from "./pages/Account";


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
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<Dashboard />} /> {/* Default child route for /user */}
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="appointments" element={<BookAppointment />} />
          <Route path="upcoming-appointments" element={<UpcomingAppointments />} />
          <Route path="messages" element={<MessagesComments />} />
          <Route path="profile" element={<Account />} />
        </Route>
      </Routes>
    </Box>
  );
}

export default App;
