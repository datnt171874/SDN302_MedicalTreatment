import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DoctorPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/doctor/dashboard", { replace: true });
  }, [navigate]);
  return null;
};

export default DoctorPage;
