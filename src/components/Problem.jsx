import React from 'react'
import styles from './Problem.module.css'

const bottlenecks = [
  {
    icon: '🗂️',
    title: 'Listing Fragmentation',
    text: 'Animals needing rehoming are scattered across individual NGO websites, local subreddits, and private social media channels. Adopters struggle to find accurate, up-to-date listings in a single accessible place.',
  },
  {
    icon: '🔥',
    title: 'Severe Volunteer Burnout',
    text: 'Rescue organizations suffer an overwhelming annual turnover rate. Staff spend countless manual hours evaluating repetitive applicant inquiries and conducting initial vetting checks.',
  },
]

export default function Problem() {
  return (
    <section id="problem" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.center}>
          <h2 className={styles.heading}>Problem Statement</h2>
          <div className={styles.tealBar}></div>
          <p className={styles.desc}>
            Overburdened animal welfare networks face extreme listing fragmentation and high volunteer friction, causing delays in lifesaving pet adoptions.
          </p>
        </div>
        <div className={styles.cards}>
          {bottlenecks.map(b => (
            <div key={b.title} className={styles.card}>
              <div className={styles.icon}>{b.icon}</div>
              <h3 className={styles.cardTitle}>{b.title}</h3>
              <p className={styles.cardText}>{b.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
