const mongoose = require('mongoose');
const {Schema} = mongoose;

const doctorSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  certificates: [
    {
      name: { type: String, required: true },
      issuedBy: { type: String},
      date: { type: Date, required: true },
    },
  ],
  experiences: [
    {
      position: { type: String, required: true },
      organization: { type: String, required: true },
      startDate: { type: Date, required: true },
      endDate: { type: Date },
    },
  ],
  skills: [
    {
      name: { type: String, required: true },
      level: { type: String, required: true },
    },
  ],
  workSchedule: { type: String }, // JSON string, e.g., '{"monday": "08:00-16:00"}'
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Doctor', doctorSchema);