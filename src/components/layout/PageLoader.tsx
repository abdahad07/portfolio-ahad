import { AnimatePresence, motion } from 'framer-motion'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'

interface PageLoaderProps {
  visible: boolean
}

export function PageLoader({ visible }: PageLoaderProps) {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-surface"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-live="polite"
        >
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="h-12 w-12 rounded-2xl border-2 border-accent border-t-transparent"
              animate={reduceMotion ? undefined : { rotate: 360 }}
              transition={reduceMotion ? undefined : { repeat: Infinity, duration: 0.9, ease: 'linear' }}
              aria-hidden
            />
            <p className="font-mono text-xs font-medium tracking-[0.2em] text-ink-muted uppercase">
              Loading
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
