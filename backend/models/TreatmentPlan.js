const mongoose = require('mongoose');
const {Schema} = mongoose;
const treatmentPlanSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
  regimen: { type: String, required: true }, // e.g., "TDF + 3TC + DTG"
  startDate: { type: Date, required: true },
  endDate: { type: Date },
  // nextAppointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
  nextAppointmentDate: { type: Date },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TreatmentPlan', treatmentPlanSchema);