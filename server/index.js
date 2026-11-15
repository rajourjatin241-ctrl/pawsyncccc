require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

const app = express()

const allowedOrigins = [
  'http://localhost:5173',
  'https://rajourjatin241-ctrl.github.io',
  'https://pawsync.vercel.app',
  /\.vercel\.app$/,
]
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)
    const allowed = allowedOrigins.some(o => 
      typeof o === 'string' ? o === origin : o.test(origin)
    )
    if (allowed) return callback(null, true)
    callback(new Error('Not allowed by CORS'))
  },
  credentials: true,
}))
app.use(express.json())

app.use('/api/pets', require('./routes/pets'))
app.use('/api/applications', require('./routes/applications'))
app.use('/api/contact', require('./routes/contact'))
app.use('/api/ngo', require('./routes/ngo'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/chat', require('./routes/chat'))

app.get('/api/health', (req, res) => res.json({ status: 'ok' }))

app.use(errorHandler)

const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pawsync'

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`PawSync server running on port ${PORT}`))
  })
  .catch(err => {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  })
