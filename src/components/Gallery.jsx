import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'

const photos = [
  { src: '/images/gallery-1.jpg', label: 'gorgeous' },
  { src: '/images/gallery-2.jpg', label: 'pretty' },
  { src: '/images/gallery-3.jpg', label: 'goddess' },
  { src: '/images/gallery-4.jpg', label: 'enchantress' },
  { src: '/images/gallery-5.jpg', label: 'treasure' },
]

export default function Gallery() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const head = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top 75%', once: true },
        })

        head
          .from('.g-label', { y: 26, opacity: 0, duration: 0.7 })
          .from(
            '.g-title',
            { y: 44, opacity: 0, scale: 0.9, duration: 0.75, ease: 'back.out(1.6)' },
            '-=0.4',
          )

        gsap.utils.toArray('img', root.current).forEach((img, i) => {
          const btn = img.nextElementSibling

          const item = gsap.timeline({
            scrollTrigger: { trigger: img, start: 'top 88%', once: true },
          })

          item.from(img, {
            y: 80,
            opacity: 0,
            scale: 0.86,
            rotation: i % 2 === 0 ? -3 : 3,
            duration: 0.85,
            ease: 'power3.out',
          })

          if (btn) {
            item.from(
              btn,
              { y: 26, opacity: 0, scale: 0.5, duration: 0.55, ease: 'back.out(2.4)' },
              '-=0.4',
            )
          }

          gsap.fromTo(
            img,
            { yPercent: 4 },
            {
              yPercent: -4,
              ease: 'none',
              scrollTrigger: {
                trigger: img,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          )
        })
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
      ref={root}
      className="w-full min-h-[175rem] bg-primary text-center wide:min-h-auto wide:px-8 wide:pt-28 wide:pb-36"
    >
      <p className="g-label italic tracking-[3px] wide:text-[1.5rem]">
        a piece of heaven
      </p>
      <h1 className="g-title wide:my-4 wide:mb-12 wide:text-[3.4rem]">Your Gallery</h1>
      <div className="wide:mx-auto wide:grid wide:max-w-[1200px] wide:grid-cols-3 wide:items-center wide:gap-x-12 wide:gap-y-14 ultra:grid-cols-5 ultra:gap-x-8 ultra:gap-y-10">
        {photos.map((photo) => (
          <div key={photo.src} className="contents">
            <img
              src={photo.src}
              alt={photo.label}
              className="mx-auto my-[50px] block h-80 w-80 rounded-[70px_0_70px] border-[3px] border-thrd object-cover wide:m-0 wide:h-80 wide:w-full wide:rounded-[90px_0_90px] wide:border-4 wide:shadow-[0_10px_30px_rgba(0,0,0,0.35)] wide:transition-[scale,border-color] wide:duration-[400ms] wide:hover:scale-[1.04] wide:hover:border-sec ultra:h-[18rem]"
            />
            <button
              type="button"
              className="h-[2.3rem] w-40 cursor-pointer rounded-lg bg-thrd text-center font-ita text-[1.5rem] tracking-[2px] text-[#fff3e6] shadow-[1px_1px_10px_#dac1b1] wide:h-auto wide:w-auto wide:justify-self-center wide:px-6 wide:py-2 wide:text-[1.4rem] wide:transition-[translate,background-color] wide:duration-300 wide:hover:-translate-y-1 wide:hover:bg-fhrt"
            >
              {photo.label}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
