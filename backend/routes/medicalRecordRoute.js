// routes/medicalRecordRoutes.js
const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, medicalRecordController.createMedicalRecord);
router.get("/", authenticate, medicalRecordController.getMedicalRecordsByUser);
router.get(
  "/all",
  authenticate,
  medicalRecordController.getAllMedicalRecordsForDoctor
);
router.put("/:id", authenticate, medicalRecordController.updateMedicalRecord);
router.delete(
  "/:id",
  authenticate,
  medicalRecordController.deleteMedicalRecord
);

module.exports = router;
