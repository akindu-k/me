import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import ScrollLink from '../ScrollLink';

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About Me" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "work", label: "Projects" },
  { id: "opensource", label: "Open Source" },
  { id: "blog", label: "Blog" },
  { id: "contact", label: "Contact" },
]

const Navbar = () => {

  const [menu, setMenu] = useState("home");
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(true);

  // Track which section sits under the nav bar to pick the active link and
  // whether the glass should be light or dark.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const probe = 60
      let current = links[0].id
      for (const { id } of links) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= probe) current = id
      }
      setMenu(current)
      // Sample just below the bar's bottom edge (48px), allowing for sub-pixel layout.
      const under = [...document.querySelectorAll('section, footer')].find((el) => {
        const rect = el.getBoundingClientRect()
        return rect.top <= 50 && rect.bottom > 50
      })
      setDark(Boolean(under && under.classList.contains('section--dark')))
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  // The mobile panel and its toggle are hidden above 1000px (see Navbar.css),
  // so close the menu when crossing into that width or the page stays scroll-locked.
  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1001px)')
    const onChange = (e) => { if (e.matches) setOpen(false) }
    desktop.addEventListener('change', onChange)
    return () => desktop.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const select = (id) => {
    setMenu(id)
    setOpen(false)
    // Release the scroll lock now rather than after the re-render, so the
    // eased scroll that follows this click can move the page.
    document.body.style.overflow = ''
  }

  return (
    <header className={`navbar ${dark && !open ? 'navbar--dark' : ''} ${open ? 'navbar--open' : ''}`}>
      <nav className="nav-inner">
        <ScrollLink className="nav-brand" to="home" onClick={() => select("home")}>Akindu Kalhan</ScrollLink>
        <ul className="nav-menu">
          {links.map(({ id, label }) => (
            <li key={id}>
              <ScrollLink className={`nav-link ${menu === id ? "active" : ""}`} to={id} onClick={() => select(id)}>{label}</ScrollLink>
            </li>
          ))}
        </ul>
        <ScrollLink className="btn btn--primary btn--small nav-connect" to="contact" onClick={() => select("contact")}>Connect With Me</ScrollLink>
        <button
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          <span /><span />
        </button>
      </nav>
      <div className="nav-mobile" aria-hidden={!open}>
        <ul>
          {links.map(({ id, label }, i) => (
            <li key={id} style={{ '--i': i }}>
              <ScrollLink className={menu === id ? "active" : ""} to={id} onClick={() => select(id)} tabIndex={open ? 0 : -1}>{label}</ScrollLink>
            </li>
          ))}
        </ul>
        <div className="nav-mobile-footer" style={{ '--i': links.length }}>
          <ScrollLink className="btn btn--primary" to="contact" onClick={() => select("contact")} tabIndex={open ? 0 : -1}>Connect With Me</ScrollLink>
          <a className="nav-mobile-mail" href="mailto:akinduk619@gmail.com" tabIndex={open ? 0 : -1}>akinduk619@gmail.com</a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
