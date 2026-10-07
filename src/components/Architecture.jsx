import React from 'react'
import styles from './Architecture.module.css'

const cards = [
  {
    icon: '🕷️',
    title: 'Web & Reddit Scraper',
    text: 'Monitors subreddits and partner NGO websites to parse unstructured posts into standardized profiles with age, location, and health status.',
  },
  {
    icon: '💬',
    title: 'AI Conversational Bot',
    text: 'Interviews prospective adopters regarding living space, work hours, and experience to generate a match suitability score.',
  },
  {
    icon: '📋',
    title: 'Verified Intake Portal',
    text: 'A structured surrender workflow requiring health histories and photo verification to prevent improper pet relinquishment.',
  },
]

export default function Architecture() {
  return (
    <section id="features" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Core System Architecture</h2>
        <p className={styles.sub}>
          Three powerful components working in harmony to streamline the entire rescue and adoption pipeline.
        </p>
        <div className={styles.grid}>
          {cards.map(c => (
            <div key={c.title} className={styles.card}>
              <div className={styles.iconWrap}>{c.icon}</div>
              <h3 className={styles.title}>{c.title}</h3>
              <p className={styles.text}>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
