import { useLayoutEffect, useRef } from 'react'
import { gsap, SplitText } from '../lib/gsap.js'

export default function Closing() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const text = root.current.querySelector('.c-text')
        const words = new SplitText(text, { type: 'words' })

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: root.current, start: 'top 70%', once: true },
        })

        tl.from('.c-card', { y: 150, opacity: 0, duration: 1 })
          .from(
            '.c-face',
            { scale: 0, rotate: -30, duration: 1, ease: 'elastic.out(1, 0.5)' },
            '-=0.45',
          )
          .from(
            words.words,
            { y: 26, opacity: 0, duration: 0.55, stagger: 0.03, ease: 'power2.out' },
            '-=0.55',
          )
          .from('.c-copy', { y: 14, opacity: 0, duration: 0.6 }, '-=0.35')
      })
    }, root)

    return () => {
      mm.revert()
      ctx.revert()
      gsap.set(root.current.querySelectorAll('*'), { clearProps: 'all' })
    }
  }, [])

  return (
    <div ref={root} className="w-full bg-last pt-80 wide:px-8 wide:pt-40">
      <div className="c-card mx-auto w-4/5 min-h-[13rem] rounded-t-[75%] bg-primary px-[1.2rem] pt-8 pb-3 text-center wide:w-[min(900px,80%)] wide:min-h-auto wide:px-16 wide:pt-16 wide:pb-10 wide:rounded-t-[60%]">
        <h1 className="c-face wide:text-[4rem]">&gt;_&lt;</h1>
        <h3 className="c-text wide:mx-auto wide:mt-4 wide:max-w-[640px] wide:text-[1.5rem] wide:leading-[1.9]">
          Thank you for being the most wonderful part of my life. Happy birthday
        </h3>
        <p className="c-copy mt-[15px] mb-2 font-sans text-[10px] tracking-[2px] underline wide:mt-10 wide:text-xs">
          copyright by ur man
        </p>
      </div>
    </div>
  )
}
