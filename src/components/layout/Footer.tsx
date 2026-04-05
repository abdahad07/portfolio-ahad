import { memo } from 'react'
import { motion } from 'framer-motion'
import { profile } from '../../data/site'
import { Container } from '../ui/Container'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

export const Footer = memo(function Footer() {
  const reduceMotion = usePrefersReducedMotion()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12">
      <Container>
        <motion.div
          className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <p className="text-sm font-semibold text-ink">{profile.name}</p>
            <p className="mt-1 text-sm text-ink-muted">{profile.title}</p>
          </div>
          <p className="text-sm text-ink-muted">
            © {year} {profile.name.split(' ')[0]}. Crafted with React & Tailwind.
          </p>
        </motion.div>
      </Container>
    </footer>
  )
})
