import axios from "axios";
const API_URL = "http://localhost:3000/api/appointment";

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
    return axios.get(`${API_URL}/appointment`, {
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
      console.log(
        `Calling API: ${API_URL}/appointments?doctorId=${doctorId}&date=${date}`
      );
      const response = await axios.get(`${API_URL}/appointments`, {
        headers: { Authorization: `Bearer ${token}` },
        params: { doctorId, date },
      });
      console.log("API response:", response.data);
      return response.data;
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
};
