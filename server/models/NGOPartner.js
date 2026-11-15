const mongoose = require('mongoose')
const ngoSchema = new mongoose.Schema({
  orgName: { type: String, required: true },
  contactName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, enum: ['pending', 'approved'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
})
module.exports = mongoose.model('NGOPartner', ngoSchema)
