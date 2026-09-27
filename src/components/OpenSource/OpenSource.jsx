import React, { useState } from 'react'
import './OpenSource.css'
import { FiGithub, FiGitCommit, FiArrowUpRight, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { useReveal } from '../../motion'

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

const OpenSource = () => {
    const [showAll, setShowAll] = useState(false)
    const visible = showAll ? jaseci_commits : jaseci_commits.slice(0, 4)
    const ref = useReveal()

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
                            href="https://github.com/jaseci-labs/jaseci"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            jaseci-labs / jaseci
                            <FiArrowUpRight className="oss-ext-icon" />
                        </a>
                    </h2>
                    <p className="oss-repo-desc">
                        An open-source AI-native programming language and framework for building production AI applications.
                    </p>
                    <div className="oss-focus">
                        <span className="oss-focus-label">Focus areas:</span>
                        <div className="oss-focus-tags">
                            <span className="pill">Database Robustness</span>
                            <span className="pill">Redis Caching</span>
                            <span className="pill">Async LLM</span>
                        </div>
                    </div>
                </div>

                <div className="oss-tile oss-stat card reveal" style={{ '--reveal-delay': '0.08s' }}>
                    <FiGitCommit className="oss-stat-icon" />
                    <p className="oss-stat-value">{jaseci_commits.length}</p>
                    <p className="oss-stat-label">commits</p>
                </div>

                <div className="oss-tile oss-commits card reveal" style={{ '--reveal-delay': '0.16s' }}>
                    <div className="oss-commits-label">Recent Contributions</div>
                    <div className="oss-commits-list">
                        {visible.map((commit, i) => (
                            <div className="oss-commit" key={i}>
                                <span className="oss-sha">{commit.sha}</span>
                                <p className="oss-commit-msg">{commit.message}</p>
                                <div className="oss-commit-tags">
                                    {commit.tags.map((tag, ti) => (
                                        <span className="oss-commit-tag" key={ti}>{tag}</span>
                                    ))}
                                </div>
                                <span className="oss-commit-date">{commit.date}</span>
                            </div>
                        ))}
                    </div>

                    <div className="oss-actions">
                        <button className="oss-show-more" onClick={() => setShowAll(!showAll)} aria-expanded={showAll}>
                            {showAll ? <>Show less <FiChevronUp /></> : <>Show all {jaseci_commits.length} commits <FiChevronDown /></>}
                        </button>

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
