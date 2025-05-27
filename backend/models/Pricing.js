const mongoose = require('mongoose');
const {Schema} = mongoose;

const pricingSchema = new Schema({
  appointmentType: { type: String, enum: ['Consultation', 'Examination'], required: true },
  duration: { type: String, enum: ['30', '60', '90'], required: true },
  price: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('Pricing', pricingSchema);