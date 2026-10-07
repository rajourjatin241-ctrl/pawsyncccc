import React from 'react'
import styles from './Vision.module.css'

export default function Vision() {
  return (
    <section id="solution" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.text}>
            <h2 className={styles.heading}>The PawSync Vision</h2>
            <p className={styles.label}>Bridging Tech &amp; Animal Welfare</p>
            <p className={styles.body}>
              PawSync automates the aggregation of animal listings across Reddit and rescue sites
              while acting as a 24/7 intelligent adoption assistant. By standardizing unstructured
              surrender posts and conducting automated applicant pre-screening, PawSync ensures
              animals are matched faster with suitable, verified homes.
            </p>
            <a href="#features" className={styles.btn}>Explore Features →</a>
          </div>
          <div className={styles.imgWrap}>
            <img
              src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=700&q=80"
              alt="Dogs and cats"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
