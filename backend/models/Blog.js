const mongoose = require('mongoose');
const {Schema} = mongoose;
const Blog = new Schema({
  title: { type: String, required: true },
  contentType: { type: String, enum: ['Document', 'Blog'], required: true },
  body: { type: String, required: true },
  authorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

module.exports = mongoose.model('EducationalContent', educationalContentSchema);