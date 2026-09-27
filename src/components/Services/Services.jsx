import React from 'react'
import "./Services.css"
import { RiMediumLine } from 'react-icons/ri'
import { useReveal } from '../../motion'
// import theme_pattern from "../../assets/theme_pattern.svg"
// import arrow_icon from "../../assets/arrow_icon.svg"


const Blog_Data = [
  {
    id: "01",
    title: "Vision Transformers - From Pixels to Patches to Predictions ",
    excerpt: "Vision Transformers split images into patches and process them like word tokens, using self-attention to capture global context beyond CNNs.",
    date: "Sept 13, 2025",
    url: "https://medium.com/@akinduk619/vision-transformers-from-pixels-to-patches-to-predictions-with-9f8b264536e7"
  },
  {
    id: "02",
    title: "Interactive Hand Detection Using OpenCV and MediaPipe",
    excerpt: "Real-time hand detection with OpenCV and MediaPipe, tracking 21 landmarks for gesture-based applications.",
    date: "Dec 07, 2024",
    url: "https://medium.com/@akinduk619/interactive-hand-detection-using-opencv-and-mediapipe-db0702dc0931"
  }
]

const BlogPosts = () => {
  const ref = useReveal()

  return (
    <section id='blog' className='services section section--gray' ref={ref}>
      <div className='container section-header'>
        <h1 className="headline reveal">My Blog Posts</h1>
      </div>

      <div className='container services-container'>
        {Blog_Data.map((post, index) => {
          return (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className={`services-format blog-post card card--hover reveal ${index === 0 ? 'blog-post--feature' : ''}`}
              style={{ '--reveal-delay': `${index * 0.1}s` }}
            >
              <div className="blog-top">
                <h3>{post.id}</h3>
                <RiMediumLine className="blog-icon" aria-hidden="true" />
              </div>
              <h2>{post.title.trim()}</h2>
              <p className="post-date">{post.date}</p>
              <p className="post-excerpt">{post.excerpt}</p>
              <div className='services-readmore'>
                <span className="link-chevron">Read on Medium</span>
              </div>
            </a>
          )
        })}
      </div>
    </section>
  )
}

export default BlogPosts
