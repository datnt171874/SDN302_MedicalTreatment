const MedicalRecord = require("../models/MedicalRecord");

const createMedicalRecord = async (req, res) => {
  try {
    const { userId, appointmentId, treatmentPlanId, diagnosis, prescription, notes, recordDate } = req.body;

    if (!userId || !appointmentId || !diagnosis || !prescription || !recordDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    if (req.user.roleName !== "Doctor") {
      return res.status(403).json({ message: "Forbidden: Only doctors can create medical records" });
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
      .populate("treatmentPlanId", "regimen startDate endDate nextAppointmentDate notes");

    res.status(201).json({ message: "Medical record created", medicalRecord: populatedRecord });
  } catch (err) {
    console.error("Error creating medical record:", err);
    res.status(500).json({ message: "Error creating medical record", error: err.message });
  }
};

const getMedicalRecordsByUser = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user authenticated" });
    }

    let filter = {};
    if (req.user.roleName === "Customer") {
      filter = { userId: req.user.id };
    } else if (req.user.roleName === "Doctor" && userId) {
      filter = { userId };
    } else if (!["Admin"].includes(req.user.roleName)) {
      return res.status(403).json({ message: "Forbidden: Insufficient permissions" });
    }

    const medicalRecords = await MedicalRecord.find(filter)
      .populate("userId", "fullName email")
      .populate("appointmentId", "appointmentDate appointmentType")
      .populate("treatmentPlanId", "regimen startDate endDate nextAppointmentDate notes");

    res.json(medicalRecords);
  } catch (err) {
    console.error("Error fetching medical records:", err);
    res.status(500).json({ message: "Error fetching medical records", error: err.message });
  }
};

module.exports = {
  createMedicalRecord,
  getMedicalRecordsByUser,
};