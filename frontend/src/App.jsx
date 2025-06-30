import { Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import CheckinPage from "./pages/CheckinPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminPanel from "./pages/AdminPanel";
import DoctorPage from "./pages/DoctorPage";
import Header from "./components/Header";
import { Box } from "@mui/material";
import DoctorDashboard from "./pages/doctor/DoctorDashboard";
import HeaderDoctor from "./components/HeaderDoctor";
import DoctorPatients from "./pages/doctor/DoctorPatients";
import DoctorPatientDetail from "./pages/doctor/DoctorPatientDetail";
import DoctorAppointments from "./pages/doctor/DoctorAppointments";
import DoctorTreatmentPlan from "./pages/doctor/DoctorTreatmentPlan";
import StaffReminders from "./pages/doctor/StaffReminders";
import DoctorProfile from "./pages/doctor/DoctorProfile";
import UserDashboard from "./pages/UserDashboard";
import Dashboard from "./pages/Dashboard";
import MedicalRecords from "./pages/MedicalRecords";
import BookAppointment from "./pages/BookAppointment";
import UpcomingAppointments from "./pages/UpcomingAppointments";
import MessagesComments from "./pages/MessagesComments";
import Account from "./pages/Account";
import TreatmentPlanUser from "./pages/TreatmentPlanUser";
import TreatmentPlanDoctor from "./pages/TreatmentPlanDoctor";
import StaffDashboard from "./pages/staff/StaffDashboard";
import DoctorMedicalRecords from "./pages/doctor/DoctorMedicalRecords";
import StaffLayout from "./components/StaffLayout";
import StaffAppointments from "./pages/staff/StaffAppointments";
import StaffDoctors from "./pages/staff/StaffDoctors";
import StaffTreatmentPlans from "./pages/staff/StaffTreatmentPlans";
import StaffMedicalRecords from "./pages/staff/StaffMedicalRecords";

function App() {
  const location = useLocation();
  // const isDoctorRoute = location.pathname.startsWith("/doctor");

  return (
    <Box sx={{ backgroundColor: "#EAE7D6", minHeight: "100vh" }}>
      {!location.pathname.startsWith("/user") &&
        !location.pathname.startsWith("/doctor") &&
        !location.pathname.startsWith("/staff") && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkin" element={<CheckinPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/doctor" element={<DoctorPage />} />
        <Route
          path="/staff-dashboard"
          element={
            <StaffLayout>
              <StaffDashboard />
            </StaffLayout>
          }
        />
        <Route
          path="/staff-reminder"
          element={
            <StaffLayout>
              <StaffReminders />
            </StaffLayout>
          }
        />
        <Route
          path="/staff-appointments"
          element={
            <StaffLayout>
              <StaffAppointments />
            </StaffLayout>
          }
        />
        <Route
          path="/staff-doctors"
          element={
            <StaffLayout>
              <StaffDoctors />
            </StaffLayout>
          }
        />
        <Route
          path="/staff-treatment-plans"
          element={
            <StaffLayout>
              <StaffTreatmentPlans />
            </StaffLayout>
          }
        />

        {/* User Dashboard Routes */}
        <Route path="/user" element={<UserDashboard />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="medical-records" element={<MedicalRecords />} />
          <Route path="appointments" element={<BookAppointment />} />
          <Route
            path="upcoming-appointments"
            element={<UpcomingAppointments />}
          />
          <Route path="messages" element={<MessagesComments />} />
          <Route path="profile" element={<Account />} />
          <Route path="treatmentUser" element={<TreatmentPlanUser />} />
          <Route path="treatmentDoctor" element={<TreatmentPlanDoctor />} />
        </Route>

        {/* Doctor Routes */}
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />
        <Route path="/doctor/patients" element={<DoctorPatients />} />
        <Route path="/doctor/patient/:id" element={<DoctorPatientDetail />} />
        <Route path="/doctor/appointments" element={<DoctorAppointments />} />
        <Route path="/doctor/treatments" element={<DoctorTreatmentPlan />} />
        <Route path="/doctor/reminders" element={<StaffReminders />} />
        <Route path="/doctor/profile" element={<DoctorProfile />} />
        <Route
          path="/doctor/medical-records"
          element={<DoctorMedicalRecords />}
        />
      </Routes>
    </Box>
  );
}

export default App;
