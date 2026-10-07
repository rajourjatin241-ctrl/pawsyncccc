import React from 'react'
import styles from './Comparison.module.css'

const rows = [
  ['Data Aggregation', 'Manual checking across multiple sites', 'Automated web & Reddit scraper pipeline'],
  ['Adopter Vetting', 'Manual evaluation of long forms', 'Conversational AI screening & scoring'],
  ['Surrender Intake', 'Unstructured emails & phone calls', 'Verified photo & medical intake flow'],
  ['NGO Volunteer Workload', 'High repetitive administrative burden', 'Pre-filtered candidate lead handoffs'],
]

export default function Comparison() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.heading}>Platform Comparison</h2>
        <p className={styles.sub}>
          How PawSync stacks up against the traditional rescue process across every key dimension.
        </p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Feature / Dimension</th>
                <th>Traditional Rescue Process</th>
                <th>PawSync Solution</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, trad, paw]) => (
                <tr key={feature}>
                  <td className={styles.feature}>{feature}</td>
                  <td>{trad}</td>
                  <td className={styles.pawCell}>{paw}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
