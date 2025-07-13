import axios from "axios";

const reminderService = {
  async getAllReminders() {
    try {
      console.log("Fetching reminders");
      const response = await axios.get("http://localhost:3000/api/reminders/", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("Reminders fetched:", response.data);
      return response.data || [];
    } catch (err) {
      console.error("Error fetching reminders:", err.response?.data || err);
      throw err;
    }
  },
};

export default reminderService;