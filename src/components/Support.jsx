import React, { useState } from 'react'
import styles from './Support.module.css'
import { submitContact } from '../api'

const items = [
  { title: 'Technical Architecture Review', desc: 'Guidance on scraper scalability and secure data pipelines for pet surrenders.' },
  { title: 'NGO Outreach Validation', desc: 'Mentor feedback on refining our rescue partner portal proposal.' },
  { title: 'Ethics & Safeguard Alignment', desc: 'Ensuring AI pre-screening algorithms remain fair, transparent, and unbiased.' },
  { title: 'Project Milestones Check-in', desc: 'Establishing bi-weekly check-ins to track progress toward final certification.' },
]

export default function Support() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Technical Architecture Review', message: '' })
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitContact(form)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

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

        <div className={styles.formWrap}>
          <h3 className={styles.formTitle}>Send Us a Message</h3>
          {status === 'success' ? (
            <p className={styles.successMsg}>✓ Message sent!</p>
          ) : (
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>Name
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>Email
                <input name="email" type="email" value={form.email} onChange={handleChange} required />
              </label>
              <label>Subject
                <select name="subject" value={form.subject} onChange={handleChange}>
                  {items.map(item => <option key={item.title} value={item.title}>{item.title}</option>)}
                </select>
              </label>
              <label>Message
                <textarea name="message" value={form.message} onChange={handleChange} rows={4} required />
              </label>
              {status === 'error' && <p className={styles.errorMsg}>{errorMsg}</p>}
              <button type="submit" className={styles.submitBtn} disabled={status === 'loading'}>
                {status === 'loading' ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
