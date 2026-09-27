import React, { useEffect, useRef } from 'react'

const SPACING = 24        // dot grid pitch, px
const SPOT_RADIUS = 180   // cursor spotlight radius, px

// Faint dot grid; dots near the cursor brighten softly.
const HeroBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const grid = document.createElement('canvas')

    let w = 0
    let h = 0
    let dpr = 1
    let frame = 0
    const pointer = { x: 0, y: 0, inside: false }
    const smooth = { x: 0, y: 0, spot: 0 }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      w = rect.width
      h = rect.height
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)

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
    }

    const drawSpotlight = () => {
      const r = SPOT_RADIUS
      const x0 = Math.max(SPACING / 2, Math.floor((smooth.x - r) / SPACING) * SPACING + SPACING / 2)
      const y0 = Math.max(SPACING / 2, Math.floor((smooth.y - r) / SPACING) * SPACING + SPACING / 2)
      ctx.fillStyle = '#fff'
      for (let y = y0; y <= smooth.y + r && y < h; y += SPACING) {
        for (let x = x0; x <= smooth.x + r && x < w; x += SPACING) {
          const d = Math.hypot(x - smooth.x, y - smooth.y)
          if (d >= r) continue
          ctx.globalAlpha = (1 - d / r) ** 2 * smooth.spot * 0.4
          ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4)
        }
      }
      ctx.globalAlpha = 1
    }

    const render = () => {
      frame = 0
      smooth.x += (pointer.x - smooth.x) * 0.2
      smooth.y += (pointer.y - smooth.y) * 0.2
      smooth.spot += ((pointer.inside ? 1 : 0) - smooth.spot) * 0.08

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(grid, 0, 0)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (smooth.spot > 0.01) drawSpotlight()

      // Only keep animating while the highlight is visible or still settling.
      const settling = pointer.inside || smooth.spot > 0.01
      if (settling && !document.hidden) frame = requestAnimationFrame(render)
    }

    const start = () => {
      if (!frame) frame = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      if (inside && !pointer.inside && smooth.spot < 0.01) {
        smooth.x = x
        smooth.y = y
      }
      pointer.x = x
      pointer.y = y
      pointer.inside = inside && e.pointerType !== 'touch'
      if (pointer.inside || smooth.spot > 0.01) start()
    }

    const onLeave = () => {
      pointer.inside = false
      start()
    }

    const ro = new ResizeObserver(() => {
      resize()
      render()
    })

    ro.observe(host)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}

export default HeroBackground
