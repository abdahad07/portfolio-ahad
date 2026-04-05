import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { useFinePointer } from '../../hooks/useFinePointer'

/** Softer spring = more “follow-through” lag behind the pointer. */
const SPRING_OUTER = { mass: 1.35, stiffness: 110, damping: 22 }
/** Tighter spring = inner dot stays closer to the real cursor. */
const SPRING_INNER = { mass: 0.25, stiffness: 520, damping: 32 }

/**
 * Decorative cursor follower (desktop / fine pointer only).
 * Does not replace the system cursor — keeps native cursor for accessibility.
 */
export function CursorFollow() {
  const prefersReducedMotion = usePrefersReducedMotion()
  const finePointer = useFinePointer()
  const [onPage, setOnPage] = useState(false)

  const targetX = useMotionValue(-100)
  const targetY = useMotionValue(-100)

  const outerX = useSpring(targetX, SPRING_OUTER)
  const outerY = useSpring(targetY, SPRING_OUTER)
  const innerX = useSpring(targetX, SPRING_INNER)
  const innerY = useSpring(targetY, SPRING_INNER)

  useEffect(() => {
    if (!finePointer || prefersReducedMotion) return

    const onMove = (e: PointerEvent): void => {
      targetX.set(e.clientX)
      targetY.set(e.clientY)
      setOnPage(true)
    }

    const onLeave = (): void => {
      setOnPage(false)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
    }
  }, [finePointer, prefersReducedMotion, targetX, targetY])

  if (!finePointer || prefersReducedMotion) {
    return null
  }

  return (
    <motion.div
      className="pointer-events-none fixed inset-0 z-[9998] overflow-hidden"
      aria-hidden
      initial={false}
      animate={{ opacity: onPage ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      {/* Outer ring — noticeable lag = follow-through */}
      <motion.div
        className="absolute h-11 w-11 rounded-full border-2 border-accent/45 dark:border-accent/55"
        style={{
          left: outerX,
          top: outerY,
          x: '-50%',
          y: '-50%',
        }}
      />
      {/* Inner dot — quick, stays near the cursor */}
      <motion.div
        className="absolute h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_color-mix(in_oklch,var(--color-accent)_55%,transparent)]"
        style={{
          left: innerX,
          top: innerY,
          x: '-50%',
          y: '-50%',
        }}
      />
    </motion.div>
  )
}
