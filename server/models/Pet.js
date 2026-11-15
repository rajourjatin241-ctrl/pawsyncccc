const mongoose = require('mongoose')
const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  location: { type: String, required: true },
  gender: { type: String, required: true },
  imageUrl: { type: String, required: true },
  status: { type: String, enum: ['available', 'adopted'], default: 'available' },
  source: { type: String, default: '' },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Pet', petSchema)
