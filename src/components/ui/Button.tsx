import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

type Variant = 'primary' | 'ghost' | 'outline'

interface ButtonProps {
  variant?: Variant
  children: ReactNode
  className?: string
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  onClick?: () => void
  href?: string
}

const variantClasses: Record<Variant, string> = {
  primary:
    'bg-accent text-white shadow-sm hover:bg-accent-hover focus-visible:ring-accent/40',
  ghost:
    'bg-transparent text-ink hover:bg-ink/5 dark:hover:bg-white/10 focus-visible:ring-ink/20',
  outline:
    'border border-border bg-surface-elevated text-ink hover:border-accent/50 hover:shadow-sm focus-visible:ring-accent/30',
}

export function Button({
  variant = 'primary',
  className,
  children,
  type = 'button',
  disabled,
  onClick,
  href,
}: ButtonProps) {
  const reduceMotion = usePrefersReducedMotion()
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface dark:focus-visible:ring-offset-surface'

  const classes = cn(base, variantClasses[variant], className)

  if (href) {
    return (
      <motion.a
        href={href}
        className={classes}
        whileHover={reduceMotion ? undefined : { y: -1 }}
        whileTap={reduceMotion ? undefined : { scale: 0.98 }}
        rel="noopener noreferrer"
        target="_blank"
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      className={classes}
      disabled={disabled}
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { y: -1 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
