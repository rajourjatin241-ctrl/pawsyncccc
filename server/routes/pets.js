const router = require('express').Router()
const Pet = require('../models/Pet')
const auth = require('../middleware/auth')

router.get('/', async (req, res, next) => {
  try {
    const filter = {}
    if (req.query.breed) filter.breed = { $regex: req.query.breed, $options: 'i' }
    if (req.query.location) filter.location = { $regex: req.query.location, $options: 'i' }
    const pets = await Pet.find(filter).sort({ createdAt: -1 })
    res.json(pets)
  } catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id)
    if (!pet) return res.status(404).json({ error: 'Pet not found' })
    res.json(pet)
  } catch (err) { next(err) }
})

router.post('/', auth, async (req, res, next) => {
  try {
    const pet = await Pet.create(req.body)
    res.status(201).json(pet)
  } catch (err) { next(err) }
})

router.put('/:id', auth, async (req, res, next) => {
  try {
    const pet = await Pet.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!pet) return res.status(404).json({ error: 'Pet not found' })
    res.json(pet)
  } catch (err) { next(err) }
})

router.delete('/:id', auth, async (req, res, next) => {
  try {
    await Pet.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (err) { next(err) }
})

module.exports = router
