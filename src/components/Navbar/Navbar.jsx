import React, { useRef, useState } from 'react'
import "./Navbar.css"
import AnchorLink from 'react-anchor-link-smooth-scroll';
import menu_open from "../../assets/menu_open.svg"
import menu_close from "../../assets/menu_close.svg"
// import logo from "../../assets/logo.svg"

const Navbar = () => {

  const [menu,setMenu] = useState(false);
  const menuRef = useRef();

  const openMenu = () => {
    menuRef.current.style.right = "0";
  }

  const closeMenu = () => {
    menuRef.current.style.right = "-350px";
  }
  return (
    <div className='navbar'>
      {/* <img src={logo} alt='' /> */}
      <img src={menu_open} onClick={openMenu} alt="" className='nav-mob-open' />
      <ul ref={menuRef} className="nav-menu">
        <img src={menu_close} onClick={closeMenu} alt="" className="nav-mob-close" />
        <li onClick={() => setMenu("home")}><AnchorLink className='anchor-link' offset={50} href='#home'><p className={menu === "home" ? "active" : ""}>Home</p></AnchorLink></li>
        <li onClick={() => setMenu("about")}><AnchorLink className='anchor-link' offset={50} href='#about'><p className={menu === "about" ? "active" : ""}>About Me</p></AnchorLink></li>
        <li onClick={() => setMenu("services")}><AnchorLink className='anchor-link' offset={50} href='#services'><p className={menu === "services" ? "active" : ""}>Services</p></AnchorLink></li>
        <li onClick={() => setMenu("work")}><AnchorLink className='anchor-link' offset={50} href='#work'><p className={menu === "work" ? "active" : ""}>Portfolio</p></AnchorLink></li>
        <li onClick={() => setMenu("contact")}><AnchorLink className='anchor-link' offset={50} href='#contact'><p className={menu === "contact" ? "active" : ""}>Contact</p></AnchorLink></li>
      </ul>
      <div className="nav-connect"><AnchorLink className='anchor-link' offset={50} href='#contact'><p className={menu === "contact" ? "active" : ""}>Connect With Me</p></AnchorLink></div>
    </div>
  )
}

export default Navbar