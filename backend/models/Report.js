const mongoose = require('mongoose');
const {Schema} = mongoose;
const reportSchema = new Schema({
  reportType: {
    type: String,
    enum: ['AppointmentSummary', 'TestResultSummary', 'TreatmentProgress'],
    required: true,
  },
  generatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  data: { type: mongoose.Schema.Types.Mixed, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Report', reportSchema);