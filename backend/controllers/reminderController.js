const Reminder = require("../models/Reminder");

const createReminder = async (req, res) => {
  try {
    const { userId, type, reminderDate, message } = req.body;

    if (!userId || !type || !reminderDate || !message) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (!["Staff", "Admin"].includes(req.user.roleName)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    const newReminder = new Reminder({
      userId,
      type,
      reminderDate,
      message,
      status: "Pending",
      createdAt: new Date(),
    });

    await newReminder.save();

    res.status(201).json({ message: "Reminder created", reminder: newReminder });
  } catch (err) {
    console.error("Error creating reminder:", err);
    res.status(500).json({ message: "Error creating reminder", error: err.message });
  }
};

const getAllReminders = async (req, res) => {
  try {
    let filter = {};

    if (req.user.roleName === "Customer") {
      filter = { userId: req.user.id };
    }

    if (!["Staff", "Admin", "Customer"].includes(req.user.roleName)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    const reminders = await Reminder.find(filter).populate("userId", "fullName email");
    res.json(reminders);
  } catch (err) {
    console.error("Error fetching reminders:", err);
    res.status(500).json({ message: "Error fetching reminders", error: err.message });
  }
};

module.exports = {
  createReminder,
  getAllReminders,
};