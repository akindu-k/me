import React, { useState } from 'react'
import './OpenSource.css'
import { FaGithub, FaCodeBranch, FaExternalLinkAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa'

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

    return (
        <div id="opensource" className="opensource">
            <div className="opensource-title">
                <h1>Open Source</h1>
            </div>

            <div className="opensource-card">
                <div className="oss-card-header">
                    <div className="oss-repo-info">
                        <FaGithub className="oss-gh-icon" />
                        <div>
                            <h2 className="oss-repo-name">
                                <a
                                    href="https://github.com/jaseci-labs/jaseci"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    jaseci-labs / jaseci
                                    <FaExternalLinkAlt className="oss-ext-icon" />
                                </a>
                            </h2>
                            <p className="oss-repo-desc">
                                An open-source AI-native programming language and framework for building production AI applications.
                            </p>
                        </div>
                    </div>
                    <div className="oss-stats">
                        <div className="oss-stat">
                            <FaCodeBranch />
                            <span>{jaseci_commits.length} commits</span>
                        </div>
                        <div className="oss-stat">
                            <span className="oss-focus-label">Focus areas:</span>
                            <div className="oss-focus-tags">
                                <span className="oss-focus-tag">Database Robustness</span>
                                <span className="oss-focus-tag">Redis Caching</span>
                                <span className="oss-focus-tag">Async LLM</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="oss-commits-label">Recent Contributions</div>
                <div className="oss-commits-list">
                    {visible.map((commit, i) => (
                        <div className="oss-commit" key={i}>
                            <div className="oss-commit-left">
                                <span className="oss-sha">{commit.sha}</span>
                                <p className="oss-commit-msg">{commit.message}</p>
                            </div>
                            <div className="oss-commit-right">
                                <div className="oss-commit-tags">
                                    {commit.tags.map((tag, ti) => (
                                        <span className="oss-commit-tag" key={ti}>{tag}</span>
                                    ))}
                                </div>
                                <span className="oss-commit-date">{commit.date}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="oss-show-more" onClick={() => setShowAll(!showAll)}>
                    {showAll ? <><FaChevronUp /> Show less</> : <><FaChevronDown /> Show all {jaseci_commits.length} commits</>}
                </button>

                <a
                    href="https://github.com/akindu-k"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="oss-profile-link"
                >
                    <FaGithub /> View GitHub Profile
                </a>
            </div>
        </div>
    )
}

export default OpenSource
