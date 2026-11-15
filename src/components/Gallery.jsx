import React, { useState, useEffect } from 'react'
import styles from './Gallery.module.css'
import AdoptModal from './AdoptModal'

const FALLBACK_PETS = [
  { _id: '1', name: 'Sunny', breed: 'Golden Retriever', age: '3 months', location: 'Austin, TX', gender: '♂ Male', emoji: '💛', imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=500&q=80' },
  { _id: '2', name: 'Bella', breed: 'Labrador Mix', age: '8 months', location: 'Portland, OR', gender: '♀ Female', emoji: '🤎', imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&q=80' },
  { _id: '3', name: 'Mochi', breed: 'Shiba Inu', age: '5 months', location: 'Seattle, WA', gender: '♂ Male', emoji: '🧡', imageUrl: 'https://images.unsplash.com/photo-1583511655826-05700d52f4d9?w=500&q=80' },
  { _id: '4', name: 'Luna', breed: 'Husky', age: '6 months', location: 'Denver, CO', gender: '♀ Female', emoji: '🩵', imageUrl: 'https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=500&q=80' },
  { _id: '5', name: 'Charlie', breed: 'Beagle', age: '1 year', location: 'Chicago, IL', gender: '♂ Male', emoji: '🤍', imageUrl: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=500&q=80' },
  { _id: '6', name: 'Coco & Biscuit', breed: 'Dachshund Duo', age: '2 years', location: 'Miami, FL', gender: '👫 Bonded Pair', emoji: '🩷', imageUrl: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=500&q=80' },
]

function SkeletonCard() {
  return (
    <div className={styles.card} style={{opacity: 1}}>
      <div className={styles.imgWrap} style={{background: 'rgba(255,255,255,0.05)', animation: 'pulse 1.5s ease-in-out infinite'}} />
      <div className={styles.info}>
        <div style={{height: 20, width: '60%', background: 'rgba(255,255,255,0.08)', borderRadius: 6, marginBottom: 8, animation: 'pulse 1.5s ease-in-out infinite'}} />
        <div style={{height: 14, width: '80%', background: 'rgba(255,255,255,0.05)', borderRadius: 6, marginBottom: 12, animation: 'pulse 1.5s ease-in-out infinite'}} />
        <div style={{height: 36, background: 'rgba(124,58,237,0.2)', borderRadius: 8, animation: 'pulse 1.5s ease-in-out infinite'}} />
      </div>
    </div>
  )
}

function PetCard({ pet }) {
  const [modalOpen, setModalOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const getEmoji = (gender) => {
    if (gender.includes('Female')) return '🩵'
    if (gender.includes('Pair')) return '🩷'
    return '💛'
  }

  return (
    <>
      <div className={styles.card}>
        <div className={styles.imgWrap}>
          <img src={pet.imageUrl} alt={pet.name} loading="lazy" />
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
            className={`${styles.adoptBtn} ${submitted ? styles.adopted : ''}`}
            onClick={() => !submitted && setModalOpen(true)}
          >
            {submitted ? `✓ Applied for ${pet.name}!` : `Adopt Me ${getEmoji(pet.gender)}`}
          </button>
        </div>
      </div>
      {modalOpen && (
        <AdoptModal
          pet={pet}
          onClose={() => setModalOpen(false)}
          onSuccess={() => { setSubmitted(true); setModalOpen(false) }}
        />
      )}
    </>
  )
}

export default function Gallery() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/pets')
      .then(r => r.ok ? r.json() : Promise.reject())
      .then(data => { setPets(data.length ? data : FALLBACK_PETS); setLoading(false) })
      .catch(() => { setPets(FALLBACK_PETS); setLoading(false) })
  }, [])

  return (
    <section id="gallery" className={styles.section}>
      <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Meet Our <span>Furry Friends</span> 🐾
        </h2>
        <p className={styles.subtitle}>
          Every one of them is waiting for a loving forever home. Could that be yours?
        </p>
        <div className={styles.grid}>
          {loading
            ? [1,2,3].map(i => <SkeletonCard key={i} />)
            : pets.map(pet => <PetCard key={pet._id} pet={pet} />)
          }
        </div>
      </div>
    </section>
  )
}
