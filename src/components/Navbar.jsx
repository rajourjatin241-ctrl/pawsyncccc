import React, { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Problem', href: '#problem' },
  { label: 'Solution', href: '#solution' },
  { label: 'Features', href: '#features' },
  { label: 'Roadmap', href: '#roadmap' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#home" className={styles.logo}>
        PawSync <span>🐾</span>
      </a>

      {/* Desktop links */}
      <ul className={styles.links}>
        {links.map(l => (
          <li key={l.label}>
            <a href={l.href}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contact" className={styles.cta}>Get Started</a>
        </li>
      </ul>

      {/* Mobile hamburger */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(o => !o)}
        aria-label="Toggle menu"
      >
        {menuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className={styles.drawer}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)}>
              {l.label}
            </a>
          ))}
          <a href="#contact" className={styles.drawerCta} onClick={() => setMenuOpen(false)}>
            Get Started
          </a>
        </div>
      )}
    </nav>
  )
}
