import { memo, useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { navItems } from '../../data/site'
import { scrollToSection } from '../../utils/scroll'
import { cn } from '../../utils/cn'

interface MobileNavProps {
  activeId: string
}

export const MobileNav = memo(function MobileNav({ activeId }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const go = useCallback((id: string) => {
    scrollToSection(id)
    setOpen(false)
  }, [])

  return (
    <div className="md:hidden">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        aria-label="Open menu"
      >
        <span className="sr-only">Menu</span>
        <div className="flex w-5 flex-col gap-1">
          <span className={cn('h-0.5 rounded-full bg-ink transition-transform', open && 'translate-y-1.5 rotate-45')} />
          <span className={cn('h-0.5 rounded-full bg-ink transition-opacity', open && 'opacity-0')} />
          <span className={cn('h-0.5 rounded-full bg-ink transition-transform', open && '-translate-y-1.5 -rotate-45')} />
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-16 z-40 rounded-2xl border border-border bg-surface-elevated p-3 shadow-lg"
          >
            <ul className="flex flex-col gap-1">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => go(item.id)}
                    className={cn(
                      'w-full rounded-xl px-3 py-2.5 text-left text-sm font-medium',
                      activeId === item.id ? 'bg-ink/5 text-ink dark:bg-white/10' : 'text-ink-muted',
                    )}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
})
