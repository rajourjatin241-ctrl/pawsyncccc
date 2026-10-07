import React, { useState } from 'react'
import styles from './Gallery.module.css'

const pets = [
  {
    id: 1,
    name: 'Sunny',
    breed: 'Golden Retriever',
    age: '3 months',
    location: 'Austin, TX',
    gender: '♂ Male',
    emoji: '💛',
    img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80',
  },
  {
    id: 2,
    name: 'Bella',
    breed: 'Labrador Mix',
    age: '8 months',
    location: 'Portland, OR',
    gender: '♀ Female',
    emoji: '🤎',
    img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80',
  },
  {
    id: 3,
    name: 'Mochi',
    breed: 'Shiba Inu',
    age: '5 months',
    location: 'Seattle, WA',
    gender: '♂ Male',
    emoji: '🧡',
    img: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&q=80',
  },
  {
    id: 4,
    name: 'Luna',
    breed: 'Husky',
    age: '6 months',
    location: 'Denver, CO',
    gender: '♀ Female',
    emoji: '🩵',
    img: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=500&q=80',
  },
  {
    id: 5,
    name: 'Charlie',
    breed: 'Beagle',
    age: '1 year',
    location: 'Chicago, IL',
    gender: '♂ Male',
    emoji: '🤍',
    img: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&q=80',
  },
  {
    id: 6,
    name: 'Coco & Biscuit',
    breed: 'Dachshund Duo',
    age: '2 years',
    location: 'Miami, FL',
    gender: '👫 Bonded Pair',
    emoji: '🩷',
    img: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80',
  },
]

function PetCard({ pet }) {
  const [adopted, setAdopted] = useState(false)

  return (
    <div className={styles.card}>
      <div className={styles.imgWrap}>
        <img src={pet.img} alt={pet.name} loading="lazy" />
        <div className={styles.imgOverlay}>
          <span className={styles.overlayBreed}>{pet.breed}</span>
        </div>
      </div>
      <div className={styles.info}>
        <div className={styles.name}>{pet.name}</div>
        <div className={styles.breed}>{pet.breed}</div>
        <div className={styles.tags}>
          <span className={styles.tag}>🎂 {pet.age}</span>
          <span className={styles.tag}>📍 {pet.location}</span>
          <span className={styles.tag}>{pet.gender}</span>
        </div>
        <button
          className={`${styles.adoptBtn} ${adopted ? styles.adopted : ''}`}
          onClick={() => setAdopted(true)}
        >
          {adopted ? `✓ Applied for ${pet.name}!` : `Adopt Me ${pet.emoji}`}
        </button>
      </div>
    </div>
  )
}

export default function Gallery() {
  return (
    <section id="gallery" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Meet Our <span>Furry Friends</span> 🐾
        </h2>
        <p className={styles.subtitle}>
          Every one of them is waiting for a loving forever home. Could that be yours?
        </p>
        <div className={styles.grid}>
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      </div>
    </section>
  )
}
