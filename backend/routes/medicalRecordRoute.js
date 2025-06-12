const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { authenticate } = require("../middlewares/authMiddleware");
const {
  createMedicalRecord,
  getAllMedicalRecords,
  getMedicalRecordById,
  getMedicalRecordsByUserId,
  updateMedicalRecord,
  deleteMedicalRecord,
} = require("../controllers/medicalRecordController");

// Validation middleware
const medicalRecordValidation = [
  check("userId", "User ID is required").notEmpty(),
  check("appointmentId", "Appointment ID is required").notEmpty(),
  check("diagnosis", "Diagnosis is required").notEmpty(),
  check(
    "prescription.medicationName",
    "Medication name is required"
  ).notEmpty(),
  check("prescription.dosage", "Dosage is required").notEmpty(),
  check("prescription.frequency", "Frequency is required").notEmpty(),
  check("prescription.duration", "Duration is required").notEmpty(),
];

router.post(
  "/",
  [authenticate, ...medicalRecordValidation],
  createMedicalRecord
);

router.get("/", authenticate, getAllMedicalRecords);

router.get("/:id", authenticate, getMedicalRecordById);

router.get("/user/:userId", authenticate, getMedicalRecordsByUserId);

router.put("/:id", authenticate, updateMedicalRecord);

router.delete("/:id", authenticate, deleteMedicalRecord);

module.exports = router;
