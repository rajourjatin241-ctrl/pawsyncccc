import React from 'react'
import styles from './Roadmap.module.css'

const phases = [
  {
    num: 'Phase 1',
    title: 'Scraper',
    desc: 'Build Reddit & web scraper to extract adoption posts into unified JSON profiles.',
    above: true,
  },
  {
    num: 'Phase 2',
    title: 'AI Bot',
    desc: 'Develop conversational chatbot for intake and adopter pre-screening scoring.',
    above: false,
  },
  {
    num: 'Phase 3',
    title: 'NGO Pilot',
    desc: 'Deploy portal to partner rescues for lead review & certification sign-off.',
    above: true,
  },
  {
    num: 'Phase 4',
    title: 'Launch',
    desc: 'Complete project evaluation, class submission, and community roll-out.',
    above: false,
  },
]

export default function Roadmap() {
  return (
    <section id="roadmap" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Project Implementation Roadmap</h2>
        <p className={styles.sub}>
          Four focused phases to take PawSync from concept to community impact.
        </p>
        <div className={styles.timeline}>
          <div className={styles.line}></div>
          {phases.map(p => (
            <div key={p.num} className={`${styles.phase} ${p.above ? styles.above : styles.below}`}>
              {p.above && (
                <div className={styles.card}>
                  <span className={styles.phaseNum}>{p.num}</span>
                  <h3 className={styles.phaseTitle}>{p.title}</h3>
                  <p className={styles.phaseDesc}>{p.desc}</p>
                </div>
              )}
              <div className={styles.dot}></div>
              {!p.above && (
                <div className={styles.card}>
                  <span className={styles.phaseNum}>{p.num}</span>
                  <h3 className={styles.phaseTitle}>{p.title}</h3>
                  <p className={styles.phaseDesc}>{p.desc}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile stacked view */}
        <div className={styles.mobileList}>
          {phases.map(p => (
            <div key={p.num} className={styles.mobileCard}>
              <div className={styles.mobileDot}></div>
              <div>
                <span className={styles.phaseNum}>{p.num}</span>
                <h3 className={styles.phaseTitle}>{p.title}</h3>
                <p className={styles.phaseDesc}>{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
