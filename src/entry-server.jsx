import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.jsx'

// Used at build time only (scripts/prerender.mjs) to put the page's content
// into index.html so crawlers and link previews see it without running JS.
export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
