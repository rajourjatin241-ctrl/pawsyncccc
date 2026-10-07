import React from 'react'
import styles from './NGO.module.css'

export default function NGO() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>NGO Collaboration Strategy</h2>
        <div className={styles.grid}>
          <div className={styles.imgWrap}>
            <img
              src="https://images.unsplash.com/photo-1559190394-df5a28aab5c5?w=500&q=80"
              alt="Volunteers with animals"
              loading="lazy"
            />
          </div>
          <div className={styles.text}>
            <h3>Partnering for Certification</h3>
            <p>
              To satisfy course service hours and obtain official NGO certification, PawSync offers
              partner rescues a zero-cost dashboard. Rescues receive pre-vetted adoption leads and
              verified surrender profiles, solving real operational needs while validating our system
              in live conditions.
            </p>
            <div className={styles.chips}>
              <span className={styles.chip}>🏆 Zero-Cost Dashboard</span>
              <span className={styles.chip}>✅ Pre-Vetted Leads</span>
              <span className={styles.chip}>📸 Verified Profiles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
