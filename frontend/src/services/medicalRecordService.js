import axios from "axios";
const API_URL = "http://localhost:3000/api/medical-records";

export const medicalRecordService = {
  create: async (data) => {
    const token = localStorage.getItem("token");
    return axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  getAll: async () => {
    const token = localStorage.getItem("token");
    return axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  // Có thể bổ sung các hàm khác nếu cần
};
