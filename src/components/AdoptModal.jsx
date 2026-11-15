import React, { useState } from 'react'
import styles from './AdoptModal.module.css'
import { submitApplication } from '../api'

export default function AdoptModal({ pet, onClose, onSuccess }) {
  const [form, setForm] = useState({
    applicantName: '',
    email: '',
    phone: '',
    housingType: 'apartment',
    hasYard: 'no',
    hasOtherPets: 'no',
    message: '',
  })
  const [status, setStatus] = useState(null) // null | 'loading' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState('')

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setStatus('loading')
    try {
      await submitApplication({
        petId: pet._id,
        applicantName: form.applicantName,
        email: form.email,
        phone: form.phone,
        housingType: form.housingType,
        hasYard: form.hasYard === 'yes',
        hasOtherPets: form.hasOtherPets === 'yes',
        message: form.message,
      })
      setStatus('success')
      onSuccess?.()
      setTimeout(() => onClose(), 2000)
    } catch (err) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>×</button>
        <h2 className={styles.title}>Adopt {pet.name} 🐾</h2>
        {status === 'success' ? (
          <p className={styles.success}>✓ Application submitted! We'll be in touch.</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <label>Full Name
              <input name="applicantName" value={form.applicantName} onChange={handleChange} required />
            </label>
            <label>Email
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </label>
            <label>Phone
              <input name="phone" type="tel" value={form.phone} onChange={handleChange} required />
            </label>
            <label>Housing Type
              <select name="housingType" value={form.housingType} onChange={handleChange}>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="other">Other</option>
              </select>
            </label>
            <label>Do you have a yard?</label>
            <div className={styles.radio}>
              <label><input type="radio" name="hasYard" value="yes" checked={form.hasYard === 'yes'} onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="hasYard" value="no" checked={form.hasYard === 'no'} onChange={handleChange} /> No</label>
            </div>
            <label>Other pets at home?</label>
            <div className={styles.radio}>
              <label><input type="radio" name="hasOtherPets" value="yes" checked={form.hasOtherPets === 'yes'} onChange={handleChange} /> Yes</label>
              <label><input type="radio" name="hasOtherPets" value="no" checked={form.hasOtherPets === 'no'} onChange={handleChange} /> No</label>
            </div>
            <label>Message (optional)
              <textarea name="message" value={form.message} onChange={handleChange} rows={3} />
            </label>
            {status === 'error' && <p className={styles.error}>{errorMsg}</p>}
            <button type="submit" className={styles.submit} disabled={status === 'loading'}>
              {status === 'loading' ? 'Submitting…' : 'Submit Application'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
