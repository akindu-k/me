import React, { useCallback, useEffect, useRef, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

// Horizontally scrollable, snap-aligned card row with paddle buttons.
const Scroller = ({ children, className = '', label }) => {
    const ref = useRef(null)
    const [edges, setEdges] = useState({ start: true, end: false })

    const update = useCallback(() => {
        const el = ref.current
        if (!el) return
        setEdges({
            start: el.scrollLeft <= 4,
            end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
        })
    }, [])

    useEffect(() => {
        update()
        window.addEventListener('resize', update)
        return () => window.removeEventListener('resize', update)
    }, [update])

    const page = (dir) => {
        const el = ref.current
        el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: 'smooth' })
    }

    return (
        <>
            <div className={`scroller ${className}`} ref={ref} onScroll={update} role="region" aria-label={label} tabIndex={0}>
                {children}
            </div>
            {!(edges.start && edges.end) && (
                <div className="scroller-controls">
                    <button className="scroller-btn" onClick={() => page(-1)} disabled={edges.start} aria-label="Previous"><FiChevronLeft /></button>
                    <button className="scroller-btn" onClick={() => page(1)} disabled={edges.end} aria-label="Next"><FiChevronRight /></button>
                </div>
            )}
        </>
    )
}

export default Scroller
