import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Gallery from './components/Gallery'
import Problem from './components/Problem'
import Vision from './components/Vision'
import Architecture from './components/Architecture'
import Metrics from './components/Metrics'
import Comparison from './components/Comparison'
import ImpactStat from './components/ImpactStat'
import Roadmap from './components/Roadmap'
import NGO from './components/NGO'
import Support from './components/Support'
import Footer from './components/Footer'
import ChatWidget from './components/ChatWidget'

export default function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Gallery />
      <Problem />
      <Vision />
      <Architecture />
      <Metrics />
      <Comparison />
      <ImpactStat />
      <Roadmap />
      <NGO />
      <Support />
      <Footer />
      <ChatWidget />
    </>
  )
}
