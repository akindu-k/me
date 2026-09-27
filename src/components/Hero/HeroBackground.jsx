import React, { useEffect, useRef } from 'react'

// Full-screen fragment shader:
//  - a dot grid (plus a faint coarse grid) whose space is pinched toward the
//    pointer, like a gravity well bending space-time;
//  - a slow, domain-warped violet/blue liquid at the bottom whose surface
//    rises toward the pointer and ripples when the pointer moves quickly.
const FRAGMENT = `
precision highp float;

uniform vec2 uRes;       // canvas size, device px
uniform float uTime;     // seconds
uniform vec2 uMouse;     // smoothed pointer, device px, top-left origin
uniform float uPresence; // 0..1, pointer over the hero
uniform float uEnergy;   // 0..1, recent pointer speed
uniform float uDpr;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.02 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 px = vec2(gl_FragCoord.x, uRes.y - gl_FragCoord.y);
  vec2 m = uMouse;
  float t = uTime;

  // --- Space-time well -------------------------------------------------
  vec2 d = px - m;
  float r = 300.0 * uDpr;
  float well = uPresence * exp(-dot(d, d) / (r * r));
  vec2 q = px + d * well * 0.55;          // sample farther out => space pinched toward m

  float s = 24.0 * uDpr;
  vec2 g = fract(q / s) - 0.5;
  float dots = smoothstep(1.15 * uDpr, 0.35 * uDpr, length(g) * s);

  float S = s * 4.0;                       // faint coarse grid that shows the curvature
  vec2 gl = abs(fract(q / S) - 0.5) * S;
  float lines = 1.0 - smoothstep(0.0, 0.9 * uDpr, min(gl.x, gl.y));

  // --- Liquid -----------------------------------------------------------
  float nx = px.x / uRes.x;
  float y = px.y / uRes.y;
  float mx = m.x / uRes.x;
  float slow = t * 0.05;

  float surface = 0.87 - 0.5 * (nx - 0.5) * (nx - 0.5);                 // shallow bowl, edges higher
  surface += (fbm(vec2(nx * 2.2 + slow, slow * 0.8)) - 0.5) * 0.07;      // gentle undulation
  float pull = exp(-pow((nx - mx) / 0.2, 2.0));
  surface -= pull * (0.03 + uPresence * 0.06);                           // rises toward the pointer
  surface += uEnergy * 0.012 * sin((nx - mx) * 38.0 - t * 4.0) * exp(-pow((nx - mx) / 0.3, 2.0));

  float edge = 0.012 + 0.004 * uDpr;
  float inside = smoothstep(surface - edge, surface + edge, y);

  vec2 uv = px / uRes.y * 1.5;
  vec2 w = vec2(fbm(uv + vec2(slow, 0.0)), fbm(uv + vec2(5.2, 1.3) - slow));
  float f = fbm(uv + 2.2 * w + vec2(slow * 0.6, -slow * 0.3));

  vec3 violet = vec3(0.50, 0.38, 1.00);
  vec3 blue = vec3(0.14, 0.44, 1.00);
  vec3 deep = vec3(0.03, 0.05, 0.22);
  vec3 liquid = mix(violet, blue, smoothstep(0.35, 0.75, f));
  float depth = clamp((y - surface) / max(1.0 - surface, 0.001), 0.0, 1.0);
  liquid = mix(liquid, deep, smoothstep(0.0, 1.0, depth) * 0.75);
  liquid += vec3(0.35, 0.30, 0.55) * pow(smoothstep(0.55, 0.85, f), 2.0) * 0.35;   // sheen

  float rim = exp(-pow((y - surface) / 0.016, 2.0));
  float halo = exp(-max(surface - y, 0.0) / 0.09) * (1.0 - inside);

  vec3 col = vec3(0.0);
  col += liquid * inside * 0.5;
  col += violet * halo * 0.18;
  col += vec3(0.75, 0.70, 1.0) * rim * 0.18;

  float dotAlpha = 0.12 + well * 0.22 + inside * 0.10;
  col += vec3(1.0) * dots * dotAlpha;
  col += vec3(1.0) * lines * (0.025 + well * 0.06);

  gl_FragColor = vec4(col, 1.0);
}
`

const VERTEX = `
attribute vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }
`

const compile = (gl, type, source) => {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(log)
  }
  return shader
}

const HeroBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const host = canvas.parentElement
    const gl = canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' })
    if (!gl) {
      host.classList.add('hero--no-webgl')
      return
    }

    let program
    try {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERTEX))
      gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program))
    } catch (error) {
      console.warn('Hero background disabled:', error)
      host.classList.add('hero--no-webgl')
      return
    }

    gl.useProgram(program)
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(program, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const u = {}
    ;['uRes', 'uTime', 'uMouse', 'uPresence', 'uEnergy', 'uDpr'].forEach((name) => {
      u[name] = gl.getUniformLocation(program, name)
    })

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let dpr = 1
    let frame = 0
    let visible = true
    let lastMove = -Infinity
    const pointer = { x: 0, y: 0, inside: false }
    const smooth = { x: 0, y: 0, presence: 0, energy: 0 }

    const resize = () => {
      const rect = host.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 1.5)
      canvas.width = Math.max(1, Math.round(rect.width * dpr))
      canvas.height = Math.max(1, Math.round(rect.height * dpr))
      gl.viewport(0, 0, canvas.width, canvas.height)
      if (!smooth.x) {
        smooth.x = pointer.x = rect.width / 2
        smooth.y = pointer.y = rect.height * 0.6
      }
    }

    const draw = (now) => {
      gl.uniform2f(u.uRes, canvas.width, canvas.height)
      gl.uniform1f(u.uTime, now / 1000)
      gl.uniform2f(u.uMouse, smooth.x * dpr, smooth.y * dpr)
      gl.uniform1f(u.uPresence, smooth.presence)
      gl.uniform1f(u.uEnergy, smooth.energy)
      gl.uniform1f(u.uDpr, dpr)
      gl.drawArrays(gl.TRIANGLES, 0, 3)
    }

    const render = (now) => {
      frame = 0
      // With no recent input, drift the focus point slowly so the liquid stays alive.
      if (now - lastMove > 3000) {
        pointer.x = (canvas.width / dpr) * (0.5 + Math.sin(now * 0.0001) * 0.25)
      }
      smooth.x += (pointer.x - smooth.x) * 0.06
      smooth.y += (pointer.y - smooth.y) * 0.06
      smooth.presence += ((pointer.inside ? 1 : 0) - smooth.presence) * 0.04
      smooth.energy *= 0.96
      draw(now)
      if (visible && !document.hidden) frame = requestAnimationFrame(render)
    }

    const start = () => {
      if (!frame && !reduced) frame = requestAnimationFrame(render)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height
      if (inside && pointer.inside) {
        const speed = Math.hypot(x - pointer.x, y - pointer.y)
        smooth.energy = Math.min(1, smooth.energy + speed * 0.004)
      }
      pointer.x = x
      pointer.y = y
      pointer.inside = inside
      lastMove = performance.now()
      start()
    }
    const onLeave = () => { pointer.inside = false }
    const onUp = (e) => { if (e.pointerType === 'touch') pointer.inside = false }

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    const ro = new ResizeObserver(() => {
      resize()
      if (reduced) draw(0)
    })
    const onVisibility = () => { if (!document.hidden) start() }

    resize()
    draw(0)
    start()
    io.observe(canvas)
    ro.observe(host)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      cancelAnimationFrame(frame)
      io.disconnect()
      ro.disconnect()
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('visibilitychange', onVisibility)
      gl.deleteBuffer(buffer)
      gl.deleteProgram(program)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas" aria-hidden="true" />
}

export default HeroBackground
