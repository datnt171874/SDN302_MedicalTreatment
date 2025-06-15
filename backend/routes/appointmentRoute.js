const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post(
  "/appointment",
  authenticate,
  appointmentController.createAppointment
);
router.get(
  "/appointment",
  authenticate,
  appointmentController.getAllAppointments
);
router.get(
  "/appointment/:id",
  authenticate,
  appointmentController.getAppointmentById
);

module.exports = router;
