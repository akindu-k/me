// Eased page scrolling. Native `behavior: 'smooth'` covers long distances in
// roughly the same short time, so jumps across the page feel abrupt; this
// scales the duration with distance and eases in and out.

const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

let frame = 0
let cancel = null

export const smoothScrollTo = (targetY) => {
  const startY = window.scrollY
  const maxY = document.documentElement.scrollHeight - window.innerHeight
  const endY = Math.max(0, Math.min(targetY, maxY))
  const distance = endY - startY

  cancel?.()
  if (Math.abs(distance) < 2) return

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    window.scrollTo({ top: endY, behavior: 'instant' })
    return
  }

  const duration = Math.min(1200, Math.max(500, 350 + Math.abs(distance) * 0.18))
  const start = performance.now()

  // Let the user take over mid-animation.
  const stop = () => cancel?.()
  cancel = () => {
    cancelAnimationFrame(frame)
    window.removeEventListener('wheel', stop)
    window.removeEventListener('touchstart', stop)
    window.removeEventListener('keydown', stop)
    cancel = null
  }
  window.addEventListener('wheel', stop, { passive: true })
  window.addEventListener('touchstart', stop, { passive: true })
  window.addEventListener('keydown', stop)

  const step = (now) => {
    const t = Math.min(1, (now - start) / duration)
    window.scrollTo({ top: startY + distance * easeInOutCubic(t), behavior: 'instant' })
    if (t < 1) frame = requestAnimationFrame(step)
    else cancel?.()
  }
  frame = requestAnimationFrame(step)
}

// Scroll so the element with `id` sits just below the fixed nav bar.
export const scrollToId = (id, offset = 48) => {
  const el = document.getElementById(id)
  if (!el) return
  const top = id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - offset
  smoothScrollTo(top)
}
