const router = require('express').Router()
const Contact = require('../models/Contact')

router.post('/', async (req, res, next) => {
  try {
    await Contact.create(req.body)
    res.status(201).json({ success: true })
  } catch (err) { next(err) }
})

module.exports = router
