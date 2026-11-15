import React, { useState } from 'react'
import styles from './NGOModal.module.css'
import { registerNGO } from '../api'

export default function NGOModal({ onClose }) {
  const [form, setForm] = useState({ orgName: '', contactName: '', email: '', phone: '', website: '', description: '' })
  const [status, setStatus] = useState(null)
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await registerNGO(form)
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2 className={styles.title}>Partner With Us 🤝</h2>
        {status === 'success' ? (
          <p className={styles.success}>✓ Application received! We'll review and reach out within 48 hours.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Organization Name
              <input name="orgName" value={form.orgName} onChange={handleChange} required />
            </label>
            <label>Contact Name
              <input name="contactName" value={form.contactName} onChange={handleChange} required />
            </label>
            <label>Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>Phone
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            </label>
            <label>Website (optional)
              <input name="website" type="url" value={form.website} onChange={handleChange} />
            </label>
            <label>Description
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} required />
            </label>
            {status === 'error' && <p className={styles.error}>{errorMsg}</p>}
            <button type="submit" className={styles.submit} disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting…' : 'Submit Partnership Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
