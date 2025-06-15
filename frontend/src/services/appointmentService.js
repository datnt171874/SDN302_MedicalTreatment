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
};
