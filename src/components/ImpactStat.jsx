import React from 'react'
import styles from './ImpactStat.module.css'

export default function ImpactStat() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Target Impact Metrics</h2>
        <div className={styles.grid}>
          <div className={styles.statCard}>
            <div className={styles.bigNum}>75%</div>
            <div className={styles.statLabel}>Reduction in Initial Screening Time</div>
          </div>
          <div className={styles.textSide}>
            <h3>Maximizing Lifesaving Capacity</h3>
            <p>
              Automating preliminary candidate evaluation relieves severe administrative strain on
              partner rescues, facilitating faster placements and expanding available shelter capacity.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
