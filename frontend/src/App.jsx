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

import TreatmentPlanUser from "./pages/TreatmentPlanUser";
import TreatmentPlanDoctor from "./pages/TreatmentPlanDoctor";

import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import HeaderDoctor from "./components/HeaderDoctor";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorPatientDetail from "./pages/doctor/DoctorPatientDetail";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";

function App() {
  const location = useLocation();
  const isDoctorRoute = location.pathname.startsWith('/doctor');

  return (
    <>
      {!isDoctorRoute && location.pathname !== '/user' && <Header />}
      {isDoctorRoute && <HeaderDoctor />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/treatmentUser" element={<TreatmentPlanUser />} />
        <Route path="/treatmentDoctor" element={<TreatmentPlanDoctor />} />

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<DoctorPatients/>} />
        <Route path="/doctor/patient/:id" element={<DoctorPatientDetail/>} />
        <Route path="/doctor/appointments" element={<DoctorAppointments/>} />
        {/*<Route path="/doctor/treatments" element={<TreatmentPlanDoctor />} />
        <Route path="/doctor/reminders" element={<DoctorReminders />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} /> */}
      </Routes>
    </>
  );
}

export default App;
