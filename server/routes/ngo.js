const router = require('express').Router()
const NGOPartner = require('../models/NGOPartner')
const auth = require('../middleware/auth')

router.post('/register', async (req, res, next) => {
  try {
    const partner = await NGOPartner.create(req.body)
    res.status(201).json({ success: true, id: partner._id })
  } catch (err) { next(err) }
})

router.get('/', auth, async (req, res, next) => {
  try {
    const partners = await NGOPartner.find().sort({ createdAt: -1 })
    res.json(partners)
  } catch (err) { next(err) }
})

module.exports = router
