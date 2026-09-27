// Renders the app to HTML and injects it into the built index.html.
// Run after `vite build` and `vite build --ssr src/entry-server.jsx --outDir dist-ssr`.
import { readFile, writeFile, rm } from 'node:fs/promises'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = fileURLToPath(new URL('..', import.meta.url))
const indexPath = `${root}dist/index.html`
const { render } = await import(pathToFileURL(`${root}dist-ssr/entry-server.js`).href)

const template = await readFile(indexPath, 'utf8')
const placeholder = '<div id="root"></div>'
if (!template.includes(placeholder)) throw new Error(`${placeholder} not found in dist/index.html`)

const html = template.replace(placeholder, `<div id="root">${render()}</div>`)
await writeFile(indexPath, html)
await rm(`${root}dist-ssr`, { recursive: true, force: true })

console.log(`prerendered dist/index.html (${(html.length / 1024).toFixed(1)} kB)`)
