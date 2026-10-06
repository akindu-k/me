import { useLayoutEffect, useState } from 'react'
import { fetchCommits } from './githubData'

export { parseCommitMessage, focusAreasFrom } from './githubData'

const CACHE_TTL = 24 * 60 * 60 * 1000 // refresh at most once a day per visitor

// Returns { data, fresh } for the last saved result, or null if there is none.
const readCache = (key) => {
  try {
    const cached = JSON.parse(localStorage.getItem(key))
    if (cached && cached.data) {
      return { data: cached.data, fresh: Date.now() - cached.savedAt < CACHE_TTL }
    }
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

// Latest commits by `author` on `repo` and their total count. Starts from
// `initial` (the build-time snapshot) so the prerendered HTML already shows
// real data and hydrates cleanly; then applies this visitor's saved result in
// a layout effect, and refreshes from the API at most once a day.
export const useGithubCommits = (repo, author, count = 8, initial = null) => {
  const key = `gh-commits:${repo}:${author}:${count}`
  const [state, setState] = useState(() =>
    initial ? { status: 'ready', ...initial } : { status: 'loading' }
  )

  useLayoutEffect(() => {
    const cached = readCache(key)
    // Use whichever is newer: this visitor's saved result or the snapshot.
    if (cached && (!initial || cached.data.fetchedAt > initial.fetchedAt)) {
      setState({ status: 'ready', ...cached.data })
    }
    // Data under a day old (saved, or from a recent build) needs no request.
    const snapshotFresh = initial && Date.now() - Date.parse(initial.fetchedAt) < CACHE_TTL
    if (cached?.fresh || (!cached && snapshotFresh)) return
    let cancelled = false

    fetchCommits(repo, author, count)
      .then((data) => {
        writeCache(key, data)
        if (!cancelled) setState({ status: 'ready', ...data })
      })
      .catch((error) => {
        // Keep showing the saved result or the snapshot if there is one.
        if (!cancelled && !cached && !initial) setState({ status: 'error', error })
      })

    return () => { cancelled = true }
  }, [key, repo, author, count, initial])

  return state
}
