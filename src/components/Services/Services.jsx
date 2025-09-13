import React from 'react'
import "./Services.css"
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
  return (
    <div id='blog' className='services'>
      <div className='services-title'>
        <h1>My Blog Posts</h1>
        {/* <img src={theme_pattern} alt="" /> */}
      </div>

      <div className='services-container'>
        {Blog_Data.map((post, index) => {
          return (
            <a 
              href={post.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              key={index} 
              className='services-format blog-post'
            >
              <h3>{post.id}</h3>
              <h2>{post.title}</h2>
              <p className="post-date">{post.date}</p>
              <p>{post.excerpt}</p>
              <div className='services-readmore'>
                <p>Read on Medium</p>
                {/* <img src={arrow_icon} alt="" /> */}
              </div>
            </a>
          )
        })}
      </div>
    </div>
  )
}

export default BlogPosts