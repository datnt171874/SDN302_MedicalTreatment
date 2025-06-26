const mongoose = require('mongoose');
const { Schema } = mongoose;

const slotSchema = new Schema({
  time: { type: String, required: true }, // "08:00-08:30"
  isBooked: { type: Boolean, default: false }
});
const workScheduleSchema = new Schema({
  days: [{ type: String, required: true }],
  hours: {
    start: { type: String }, 
    end: { type: String }   
  },
  slots: [slotSchema] 
});


const doctorSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  certificates: [
    {
      name: { type: String, required: true },
      issuedBy: { type: String },
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
  workSchedule: [workScheduleSchema], 
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

module.exports = mongoose.model('Doctor', doctorSchema);