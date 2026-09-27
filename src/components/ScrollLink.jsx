import React from 'react'
import { scrollToId } from '../scroll'

// In-page link that scrolls with the site's eased motion instead of jumping.
const ScrollLink = ({ to, offset, onClick, children, ...rest }) => (
  <a
    href={`#${to}`}
    onClick={(e) => {
      e.preventDefault()
      onClick?.(e)
      scrollToId(to, offset)
    }}
    {...rest}
  >
    {children}
  </a>
)

export default ScrollLink
