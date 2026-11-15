const router = require('express').Router()
const Application = require('../models/Application')
const auth = require('../middleware/auth')

router.post('/', async (req, res, next) => {
  try {
    const app = await Application.create(req.body)
    res.status(201).json({ success: true, id: app._id })
  } catch (err) { next(err) }
})

router.get('/', auth, async (req, res, next) => {
  try {
    const apps = await Application.find().populate('petId').sort({ createdAt: -1 })
    res.json(apps)
  } catch (err) { next(err) }
})

router.put('/:id', auth, async (req, res, next) => {
  try {
    const { status } = req.body
    const app = await Application.findByIdAndUpdate(req.params.id, { status }, { new: true })
    if (!app) return res.status(404).json({ error: 'Application not found' })
    res.json(app)
  } catch (err) { next(err) }
})

module.exports = router
