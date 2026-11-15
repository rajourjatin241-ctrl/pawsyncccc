const mongoose = require('mongoose')
const applicationSchema = new mongoose.Schema({
  petId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pet', required: true },
  applicantName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  housingType: { type: String, enum: ['apartment', 'house', 'other'], required: true },
  hasYard: { type: Boolean, required: true },
  hasOtherPets: { type: Boolean, required: true },
  message: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('Application', applicationSchema)
