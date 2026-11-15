import React, { useState, useRef, useEffect } from 'react'
import styles from './ChatWidget.module.css'
import { sendChatMessage } from '../api'

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sessionState, setSessionState] = useState({})
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const startChat = async () => {
    if (started) return
    setStarted(true)
    setLoading(true)
    try {
      const { reply, nextState } = await sendChatMessage('', {})
      setMessages([{ from: 'bot', text: reply }])
      setSessionState(nextState)
    } catch {
      setMessages([{ from: 'bot', text: 'Sorry, I could not connect. Please try again later.' }])
    }
    setLoading(false)
  }

  const handleOpen = () => {
    setOpen(true)
    startChat()
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    setMessages(m => [...m, { from: 'user', text }])
    setLoading(true)
    try {
      const { reply, nextState } = await sendChatMessage(text, sessionState)
      setMessages(m => [...m, { from: 'bot', text: reply }])
      setSessionState(nextState)
    } catch {
      setMessages(m => [...m, { from: 'bot', text: 'Something went wrong. Please try again.' }])
    }
    setLoading(false)
  }

  const handleKey = e => { if (e.key === 'Enter') handleSend() }

  return (
    <div className={styles.wrapper}>
      {open && (
        <div className={styles.window}>
          <div className={styles.header}>
            <span>PawSync Adoption Advisor 🐾</span>
            <button className={styles.closeBtn} onClick={() => setOpen(false)}>×</button>
          </div>
          <div className={styles.messages}>
            {messages.map((msg, i) => (
              <div key={i} className={`${styles.msg} ${msg.from === 'user' ? styles.user : styles.bot}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className={`${styles.msg} ${styles.bot}`}>…</div>}
            <div ref={bottomRef} />
          </div>
          <div className={styles.inputRow}>
            <input
              className={styles.input}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Type a message…"
              disabled={loading}
            />
            <button className={styles.sendBtn} onClick={handleSend} disabled={loading}>Send</button>
          </div>
        </div>
      )}
      <button className={styles.bubble} onClick={open ? () => setOpen(false) : handleOpen} aria-label="Open chat">
        🐾
      </button>
    </div>
  )
}
