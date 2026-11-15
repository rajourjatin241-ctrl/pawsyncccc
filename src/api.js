export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function fetchPets(params = {}) {
  const query = new URLSearchParams(params).toString()
  const res = await fetch(`${BASE_URL}/api/pets${query ? '?' + query : ''}`)
  if (!res.ok) throw new Error('Failed to fetch pets')
  return res.json()
}

export async function submitApplication(data) {
  const res = await fetch(`${BASE_URL}/api/applications`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to submit application')
  }
  return res.json()
}

export async function submitContact(data) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to send message')
  }
  return res.json()
}

export async function registerNGO(data) {
  const res = await fetch(`${BASE_URL}/api/ngo/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(err.error || 'Failed to submit NGO registration')
  }
  return res.json()
}

export async function sendChatMessage(message, sessionState) {
  const res = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, sessionState }),
  })
  if (!res.ok) throw new Error('Chat error')
  return res.json()
}
