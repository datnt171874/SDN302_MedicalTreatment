const mongoose = require("mongoose");
const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  medicationName: { type: String, required: true },
  dosage: { type: String, required: true },
  frequency: { type: String, required: true },
  duration: { type: String, required: true },
  instructions: { type: String },
});

const medicalRecordSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
    required: true,
  },
  treatmentPlanId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "TreatmentPlan",
  },
  diagnosis: { type: String },
  prescription: [{ type: prescriptionSchema, default: [] }],
  notes: { type: String },
  recordDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);
