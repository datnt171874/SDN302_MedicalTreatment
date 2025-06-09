import { Route, Routes } from "react-router-dom";
import "./App.css";
import CheckinPage from "./pages/CheckinPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import User from "./pages/User";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
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
