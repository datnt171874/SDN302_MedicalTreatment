const MedicalRecord = require("../models/MedicalRecord");
const { validationResult } = require("express-validator");

// Create a new medical record
exports.createMedicalRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      userId,
      appointmentId,
      treatmentPlanId,
      diagnosis,
      prescription,
      notes,
    } = req.body;

    const medicalRecord = new MedicalRecord({
      userId,
      appointmentId,
      treatmentPlanId,
      diagnosis,
      prescription,
      notes,
      recordDate: new Date(),
    });

    const savedRecord = await medicalRecord.save();

    await savedRecord.populate([
      { path: "userId", select: "fullName email" },
      { path: "appointmentId" },
      { path: "treatmentPlanId" },
    ]);

    res.status(201).json({
      success: true,
      data: savedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating medical record",
      error: error.message,
    });
  }
};

// Get all medical records
exports.getAllMedicalRecords = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find()
      .populate("userId", "fullName email")
      .populate("appointmentId")
      .populate("treatmentPlanId")
      .sort({ recordDate: -1 });

    res.status(200).json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching medical records",
      error: error.message,
    });
  }
};

// Get medical record by ID
exports.getMedicalRecordById = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id)
      .populate("userId", "fullName email")
      .populate("appointmentId")
      .populate("treatmentPlanId");

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    res.status(200).json({
      success: true,
      data: medicalRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching medical record",
      error: error.message,
    });
  }
};

// Get medical records by user ID
exports.getMedicalRecordsByUserId = async (req, res) => {
  try {
    const medicalRecords = await MedicalRecord.find({
      userId: req.params.userId,
    })
      .populate("userId", "fullName email")
      .populate("appointmentId")
      .populate("treatmentPlanId")
      .sort({ recordDate: -1 });

    res.status(200).json({
      success: true,
      count: medicalRecords.length,
      data: medicalRecords,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching medical records",
      error: error.message,
    });
  }
};

// Update medical record
exports.updateMedicalRecord = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { diagnosis, prescription, notes, treatmentPlanId } = req.body;

    const medicalRecord = await MedicalRecord.findById(req.params.id);

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    medicalRecord.diagnosis = diagnosis || medicalRecord.diagnosis;
    medicalRecord.prescription = prescription || medicalRecord.prescription;
    medicalRecord.notes = notes || medicalRecord.notes;
    medicalRecord.treatmentPlanId =
      treatmentPlanId || medicalRecord.treatmentPlanId;

    const updatedRecord = await medicalRecord.save();

    await updatedRecord.populate([
      { path: "userId", select: "fullName email" },
      { path: "appointmentId" },
      { path: "treatmentPlanId" },
    ]);

    res.status(200).json({
      success: true,
      data: updatedRecord,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating medical record",
      error: error.message,
    });
  }
};

// Delete medical record
exports.deleteMedicalRecord = async (req, res) => {
  try {
    const medicalRecord = await MedicalRecord.findById(req.params.id);

    if (!medicalRecord) {
      return res.status(404).json({
        success: false,
        message: "Medical record not found",
      });
    }

    await medicalRecord.remove();

    res.status(200).json({
      success: true,
      message: "Medical record deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting medical record",
      error: error.message,
    });
  }
};
