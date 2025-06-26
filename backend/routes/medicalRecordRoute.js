// routes/medicalRecordRoutes.js
const express = require("express");
const router = express.Router();
const medicalRecordController = require("../controllers/medicalRecordController");
const { authenticate } = require("../middlewares/authMiddleware");

router.post("/", authenticate, medicalRecordController.createMedicalRecord);
router.get("/", authenticate, medicalRecordController.getMedicalRecordsByUser);

module.exports = router;