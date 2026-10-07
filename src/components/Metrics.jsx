import React, { useEffect, useRef, useState } from 'react'
import styles from './Metrics.module.css'

const bars = [
  { label: 'Manual Vetting Hours', width: 100, text: '100% Baseline', color: 'red' },
  { label: 'PawSync Screening Time', width: 25, text: '25% (−75%)', color: 'teal' },
  { label: 'Adoption Speedup Rate', width: 80, text: '80% Faster', color: 'blue' },
]

export default function Metrics() {
  const [animated, setAnimated] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setAnimated(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section className={styles.section}>
      <div className={styles.container} ref={ref}>
        <h2 className={styles.heading}>Operational Efficiency Impact</h2>
        <p className={styles.sub}>
          See how PawSync transforms rescue operations through intelligent automation.
        </p>
        <div className={styles.bars}>
          {bars.map(bar => (
            <div key={bar.label} className={styles.row}>
              <div className={styles.label}>{bar.label}</div>
              <div className={styles.track}>
                <div
                  className={`${styles.fill} ${styles[bar.color]}`}
                  style={{ width: animated ? `${bar.width}%` : '0%' }}
                >
                  {bar.text}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.quote}>
          By handling preliminary applicant interviews automatically, PawSync cuts rescue vetting
          workloads by <strong>75%</strong>, allowing staff to focus exclusively on final home approvals.
        </div>
      </div>
    </section>
  )
}
