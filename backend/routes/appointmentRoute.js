const express = require("express");
const router = express.Router();

const appointmentController = require("../controllers/appointmentController");
const treatmentPlanController = require("../controllers/treatmentPlanController");
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
router.get(
  "/appointments",
  appointmentController.getAppointmentsByDoctorAndDate
);
router.get("/treatment-plan", treatmentPlanController.getAllTreatmentPlans);
router.post("/treatment-plan", treatmentPlanController.createTreatmentPlan);

router.put("/:id", authenticate, appointmentController.updateAppointmentStatus);
router.get("/", appointmentController.getAppointmentByCode);
module.exports = router;
