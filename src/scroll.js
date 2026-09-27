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

const targetTop = (id, offset) => {
  const el = document.getElementById(id)
  if (!el) return null
  return id === 'home' ? 0 : el.getBoundingClientRect().top + window.scrollY - offset
}

// Scroll so the element with `id` sits just below the fixed nav bar.
export const scrollToId = (id, offset = 48, { instant = false } = {}) => {
  const top = targetTop(id, offset)
  if (top === null) return
  if (instant) window.scrollTo({ top, behavior: 'instant' })
  else smoothScrollTo(top)
}

// Record the section in the URL so it can be shared, bookmarked and reached
// with back/forward. Home clears the fragment.
export const pushSectionUrl = (id) => {
  const url = id === 'home'
    ? window.location.pathname + window.location.search
    : `#${id}`
  const current = window.location.hash.slice(1) || 'home'
  if (current !== id) window.history.pushState(null, '', url)
}

// Back/forward between sections, and arriving on a #section link. Returns a cleanup function.
export const syncScrollWithUrl = () => {
  const sectionFromUrl = () => decodeURIComponent(window.location.hash.slice(1)) || 'home'

  // Sections render after load, so the browser's own jump to the fragment
  // can miss; place the page once they exist.
  if (window.location.hash) {
    requestAnimationFrame(() => scrollToId(sectionFromUrl(), 48, { instant: true }))
  }

  const onPopState = () => scrollToId(sectionFromUrl())
  window.addEventListener('popstate', onPopState)
  return () => window.removeEventListener('popstate', onPopState)
}
