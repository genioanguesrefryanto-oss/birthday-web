import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap.js'
import { scrollToTarget } from '../lib/lenis.js'

export default function Hero() {
  const root = useRef(null)

  useLayoutEffect(() => {
    const mm = gsap.matchMedia()
    const ctx = gsap.context(() => {
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

        tl.from('.hero-img', { scale: 1.3, duration: 1.8, ease: 'power2.out' }, 0)
          .from(
            '.hero-card',
            { y: 70, opacity: 0, scale: 0.92, duration: 1, ease: 'back.out(1.4)' },
            0.15,
          )
          .from('.hero-title', { y: 36, opacity: 0, duration: 0.7 }, 0.55)
          .from('.hero-sub', { y: 26, opacity: 0, duration: 0.6 }, 0.7)
          .from(
            '.hero-btn',
            { y: 22, opacity: 0, scale: 0.85, duration: 0.6, ease: 'back.out(2)' },
            0.85,
          )
          .to(
            '.hero-card',
            {
              scaleX: 1.05,
              scaleY: 0.95,
              duration: 0.13,
              yoyo: true,
              repeat: 1,
              ease: 'power1.inOut',
            },
            1.45,
          )
          .from('.hero-scroll', { y: -24, opacity: 0, duration: 0.6 }, 1.7)

        gsap.to('.hero-scroll', {
          y: -8,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 2.5,
        })

        gsap.to('.hero-parallax', {
          y: -90,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        })

        gsap.to('.hero-img', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: root.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
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
      className="relative flex h-[30rem] items-center justify-center overflow-hidden p-6 wide:h-screen wide:p-8"
    >
      <img
        src="/images/bunga.jpg"
        alt="Bunga mawar"
        className="hero-img absolute left-0 -top-[15%] h-[130%] w-full object-cover"
      />
      <div className="hero-parallax relative z-[1] m-auto w-[min(30rem,100%)] wide:w-[min(760px,70vw)]">
        <div className="hero-card flex flex-col rounded-2xl border border-[rgba(255,255,255,0.46)] bg-[rgba(122,62,52,0.35)] px-5 py-6 text-center shadow-[0_4px_30px_rgba(104,3,3,0.8)] backdrop-blur-[4.1px] text-shadow-[10px_3px_10px_#7f1f0e] wide:rounded-3xl wide:px-8 wide:pt-10 wide:pb-8">
          <h1 className="hero-title mb-[9px] font-love text-[2.8rem] tracking-[3px] wide:mb-[14px] wide:text-[4.2rem] wide:tracking-[4px]">
            Happy Birthday
          </h1>
          <h2 className="hero-sub mb-[9px] font-ita wide:text-[2rem]">Genio Angues Refryanto</h2>
          <button
            type="button"
            onClick={() => scrollToTarget('#quotes')}
            className="hero-btn mx-auto w-1/2 cursor-pointer rounded-[10px] bg-sec py-[5px] text-last wide:mt-[14px] wide:w-[45%] wide:py-2.5 wide:text-[1.2rem] wide:tracking-[1px] wide:transition-[background-color,scale] wide:duration-300 wide:hover:scale-105 wide:hover:bg-fhrt"
          >
            Enjoy this website
          </button>
        </div>
      </div>
      <div className="hero-scroll absolute inset-x-0 bottom-4 flex justify-center wide:bottom-8">
        <button
          type="button"
          aria-label="Scroll ke pesan berikutnya"
          onClick={() => scrollToTarget('#quotes')}
          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-[rgba(255,255,255,0.46)] bg-[rgba(122,62,52,0.35)] text-xl text-last backdrop-blur-md transition-[background-color,scale] duration-300 hover:scale-110 hover:bg-fhrt"
        >
          &#9662;
        </button>
      </div>
    </div>
  )
}
