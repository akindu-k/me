import React, { useEffect, useRef } from 'react'

const SPACING = 24        // dot grid pitch, px
const SPOT_RADIUS = 180   // cursor spotlight radius, px
const GLOW_SCALE = 8      // aurora is rendered at 1/8 resolution and upscaled (cheap blur)
const EASE = 0.025        // how quickly the glow follows the pointer (lower = calmer)

// Faint dot grid over a soft blue-violet horizon glow. The glow drifts slowly
// toward the pointer and swells slightly while the pointer is over the hero.
const HeroBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const glow = document.createElement('canvas')
    const gctx = glow.getContext('2d')
    const grid = document.createElement('canvas')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let w = 0
    let h = 0
    let dpr = 1
    let frame = 0
    let visible = true
    let lastMove = -Infinity
    const pointer = { x: 0, y: 0, inside: false }
    const smooth = { x: 0, sx: 0, sy: 0, spot: 0, presence: 0 }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      glow.width = Math.ceil(w / GLOW_SCALE)
      glow.height = Math.ceil(h / GLOW_SCALE)

      // Pre-render the resting dot grid once.
      grid.width = canvas.width
      grid.height = canvas.height
      const g = grid.getContext('2d')
      g.scale(dpr, dpr)
      g.fillStyle = 'rgba(255, 255, 255, 0.13)'
      for (let y = SPACING / 2; y < h; y += SPACING) {
        for (let x = SPACING / 2; x < w; x += SPACING) {
          g.fillRect(x - 0.6, y - 0.6, 1.2, 1.2)
        }
      }

      if (!smooth.x) {
        smooth.x = smooth.sx = pointer.x = w / 2
        smooth.sy = pointer.y = h * 0.7
      }
    }

    const drawAurora = (t) => {
      const gw = glow.width
      const gh = glow.height
      const cx = smooth.x / GLOW_SCALE
      const base = gh * (0.86 - smooth.presence * 0.05)
      const spread = gw * 0.34

      gctx.clearRect(0, 0, gw, gh)
      gctx.beginPath()
      gctx.moveTo(0, gh)
      for (let x = 0; x <= gw; x += 1) {
        const nx = x / gw
        // Gentle bowl: edges sit a little higher than the centre, like a horizon.
        const bowl = -((nx - 0.5) ** 2) * gh * 0.28
        const lift = Math.exp(-((x - cx) ** 2) / (2 * spread * spread)) * gh * (0.04 + smooth.presence * 0.07)
        const wave = Math.sin(nx * 3.2 + t * 0.00018) * gh * 0.02
        gctx.lineTo(x, base + bowl + wave - lift)
      }
      gctx.lineTo(gw, gh)
      gctx.closePath()

      const top = base - gh * 0.42
      const fill = gctx.createLinearGradient(0, top, 0, gh)
      fill.addColorStop(0, 'rgba(140, 100, 255, 0)')
      fill.addColorStop(0.38, 'rgba(140, 100, 255, 0.46)')
      fill.addColorStop(0.72, 'rgba(90, 110, 255, 0.36)')
      fill.addColorStop(1, 'rgba(30, 60, 170, 0.26)')
      gctx.filter = 'blur(8px)'
      gctx.fillStyle = fill
      gctx.fill()
      gctx.filter = 'none'

      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctx.drawImage(glow, 0, 0, w, h)
    }

    const drawSpotlight = () => {
      if (smooth.spot < 0.01) return
      const r = SPOT_RADIUS
      const x0 = Math.max(SPACING / 2, Math.floor((smooth.sx - r) / SPACING) * SPACING + SPACING / 2)
      const y0 = Math.max(SPACING / 2, Math.floor((smooth.sy - r) / SPACING) * SPACING + SPACING / 2)
      ctx.fillStyle = '#fff'
      for (let y = y0; y <= smooth.sy + r && y < h; y += SPACING) {
        for (let x = x0; x <= smooth.sx + r && x < w; x += SPACING) {
          const d = Math.hypot(x - smooth.sx, y - smooth.sy)
          if (d >= r) continue
          ctx.globalAlpha = (1 - d / r) ** 2 * smooth.spot * 0.4
          ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4)
        }
      }
      ctx.globalAlpha = 1
    }

    const render = (t) => {
      frame = 0

      // With no recent input, drift the focus point slowly so the scene stays alive.
      if (t - lastMove > 3000) {
        pointer.x = w * (0.5 + Math.sin(t * 0.0001) * 0.25)
        pointer.y = h * 0.7
      }
      smooth.x += (pointer.x - smooth.x) * EASE
      smooth.sx += (pointer.x - smooth.sx) * 0.2
      smooth.sy += (pointer.y - smooth.sy) * 0.2
      smooth.spot += ((pointer.inside ? 1 : 0) - smooth.spot) * 0.05
      smooth.presence += ((pointer.inside ? 1 : 0) - smooth.presence) * 0.02

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(grid, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      drawAurora(t)
      drawSpotlight()

      if (!reduced && visible && !document.hidden) frame = requestAnimationFrame(render)
    }

    const start = () => {
      if (!frame && !reduced) frame = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      pointer.x = x
      pointer.y = y
      pointer.inside = inside && e.pointerType !== 'touch'
      lastMove = performance.now()
      start()
    }

    const onLeave = () => { pointer.inside = false }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) render(0)
    })
    const onVisibility = () => { if (!document.hidden) start() }

    resize()
    render(0)
    io.observe(canvas)
    ro.observe(host)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}

export default HeroBackground
