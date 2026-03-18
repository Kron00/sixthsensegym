import { useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function useGsap() {
  useEffect(() => {
    // Refresh ScrollTrigger after all images load
    const images = document.querySelectorAll('img')
    let loaded = 0
    const total = images.length

    function checkAll() {
      loaded++
      if (loaded >= total) {
        ScrollTrigger.refresh()
      }
    }

    images.forEach((img) => {
      if (img.complete) {
        checkAll()
      } else {
        img.addEventListener('load', checkAll)
        img.addEventListener('error', checkAll)
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])
}

export { gsap, ScrollTrigger }
