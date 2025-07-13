import axios from "axios";
const API_URL = "http://localhost:3000/api/appointment/appointment";

export const appointmentService = {
  create: async (data) => {
    const token = localStorage.getItem("token");
    return axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getAll: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    return axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getById: async (id) => {
    const token = localStorage.getItem("token");
    return axios.get(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getByDoctorAndDate: async (doctorId, date) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    try {
      if (!doctorId || !date) {
        throw new Error("Missing doctorId or date");
      }
      const formattedDate = date; // Already formatted as YYYY-MM-DD
      console.log(`Calling API: /api/appointment/appointments?doctorId=${doctorId}&date=${formattedDate}`);
      const response = await axios.get(
        `http://localhost:3000/api/appointment/appointments?doctorId=${doctorId}&date=${formattedDate}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("API response:", response.data);
      return response.data || [];
    } catch (err) {
      console.error(
        "Error in getByDoctorAndDate:",
        err.response?.data || err.message
      );
      throw new Error(
        err.response?.data?.message || "Failed to fetch appointments"
      );
    }
  },
  getConfirmedAppointments: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No authentication token found");
    }
    const response = await axios.get(`${API_URL}/appointments`, {
      headers: { Authorization: `Bearer ${token}` },
      params: { status: "Confirmed" },
    });
    return response.data;
  },
  checkExistingAppointments: async () => {
    try {
      console.log("Checking existing appointments for user");
      const response = await axios.get(
        "http://localhost:3000/api/appointment/appointment",
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      console.log("Existing appointments:", response.data);
      return response.data.length > 0; 
    } catch (err) {
      console.error("Error checking existing appointments:", err.response?.data || err);
      return false; 
    }
  }
};
