const mongoose = require('mongoose');
const {Schema} = mongoose;
const reminderSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Revisit', 'Medication'], required: true },
  reminderDate: { type: Date, required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Pending', 'Sent', 'Dismissed'], default: 'Pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Reminder', reminderSchema);