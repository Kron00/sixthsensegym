import { useState, useEffect } from 'react'
import './App.css'
import useLenis from './hooks/useLenis'
import useGsap from './hooks/useGsap'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Ticker from './components/Ticker'
import Mission from './components/Mission'
import Gallery from './components/Gallery'
import Stats from './components/Stats'
import Banner from './components/Banner'
import Features from './components/Features'
import Membership from './components/Membership'
import Reviews from './components/Reviews'
import About from './components/About'
import FAQ from './components/FAQ'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  const [loading, setLoading] = useState(true)
  const lenisRef = useLenis()
  useGsap()

  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [loading])

  return (
    <>
      <Loader onComplete={() => setLoading(false)} />
      {!loading && (
        <>
          <Cursor />
          <Nav />
          <main>
            <Hero />
            <Ticker />
            <Mission />
            <Gallery />
            <Stats />
            <Banner />
            <Features />
            <Membership />
            <Reviews />
            <About />
            <FAQ />
            <CTA />
          </main>
          <Footer />
        </>
      )}
    </>
  )
}

export default App
