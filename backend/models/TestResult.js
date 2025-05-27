const mongoose = require('mongoose');
const {Schema} = mongoose;
const testResultSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  testType: { type: String, enum: ['CD4', 'ViralLoad', 'Other'], required: true },
  resultValue: { type: String, required: true },
  testDate: { type: Date, required: true },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TestResult', testResultSchema);