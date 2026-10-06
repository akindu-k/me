// Saves the latest jaseci-labs/jac commits by akindu-k to
// src/generated/github-snapshot.json, which the Open Source section starts
// from. Runs before every build and dev start. Never fails the build: if
// GitHub can't be reached, the previous snapshot is kept.
// Set GITHUB_TOKEN to avoid the 60 requests/hour anonymous limit.
import { readFile, writeFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { fetchCommits } from '../src/githubData.js'

const REPO = 'jaseci-labs/jac'
const AUTHOR = 'akindu-k'
const COUNT = 8
const out = fileURLToPath(new URL('../src/generated/github-snapshot.json', import.meta.url))

// Used only when there is no network and no previous snapshot.
const SEED = {
  total: 8,
  fetchedAt: '2026-05-27T00:00:00.000Z',
  commits: [
    { sha: '6ea93a9', date: '2026-05-27', message: 'invalidate Redis L2 cache on cascade quarantine', tags: ['Redis', 'Caching'], scope: null },
    { sha: '1db5e9e', date: '2026-05-26', message: 'recover non-Optional fields stored as None instead of quarantining', tags: ['Data Recovery'], scope: null },
    { sha: '33d819c', date: '2026-05-26', message: '`recover_all` processes edges before nodes; silent re-link warning', tags: ['Graph', 'Recovery'], scope: null },
    { sha: 'dc58f77', date: '2026-05-25', message: 'strip empty dicts in `_put_node_atomic` to avoid MongoDB error', tags: ['MongoDB', 'Bug Fix'], scope: null },
    { sha: '93567b9', date: '2026-05-19', message: '`_put_node_atomic` clobbers scalars via shallow `$mergeObjects`', tags: ['MongoDB', 'Bug Fix'], scope: null },
    { sha: 'a9b891d', date: '2026-05-18', message: 'cascade-quarantine edges when their node is quarantined', tags: ['Data Integrity'], scope: null },
    { sha: 'fa49693', date: '2026-05-17', message: 'add httpx to jac.toml dependencies', tags: ['Dependencies'], scope: null },
    { sha: '9fc5e99', date: '2026-05-17', message: 'replace sync LLM clients with async equivalents', tags: ['Async', 'LLM'], scope: null },
  ],
}

const headers = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}

await mkdir(new URL('../src/generated/', import.meta.url), { recursive: true })
try {
  const data = await fetchCommits(REPO, AUTHOR, COUNT, headers)
  await writeFile(out, JSON.stringify(data, null, 2) + '\n')
  console.log(`github snapshot: ${data.total} commits, latest ${data.commits[0]?.sha}`)
} catch (error) {
  try {
    const previous = JSON.parse(await readFile(out, 'utf8'))
    console.warn(`github snapshot: ${error.message}; keeping snapshot from ${previous.fetchedAt}`)
  } catch {
    await writeFile(out, JSON.stringify(SEED, null, 2) + '\n')
    console.warn(`github snapshot: ${error.message}; no previous snapshot, wrote the built-in list`)
  }
}
