import React from 'react'
import "./Footer.css"
import AnchorLink from 'react-anchor-link-smooth-scroll';

const columns = [
  {
    title: "Explore",
    links: [
      { label: "About Me", href: "#about" },
      { label: "Experience", href: "#experience" },
      { label: "Certifications", href: "#certifications" },
      { label: "Projects", href: "#work" },
      { label: "Open Source", href: "#opensource" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "GitHub", href: "https://github.com/akindu-k", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/akindu-kalhan/", external: true },
      { label: "Medium", href: "https://medium.com/@akinduk619", external: true },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "akinduk619@gmail.com", href: "mailto:akinduk619@gmail.com", external: true },
      { label: "+94-70-722-9859", href: "tel:+94707229859", external: true },
      { label: "Colombo, Sri Lanka" },
    ],
  },
]

const Footer = () => {
  return (
    <footer className='footer section--gray'>
        <div className="container footer-inner">
            <div className="footer-top">
                {columns.map((col) => (
                    <div className="footer-col" key={col.title}>
                        <h3>{col.title}</h3>
                        <ul>
                            {col.links.map((link) => (
                                <li key={link.label}>
                                    {!link.href ? (
                                        <span>{link.label}</span>
                                    ) : link.external ? (
                                        <a href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer">{link.label}</a>
                                    ) : (
                                        <AnchorLink offset={48} href={link.href}>{link.label}</AnchorLink>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <div className="footer-bottom">
                <p className="footer-bottom-left">© 2026 Akindu Kalhan. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
