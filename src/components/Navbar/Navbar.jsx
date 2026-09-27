import React, { useEffect, useState } from 'react'
import "./Navbar.css"
import AnchorLink from 'react-anchor-link-smooth-scroll';

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

  const select = (id) => {
    setMenu(id)
    setOpen(false)
  }

  return (
    <header className={`navbar ${dark && !open ? 'navbar--dark' : ''} ${open ? 'navbar--open' : ''}`}>
      <nav className="nav-inner">
        <AnchorLink className="nav-brand" offset={0} href="#home" onClick={() => select("home")}>Akindu Kalhan</AnchorLink>
        <ul className="nav-menu">
          {links.map(({ id, label }) => (
            <li key={id}>
              <AnchorLink className={`nav-link ${menu === id ? "active" : ""}`} offset={id === "home" ? 0 : 48} href={`#${id}`} onClick={() => select(id)}>{label}</AnchorLink>
            </li>
          ))}
        </ul>
        <AnchorLink className="btn btn--primary btn--small nav-connect" offset={48} href="#contact" onClick={() => select("contact")}>Connect With Me</AnchorLink>
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
              <AnchorLink className={menu === id ? "active" : ""} offset={id === "home" ? 0 : 48} href={`#${id}`} onClick={() => select(id)} tabIndex={open ? 0 : -1}>{label}</AnchorLink>
            </li>
          ))}
        </ul>
      </div>
    </header>
  )
}

export default Navbar
