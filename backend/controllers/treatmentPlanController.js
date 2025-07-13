const TreatmentPlan = require("../models/TreatmentPlan");

exports.createTreatmentPlan = async (req, res) => {
  try {
    const { userId, doctorId, regimen, startDate, endDate, nextAppointmentDate, notes } = req.body;

    if (!userId || !doctorId || !regimen || !startDate) {
      return res.status(400).json({ message: "Missing required fields: userId, doctorId, regimen, or startDate" });
    }

    const treatmentPlan = new TreatmentPlan({
      userId,
      doctorId,
      regimen,
      startDate: new Date(startDate),
      endDate: endDate ? new Date(endDate) : null,
      nextAppointmentDate,
      notes,
    });

    const savedPlan = await treatmentPlan.save();
    res.status(201).json(savedPlan);
  } catch (err) {
    console.error("Error creating treatment plan:", err);
    res.status(500).json({ message: "Failed to create treatment plan", error: err.message });
  }
};

exports.getAllTreatmentPlans = async (req, res) => {
  try {
    const treatmentPlans = await TreatmentPlan.find().populate("userId doctorId nextAppointmentDate");
    res.json(treatmentPlans);
  } catch (err) {
    console.error("Error fetching treatment plans:", err);
    res.status(500).json({ message: "Failed to fetch treatment plans", error: err.message });
  }
};

exports.getTreatmentPlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const treatmentPlan = await TreatmentPlan.findById(id).populate("userId doctorId nextAppointmentDate");
    if (!treatmentPlan) {
      return res.status(404).json({ message: "Treatment plan not found" });
    }
    res.json(treatmentPlan);
  } catch (err) {
    console.error("Error fetching treatment plan:", err);
    res.status(500).json({ message: "Failed to fetch treatment plan", error: err.message });
  }
};

exports.updateTreatmentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, doctorId, regimen, startDate, endDate, nextAppointmentDate, notes } = req.body;

    const updatedPlan = await TreatmentPlan.findByIdAndUpdate(
      id,
      {
        userId: userId || undefined, // Allow userId to be updated if provided, otherwise keep existing
        doctorId: doctorId || undefined, // Allow doctorId to be updated if provided, otherwise keep existing
        regimen,
        startDate: startDate ? new Date(startDate) : undefined,
        endDate: endDate ? new Date(endDate) : null,
        nextAppointmentDate,
        notes,
        updatedAt: Date.now(),
      },
      { new: true, runValidators: true }
    ).populate("userId doctorId");

    if (!updatedPlan) {
      return res.status(404).json({ message: "Treatment plan not found" });
    }
    res.json(updatedPlan);
  } catch (err) {
    console.error("Error updating treatment plan:", err);
    res.status(500).json({ message: "Failed to update treatment plan", error: err.message });
  }
};
exports.deleteTreatmentPlan = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPlan = await TreatmentPlan.findByIdAndDelete(id);
    if (!deletedPlan) {
      return res.status(404).json({ message: "Treatment plan not found" });
    }
    res.json({ message: "Treatment plan deleted successfully" });
  } catch (err) {
    console.error("Error deleting treatment plan:", err);
    res.status(500).json({ message: "Failed to delete treatment plan", error: err.message });
  }
};