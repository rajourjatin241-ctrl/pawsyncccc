require('dotenv').config()
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const Pet = require('./models/Pet')
const Admin = require('./models/Admin')

const pets = [
  { name: 'Sunny', breed: 'Golden Retriever', age: '3 months', location: 'Austin, TX', gender: 'Male', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80', status: 'available', description: 'A friendly and energetic golden puppy.' },
  { name: 'Bella', breed: 'Labrador Mix', age: '8 months', location: 'Portland, OR', gender: 'Female', imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80', status: 'available', description: 'Sweet and playful lab mix who loves cuddles.' },
  { name: 'Mochi', breed: 'Shiba Inu', age: '5 months', location: 'Seattle, WA', gender: 'Male', imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&q=80', status: 'available', description: 'Bold and independent Shiba pup.' },
  { name: 'Luna', breed: 'Husky', age: '6 months', location: 'Denver, CO', gender: 'Female', imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=500&q=80', status: 'available', description: 'Adventurous husky who loves the snow.' },
  { name: 'Charlie', breed: 'Beagle', age: '1 year', location: 'Chicago, IL', gender: 'Male', imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&q=80', status: 'available', description: 'Curious and merry beagle with a great nose.' },
  { name: 'Coco & Biscuit', breed: 'Dachshund Duo', age: '2 years', location: 'Miami, FL', gender: 'Bonded Pair', imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80', status: 'available', description: 'An inseparable bonded pair — they come together!' },
]

async function seed() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/pawsync')
  console.log('Connected to MongoDB')

  await Pet.deleteMany({})
  await Pet.insertMany(pets)
  console.log('Seeded 6 pets')

  const existing = await Admin.findOne({ username: 'admin' })
  if (!existing) {
    const passwordHash = await bcrypt.hash('pawsync2024', 10)
    await Admin.create({ username: 'admin', passwordHash })
    console.log('Created admin user')
  } else {
    console.log('Admin already exists')
  }

  await mongoose.disconnect()
  console.log('Done.')
}

seed().catch(err => { console.error(err); process.exit(1) })
