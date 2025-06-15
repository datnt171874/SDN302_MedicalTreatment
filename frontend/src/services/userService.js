import axios from "axios";

const API_URL = "http://localhost:3000/api/auth/me"; // Backend route for getting profile

export const userService = {
  getProfile: async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("token");

      // If no token is found, return null or handle as needed
      if (!token) {
        console.error("No token found");
        return null;
      }

      // Send request to the backend with the token in the Authorization header
      const res = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Return the response data (user profile)
      return res.data;
    } catch (err) {
      // Log the error and return null
      console.error("Error fetching user profile:", err);
      return null;
    }
  },
};
