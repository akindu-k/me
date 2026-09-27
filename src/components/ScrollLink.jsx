import React from 'react'
import { pushSectionUrl, scrollToId } from '../scroll'

// In-page link that scrolls with the site's eased motion instead of jumping,
// and records the section in the URL. Modified clicks (new tab/window) are
// left to the browser.
const ScrollLink = ({ to, offset, onClick, children, ...rest }) => (
  <a
    href={`#${to}`}
    onClick={(e) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
      e.preventDefault()
      onClick?.(e)
      pushSectionUrl(to)
      scrollToId(to, offset)
    }}
    {...rest}
  >
    {children}
  </a>
)

export default ScrollLink
