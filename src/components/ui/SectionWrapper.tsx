import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Container } from './Container'
import { cn } from '../../utils/cn'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface SectionWrapperProps {
  id: string
  title?: string
  eyebrow?: string
  children: ReactNode
  className?: string
}

export function SectionWrapper({ id, title, eyebrow, children, className }: SectionWrapperProps) {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <section
      id={id}
      className={cn('scroll-mt-24 py-20 sm:py-24 lg:py-28', className)}
      aria-labelledby={title ? `${id}-heading` : undefined}
    >
      <Container>
        {(title || eyebrow) && (
          <motion.header
            className="mb-12 max-w-2xl"
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {eyebrow && (
              <p className="font-mono text-sm font-medium tracking-wide text-accent uppercase">
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                id={`${id}-heading`}
                className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl"
              >
                {title}
              </h2>
            )}
          </motion.header>
        )}
        {children}
      </Container>
    </section>
  )
}
