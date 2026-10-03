import { useEffect, useLayoutEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap.js'
import { initLenis, destroyLenis } from './lib/lenis.js'
import Hero from './components/Hero.jsx'
import Quotes from './components/Quotes.jsx'
import Gallery from './components/Gallery.jsx'
import Closing from './components/Closing.jsx'
import MusicControl from './components/MusicControl.jsx'

export default function App() {
  const progressRef = useRef(null)

  useEffect(() => {
    const lenis = initLenis()

    const handleScroll = () => ScrollTrigger.update()
    lenis.on('scroll', handleScroll)

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    gsap.ticker.lagSmoothing(0)

    const refresh = () => ScrollTrigger.refresh()
    document.fonts?.ready.then(refresh)
    window.addEventListener('load', refresh)

    return () => {
      window.removeEventListener('load', refresh)
      gsap.ticker.remove(raf)
      lenis.off('scroll', handleScroll)
      destroyLenis()
    }
  }, [])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        progressRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: 'none',
          scrollTrigger: { start: 0, end: 'max', scrub: 0.4 },
        },
      )
    }, progressRef)

    return () => {
      ctx.revert()
      gsap.set(progressRef.current, { clearProps: 'all' })
    }
  }, [])

  return (
    <>
      <div
        ref={progressRef}
        className="pointer-events-none fixed top-0 left-0 z-[1100] h-[3px] w-full origin-left bg-linear-to-r from-sec via-fhrt to-primary"
      />
      <Hero />
      <Quotes />
      <Gallery />
      <Closing />
      <MusicControl />
    </>
  )
}
