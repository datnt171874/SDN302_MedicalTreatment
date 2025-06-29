const MedicalRecord = require("../models/MedicalRecord");

const createMedicalRecord = async (req, res) => {
  try {
    const {
      userId,
      appointmentId,
      treatmentPlanId,
      diagnosis,
      prescription,
      notes,
      recordDate,
    } = req.body;

    if (!userId || !appointmentId || !diagnosis || !recordDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Validate prescription array
    if (
      !prescription ||
      !Array.isArray(prescription) ||
      prescription.length === 0
    ) {
      return res
        .status(400)
        .json({ message: "Prescription must be a non-empty array" });
    }

    // Validate each prescription object
    for (let i = 0; i < prescription.length; i++) {
      const med = prescription[i];
      if (
        !med.medicationName ||
        !med.dosage ||
        !med.frequency ||
        !med.duration
      ) {
        return res.status(400).json({
          message: `Prescription item ${
            i + 1
          } is missing required fields: medicationName, dosage, frequency, or duration`,
        });
      }
    }

    if (req.user.roleName !== "Doctor") {
      return res.status(403).json({
        message: "Forbidden: Only doctors can create medical records",
      });
    }

    const newMedicalRecord = new MedicalRecord({
      userId,
      appointmentId,
      treatmentPlanId: treatmentPlanId || null,
      diagnosis,
      prescription,
      notes,
      recordDate,
      createdAt: new Date(),
    });

    await newMedicalRecord.save();

    const populatedRecord = await MedicalRecord.findById(newMedicalRecord._id)
      .populate("userId", "fullName email")
      .populate("appointmentId", "appointmentDate appointmentType")
      .populate(
        "treatmentPlanId",
        "regimen startDate endDate nextAppointmentDate notes"
      );

    res.status(201).json({
      message: "Medical record created",
      medicalRecord: populatedRecord,
    });
  } catch (err) {
    console.error("Error creating medical record:", err);
    res
      .status(500)
      .json({ message: "Error creating medical record", error: err.message });
  }
};

const getMedicalRecordsByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user authenticated" });
    }

    let filter = {};

    // Customer can only see their own records
    if (req.user.roleName === "Customer") {
      filter = { userId: req.user.id };
    }
    // Doctor can see all records or specific user records
    else if (req.user.roleName === "Doctor") {
      if (userId) {
        // If userId is provided, get records for that specific user
        filter = { userId };
      } else {
        // If no userId provided, get all records (doctor can see all)
        filter = {};
      }
    }
    // Admin can see all records
    else if (req.user.roleName === "Admin") {
      if (userId) {
        filter = { userId };
      } else {
        filter = {};
      }
    }
    // Other roles are not allowed
    else {
      return res
        .status(403)
        .json({ message: "Forbidden: Insufficient permissions" });
    }

    const medicalRecords = await MedicalRecord.find(filter)
      .populate("userId", "fullName email")
      .populate("appointmentId", "appointmentDate appointmentType")
      .populate(
        "treatmentPlanId",
        "regimen startDate endDate nextAppointmentDate notes"
      );

    res.json(medicalRecords);
  } catch (err) {
    console.error("Error fetching medical records:", err);
    res
      .status(500)
      .json({ message: "Error fetching medical records", error: err.message });
  }
};

const getAllMedicalRecordsForDoctor = async (req, res) => {
  try {
    if (!req.user) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No user authenticated" });
    }

    if (req.user.roleName !== "Doctor") {
      return res
        .status(403)
        .json({ message: "Forbidden: Only doctors can access this endpoint" });
    }

    const medicalRecords = await MedicalRecord.find({})
      .populate("userId", "fullName email phone")
      .populate("appointmentId", "appointmentDate appointmentType")
      .populate(
        "treatmentPlanId",
        "regimen startDate endDate nextAppointmentDate notes"
      )
      .sort({ createdAt: -1 }); // Sort by newest first

    res.json(medicalRecords);
  } catch (err) {
    console.error("Error fetching all medical records:", err);
    res
      .status(500)
      .json({ message: "Error fetching medical records", error: err.message });
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecordsByUser,
  getAllMedicalRecordsForDoctor,
};
