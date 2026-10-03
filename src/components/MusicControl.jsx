import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from '../lib/gsap.js'

export default function MusicControl() {
  const audioRef = useRef(null)
  const wrapRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from(wrapRef.current, {
          y: 60,
          opacity: 0,
          duration: 0.9,
          delay: 1.2,
          ease: 'back.out(1.6)',
        })
      })
    })

    return () => {
      mm.revert()
      ctx.revert()
      gsap.set(wrapRef.current, { clearProps: 'all' })
    }
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const el = wrapRef.current
    if (!el) return

    const tween = isPlaying
      ? gsap.to(el, { scale: 1, duration: 0.4, overwrite: 'auto' })
      : gsap.to(el, {
          scale: 1.04,
          duration: 0.95,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.4,
          overwrite: 'auto',
        })

    return () => tween.kill()
  }, [isPlaying])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    audio.addEventListener('play', handlePlay)
    audio.addEventListener('pause', handlePause)

    return () => {
      audio.removeEventListener('play', handlePlay)
      audio.removeEventListener('pause', handlePause)
    }
  }, [])

  const toggleMusic = () => {
    const audio = audioRef.current
    if (!audio) return

    if (audio.paused) {
      audio.play().catch(() => setIsPlaying(false))
    } else {
      audio.pause()
    }
  }

  return (
    <>
      <div ref={wrapRef} className="fixed right-5 bottom-5 z-[1000] wide:right-8 wide:bottom-8">
        <button
          id="toggleMusic"
          type="button"
          onClick={toggleMusic}
          className="cursor-pointer rounded-full bg-linear-to-br from-primary to-sec px-5 py-3 font-['Segoe_UI',sans-serif] text-base text-white shadow-lg transition-[scale,background-image] duration-300 hover:scale-110 hover:bg-[linear-gradient(15deg,var(--color-primary),var(--color-sec))] wide:px-[26px] wide:py-[14px] wide:text-[18px]"
        >
          <span className={isPlaying ? 'inline-block animate-spin-slow' : 'inline-block'}>
            &#9835;
          </span>
          {' > '}
          {isPlaying ? 'pause' : 'play'}
        </button>
      </div>
      <audio ref={audioRef} loop src="/Nothing.mp3" />
    </>
  )
}
