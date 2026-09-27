import { useEffect, useState } from 'react'

const API = 'https://api.github.com'
const CACHE_TTL = 60 * 60 * 1000 // 1 hour, keeps us well under the 60 req/hr anonymous limit

// Conventional-commit type → readable tag.
const TYPE_LABELS = {
  fix: 'Bug Fix',
  feat: 'Feature',
  perf: 'Performance',
  refactor: 'Refactor',
  test: 'Tests',
  docs: 'Docs',
  chore: 'Chore',
  ci: 'CI',
  build: 'Build',
}

// Scope → readable focus-area name. Unknown scopes are title-cased.
const SCOPE_LABELS = {
  scale: 'Jac Scale',
  runtime: 'Runtime',
  byllm: 'byLLM',
  config: 'Config',
  'mongo-backend': 'MongoDB Backend',
  redis: 'Redis',
}

const normalizeScope = (scope) => scope.toLowerCase().replace(/^jac-/, '')

const labelScope = (scope) =>
  SCOPE_LABELS[scope] ||
  scope.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())

// "fix(scale): seal the app (#9136) (#9228)" →
// { message: "seal the app", tags: ["Bug Fix", "Jac Scale"], scope: "scale" }
export const parseCommitMessage = (raw) => {
  const subject = raw.split('\n')[0].trim()
  const match = subject.match(/^(\w+)(?:\(([^)]+)\))?!?:\s*(.+)$/)
  const strip = (text) => text.replace(/(\s*\(#\d+[^)]*\))+\s*$/, '').trim()

  if (!match) return { message: strip(subject), tags: [], scope: null }

  const [, type, rawScope, rest] = match
  const scope = rawScope ? normalizeScope(rawScope) : null
  const tags = [TYPE_LABELS[type.toLowerCase()], scope && labelScope(scope)].filter(Boolean)
  return { message: strip(rest), tags, scope }
}

// Most frequent scopes across the given commits, as readable labels.
export const focusAreasFrom = (commits, limit = 3) => {
  const counts = new Map()
  commits.forEach(({ scope }) => {
    if (scope) counts.set(scope, (counts.get(scope) || 0) + 1)
  })
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([scope]) => labelScope(scope))
}

const readCache = (key) => {
  try {
    const cached = JSON.parse(localStorage.getItem(key))
    if (cached && Date.now() - cached.savedAt < CACHE_TTL) return cached.data
  } catch {
    // Storage unavailable or corrupt; fall through to a fresh fetch.
  }
  return null
}

const writeCache = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }))
  } catch {
    // Storage unavailable; the next visit simply refetches.
  }
}

const fetchJson = async (url) => {
  const res = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })
  if (!res.ok) throw new Error(`GitHub API ${res.status}`)
  return res
}

// Latest commits by `author` on `repo`, plus the author's total commit count
// (read from the pagination Link header of a one-per-page request).
export const useGithubCommits = (repo, author, count = 8) => {
  const key = `gh-commits:${repo}:${author}:${count}`
  const [state, setState] = useState(() => {
    const cached = readCache(key)
    return cached ? { status: 'ready', ...cached } : { status: 'loading' }
  })

  useEffect(() => {
    if (state.status === 'ready') return
    let cancelled = false

    const load = async () => {
      try {
        const base = `${API}/repos/${repo}/commits?author=${encodeURIComponent(author)}`
        const [listRes, countRes] = await Promise.all([
          fetchJson(`${base}&per_page=${count}`),
          fetchJson(`${base}&per_page=1`),
        ])
        const list = await listRes.json()
        const last = (countRes.headers.get('Link') || '').match(/[?&]page=(\d+)>; rel="last"/)
        const total = last ? Number(last[1]) : list.length

        const commits = list.map((c) => ({
          sha: c.sha.slice(0, 7),
          url: c.html_url,
          date: (c.commit.author?.date || c.commit.committer?.date || '').slice(0, 10),
          ...parseCommitMessage(c.commit.message),
        }))

        const data = { commits, total, fetchedAt: new Date().toISOString() }
        writeCache(key, data)
        if (!cancelled) setState({ status: 'ready', ...data })
      } catch (error) {
        if (!cancelled) setState({ status: 'error', error })
      }
    }

    load()
    return () => { cancelled = true }
  }, [key, repo, author, count, state.status])

  return state
}
