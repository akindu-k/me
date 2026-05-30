import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Experience from './components/Experience/Experience'
import MyWork from './components/MyWork/MyWork'
import OpenSource from './components/OpenSource/OpenSource'
import BlogPosts from './components/Services/Services' // Updated name but same import path
import Contact from './components/Contact/Contact'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'


const App = () => {
  return (
    <div>
      <Navbar/>
      <Hero/>
      <About/>
      <Experience/>
      <MyWork/>
      <OpenSource/>
      <BlogPosts/>
      <Contact/>
      <Footer/>
      <ScrollToTop />
    </div>
  )
}

export default App