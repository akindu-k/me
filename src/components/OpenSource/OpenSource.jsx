import React, { useState } from 'react'
import './OpenSource.css'
import { FiGithub, FiGitCommit, FiArrowUpRight, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useReveal } from '../../motion'
import { useGithubCommits, focusAreasFrom } from '../../github'

const REPO = 'jaseci-labs/jac'
const AUTHOR = 'akindu-k'

// Shown if the GitHub API is unreachable (offline, rate-limited).
const jaseci_commits = [
    {
        sha: "6ea93a9",
        message: "invalidate Redis L2 cache on cascade quarantine",
        date: "2026-05-27",
        tags: ["Redis", "Caching"]
    },
    {
        sha: "1db5e9e",
        message: "recover non-Optional fields stored as None instead of quarantining",
        date: "2026-05-26",
        tags: ["Data Recovery"]
    },
    {
        sha: "33d819c",
        message: "`recover_all` processes edges before nodes; silent re-link warning",
        date: "2026-05-26",
        tags: ["Graph", "Recovery"]
    },
    {
        sha: "dc58f77",
        message: "strip empty dicts in `_put_node_atomic` to avoid MongoDB error",
        date: "2026-05-25",
        tags: ["MongoDB", "Bug Fix"]
    },
    {
        sha: "93567b9",
        message: "`_put_node_atomic` clobbers scalars via shallow `$mergeObjects`",
        date: "2026-05-19",
        tags: ["MongoDB", "Bug Fix"]
    },
    {
        sha: "a9b891d",
        message: "cascade-quarantine edges when their node is quarantined",
        date: "2026-05-18",
        tags: ["Data Integrity"]
    },
    {
        sha: "fa49693",
        message: "add httpx to jac.toml dependencies",
        date: "2026-05-17",
        tags: ["Dependencies"]
    },
    {
        sha: "9fc5e99",
        message: "replace sync LLM clients with async equivalents",
        date: "2026-05-17",
        tags: ["Async", "LLM"]
    }
]

const fallbackFocus = ["Database Robustness", "Redis Caching", "Async LLM"]

const formatUpdated = (iso) =>
    new Date(iso).toLocaleString(undefined, { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

const OpenSource = () => {
    const [showAll, setShowAll] = useState(false)
    const ref = useReveal()
    const github = useGithubCommits(REPO, AUTHOR, 8)

    const live = github.status === 'ready'
    const commits = live ? github.commits : jaseci_commits
    const total = live ? github.total : jaseci_commits.length
    const focus = (live && focusAreasFrom(github.commits).length) ? focusAreasFrom(github.commits) : fallbackFocus
    const visible = showAll ? commits : commits.slice(0, 4)

    return (
        <section id="opensource" className="opensource section section--white" ref={ref}>
            <div className="container section-header">
                <h1 className="headline reveal">Open Source</h1>
            </div>

            <div className="container opensource-bento">
                <div className="oss-tile oss-repo card reveal">
                    <FiGithub className="oss-gh-icon" />
                    <h2 className="oss-repo-name">
                        <a
                            href={`https://github.com/${REPO}`}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            jaseci-labs / jac
                            <FiArrowUpRight className="oss-ext-icon" />
                        </a>
                    </h2>
                    <p className="oss-repo-desc">
                        An open-source AI-native programming language and framework for building production AI applications.
                    </p>
                    <div className="oss-focus">
                        <span className="oss-focus-label">Focus areas:</span>
                        <div className="oss-focus-tags">
                            {focus.map((area) => <span className="pill" key={area}>{area}</span>)}
                        </div>
                    </div>
                </div>

                <a
                    className="oss-tile oss-stat card card--hover reveal"
                    style={{ '--reveal-delay': '0.08s' }}
                    href={`https://github.com/${REPO}/commits?author=${AUTHOR}`}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <FiGitCommit className="oss-stat-icon" />
                    <p className={`oss-stat-value ${github.status === 'loading' ? 'is-loading' : ''}`}>{github.status === 'loading' ? '–' : total}</p>
                    <p className="oss-stat-label">commits</p>
                </a>

                <div className="oss-tile oss-commits card reveal" style={{ '--reveal-delay': '0.16s' }}>
                    <div className="oss-commits-head">
                        <div className="oss-commits-label">Recent Contributions</div>
                        {live && (
                            <span className="oss-live" title={`Fetched from GitHub ${formatUpdated(github.fetchedAt)}`}>
                                <span className="oss-live-dot" /> Live from GitHub · {formatUpdated(github.fetchedAt)}
                            </span>
                        )}
                    </div>
                    <div className="oss-commits-list" aria-busy={github.status === 'loading'}>
                        {github.status === 'loading'
                            ? [0, 1, 2, 3].map((i) => <div className="oss-commit oss-commit--skeleton" key={i}><span /><span /><span /></div>)
                            : visible.map((commit) => (
                                <a
                                    className="oss-commit"
                                    key={commit.sha}
                                    href={commit.url || `https://github.com/${REPO}/commit/${commit.sha}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <span className="oss-sha">{commit.sha}</span>
                                    <p className="oss-commit-msg">{commit.message}</p>
                                    <div className="oss-commit-tags">
                                        {commit.tags.map((tag, ti) => (
                                            <span className="oss-commit-tag" key={ti}>{tag}</span>
                                        ))}
                                    </div>
                                    <span className="oss-commit-date">{commit.date}</span>
                                </a>
                            ))}
                    </div>

                    <div className="oss-actions">
                        {commits.length > 4 && github.status !== 'loading' && (
                            <button className="oss-show-more" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>
                                {showAll ? <>Show less <FiChevronUp /></> : <>Show all {commits.length} recent commits <FiChevronDown /></>}
                            </button>
                        )}

                        <a
                            href="https://github.com/akindu-k"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="link-chevron oss-profile-link"
                        >
                            View GitHub Profile
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OpenSource
