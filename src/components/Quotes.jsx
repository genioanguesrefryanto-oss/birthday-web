import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap.js'

export default function Quotes() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const title = root.current.querySelector('.q-title')
        const text = root.current.querySelector('.q-text')
        const chars = new SplitText(title, { type: 'chars' })
        const words = new SplitText(text, { type: 'words' })

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root.current, start: 'top 72%', once: true },
        })

        tl.from('.q-label', { y: 30, opacity: 0, duration: 0.7 })
          .from(
            chars.chars,
            {
              yPercent: 120,
              opacity: 0,
              rotate: 8,
              duration: 0.7,
              stagger: 0.04,
              ease: 'back.out(1.8)',
            },
            '-=0.35',
          )
          .from(
            words.words,
            {
              y: 22,
              opacity: 0,
              skewY: 3,
              duration: 0.5,
              stagger: 0.015,
              ease: 'power2.out',
            },
            '-=0.3',
          )
      })
    }, root)

    return () => {
      mm.revert()
      ctx.revert()
      gsap.set(root.current.querySelectorAll('*'), { clearProps: 'all' })
    }
  }, [])

  return (
    <div
      id="quotes"
      ref={root}
      className="min-h-[50rem] bg-thrd pt-20 text-center tracking-[2px] text-white wide:relative wide:z-10 wide:min-h-auto wide:rounded-t-[48px] wide:px-8 wide:pt-36 wide:pb-32"
    >
      <p className="q-label italic tracking-[3px] wide:text-[1.6rem]">
        a simple quotes only for you
      </p>
      <h1 className="q-title pt-10 pb-2.5 wide:py-6 wide:font-ita wide:text-[4rem]">
        Dear lin
      </h1>
      <h3 className="q-text mx-auto w-[93%] wide:w-[min(880px,85%)] wide:text-[1.45rem] wide:leading-[2] wide:tracking-[1px]">
        Happy Birthday, my love. On this special day, I just want to remind you
        how much joy and light you bring into my life. You are the reason behind
        my smile, the one who always makes things better, no matter how the day
        has been. Thank you for being you &mdash; small in size, but huge in my
        heart.
      </h3>
    </div>
  )
}
