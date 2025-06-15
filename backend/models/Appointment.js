const mongoose = require("mongoose");
const { Schema } = mongoose;
const appointmentSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  appointmentCode: { type: String, required: true },
  appointmentDate: { type: Date, required: true },
  duration: { type: String, enum: ["30", "60"], required: false },
  appointmentType: {
    type: String,
    enum: ["Consultation", "Examination"],
    required: true,
  },
  price: { type: Number, required: true },
  isAnonymous: { type: Boolean, default: false },
  isRevisit: { type: Boolean, required: true },
  note: { type: String },
  pricingId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Pricing",
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Completed", "Cancelled"],
    default: "Pending",
  },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
