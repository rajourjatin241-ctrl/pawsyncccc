import React from 'react'
import styles from './Support.module.css'

const items = [
  {
    title: 'Technical Architecture Review',
    desc: 'Guidance on scraper scalability and secure data pipelines for pet surrenders.',
  },
  {
    title: 'NGO Outreach Validation',
    desc: 'Mentor feedback on refining our rescue partner portal proposal.',
  },
  {
    title: 'Ethics & Safeguard Alignment',
    desc: 'Ensuring AI pre-screening algorithms remain fair, transparent, and unbiased.',
  },
  {
    title: 'Project Milestones Check-in',
    desc: 'Establishing bi-weekly check-ins to track progress toward final certification.',
  },
]

export default function Support() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Strategic Support Needed</h2>
        <p className={styles.sub}>Areas where mentor guidance will accelerate our mission.</p>
        <div className={styles.list}>
          {items.map(item => (
            <div key={item.title} className={styles.item}>
              <div className={styles.check}>✓</div>
              <div>
                <h4 className={styles.itemTitle}>{item.title}</h4>
                <p className={styles.itemDesc}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
