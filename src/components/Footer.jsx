import React from 'react'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logo}>PawSync <span>🐾</span></div>
        <p className={styles.tagline}>
          Centralizing Animal Adoption Aggregation and Intelligent Conversational Pre-Screening
        </p>
        <div className={styles.badge}>Community Service &amp; AI Project Proposal</div>
        <hr className={styles.divider} />
        <p className={styles.copy}>© 2026 PawSync. All rights reserved. Built with ❤️ for animals everywhere.</p>
      </div>
    </footer>
  )
}
