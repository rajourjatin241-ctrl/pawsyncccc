const router = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Admin = require('../models/Admin')

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body
    const admin = await Admin.findOne({ username })
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' })
    const valid = await bcrypt.compare(password, admin.passwordHash)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })
    const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token })
  } catch (err) { next(err) }
})

module.exports = router
