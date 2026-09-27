import { useEffect, useRef } from 'react'

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Adds `is-visible` to every `.reveal` element inside the returned ref once it
// scrolls into view. Elements added later (tab switches, "show more") are
// picked up through a MutationObserver.
export const useReveal = () => {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    if (reducedMotion() || !('IntersectionObserver' in window)) {
      root.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            io.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )

    const observeAll = () =>
      root.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => io.observe(el))

    observeAll()
    const mo = new MutationObserver(observeAll)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])

  return ref
}

// Translates the element vertically relative to its distance from the
// viewport centre. `speed` is the fraction of that distance applied.
export const useParallax = (speed = 0.15) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || reducedMotion()) return

    let frame = 0
    const update = () => {
      frame = 0
      const rect = el.parentElement.getBoundingClientRect()
      if (rect.bottom < 0 || rect.top > window.innerHeight) return
      const offset = rect.top + rect.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [speed])

  return ref
}
