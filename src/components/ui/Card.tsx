import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface CardProps {
  children: ReactNode
  className?: string
  asMotion?: boolean
}

export function Card({ children, className, asMotion = true }: CardProps) {
  const reduceMotion = usePrefersReducedMotion()
  const styles = cn(
    'rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm transition-shadow',
    className,
  )

  if (asMotion) {
    return (
      <motion.div
        className={styles}
        whileHover={reduceMotion ? undefined : { y: -3, boxShadow: '0 18px 40px -24px rgb(0 0 0 / 0.25)' }}
        transition={{ type: 'spring', stiffness: 420, damping: 28 }}
      >
        {children}
      </motion.div>
    )
  }

  return <div className={styles}>{children}</div>
}
