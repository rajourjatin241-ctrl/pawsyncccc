const router = require('express').Router()

const STEPS = ['greeting', 'housing', 'yard', 'other_pets', 'allergies', 'activity', 'done']

const BREED_SUGGESTIONS = {
  apartment: { active: 'Border Collie or Australian Shepherd', moderate: 'Labrador Mix or Beagle', low: 'Shiba Inu or French Bulldog' },
  house: { active: 'Golden Retriever or Husky', moderate: 'Labrador or Beagle', low: 'Dachshund or Basset Hound' },
  other: { active: 'Golden Retriever or Labrador', moderate: 'Beagle or Cocker Spaniel', low: 'Shih Tzu or Maltese' },
}

router.post('/', (req, res) => {
  const { message, sessionState = {} } = req.body
  const state = { ...sessionState }
  const currentStep = state.step || 'greeting'

  let reply = ''
  let nextState = { ...state }
  let qualified = null

  if (currentStep === 'greeting') {
    reply = 'Hi there! 🐾 Welcome to PawSync Adoption Advisor. To help match you with the perfect pet, I have a few quick questions. First — what type of home do you have? (apartment / house / other)'
    nextState.step = 'housing'
  } else if (currentStep === 'housing') {
    const lower = message.toLowerCase()
    if (lower.includes('homeless') || lower.includes('no home')) {
      nextState.housing = 'homeless'
    } else if (lower.includes('apartment')) {
      nextState.housing = 'apartment'
    } else if (lower.includes('house')) {
      nextState.housing = 'house'
    } else {
      nextState.housing = 'other'
    }
    reply = 'Great! Do you have a yard or outdoor space? (yes / no)'
    nextState.step = 'yard'
  } else if (currentStep === 'yard') {
    nextState.yard = message.toLowerCase().includes('yes')
    reply = 'Do you currently have any other pets at home? (yes / no)'
    nextState.step = 'other_pets'
  } else if (currentStep === 'other_pets') {
    nextState.otherPets = message.toLowerCase().includes('yes')
    reply = 'Does anyone in your household have pet allergies? (yes / no)'
    nextState.step = 'allergies'
  } else if (currentStep === 'allergies') {
    nextState.allergies = message.toLowerCase().includes('yes')
    reply = 'What is your daily activity level? (active / moderate / low)'
    nextState.step = 'activity'
  } else if (currentStep === 'activity') {
    const lower = message.toLowerCase()
    if (lower.includes('active')) nextState.activity = 'active'
    else if (lower.includes('low')) nextState.activity = 'low'
    else nextState.activity = 'moderate'
    nextState.step = 'done'

    if (nextState.housing === 'homeless') {
      qualified = false
      reply = 'Thank you so much for your interest! 💛 Right now, our adoption process requires a stable home address to ensure the best environment for our pets. We encourage you to reach out to local shelters who may have resources to help. We hope to hear from you in the future!'
    } else {
      qualified = true
      const housingKey = nextState.housing || 'other'
      const activityKey = nextState.activity || 'moderate'
      const suggestion = (BREED_SUGGESTIONS[housingKey] || BREED_SUGGESTIONS.other)[activityKey] || 'a Labrador Mix'
      reply = `You sound like a wonderful pet parent! 🎉 Based on your lifestyle, we think a ${suggestion} would be a great match for you. Browse our Gallery and hit "Adopt Me" on any pet you love — we'd be thrilled to connect you!`
    }
  } else {
    reply = 'Thanks for chatting with us! 🐾 Visit our Gallery to meet all available pets and click "Adopt Me" to start an application.'
    nextState.step = 'done'
    qualified = true
  }

  res.json({ reply, nextState, qualified })
})

module.exports = router
