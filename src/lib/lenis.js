import Lenis from 'lenis'

let lenis = null
let prefersReducedMotion = false

export function initLenis() {
  prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  lenis = new Lenis({
    lerp: prefersReducedMotion ? 1 : 0.1,
    smoothWheel: !prefersReducedMotion,
    touchMultiplier: 1.5,
  })

  return lenis
}

export function getLenis() {
  return lenis
}

export function destroyLenis() {
  lenis?.destroy()
  lenis = null
}

export function scrollToTarget(target) {
  const el = typeof target === 'string' ? document.querySelector(target) : target
  if (!el) return

  if (lenis) {
    lenis.scrollTo(el, prefersReducedMotion ? { immediate: true } : { duration: 1.4 })
  } else {
    el.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' })
  }
}
