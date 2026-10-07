import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <span className={`${styles.bgPaw} ${styles.p1}`}>🐾</span>
      <span className={`${styles.bgPaw} ${styles.p2}`}>🐾</span>

      <div className={styles.badge}>🐾 Community Service &amp; Tech Project</div>

      <h1 className={styles.title}>
        PawSync: AI Rescue<br />Platform
      </h1>

      <p className={styles.subtitle}>
        Centralizing Animal Adoption Aggregation and Intelligent<br />
        Conversational Pre-Screening
      </p>

      <p className={styles.note}>&lt;/&gt; AI &amp; Web Platform Proposal for Mentor Review</p>

      <div className={styles.btns}>
        <a href="#gallery" className={styles.btnPrimary}>Find a Pet 🐶</a>
        <a href="#problem" className={styles.btnOutline}>Learn More</a>
      </div>

      <div className={styles.scrollHint}>
        <span>Scroll to explore</span>
        <div className={styles.scrollLine}></div>
      </div>
    </section>
  )
}
