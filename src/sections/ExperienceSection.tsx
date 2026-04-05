import { motion } from 'framer-motion'
import { experience } from '../data/site'
import { SectionWrapper } from '../components/ui/SectionWrapper'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

export default function ExperienceSection() {
  const reduceMotion = usePrefersReducedMotion()

  return (
    <SectionWrapper id="experience" eyebrow="Experience" title="Where I’ve shipped impact">
      <ol className="relative space-y-10 border-l border-border pl-8">
        {experience.map((item, i) => (
          <motion.li
            key={item.id}
            className="relative"
            initial={reduceMotion ? false : { opacity: 0, x: -12 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <span
              className="absolute -left-[39px] top-1.5 h-3 w-3 rounded-full border-2 border-surface-elevated bg-accent ring-4 ring-accent/20"
              aria-hidden
            />
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-sm">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-ink">{item.role}</h3>
                  <p className="text-sm font-medium text-accent">{item.company}</p>
                </div>
                <p className="font-mono text-xs text-ink-muted uppercase tracking-wide">{item.period}</p>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.summary}</p>
              <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-ink-muted marker:text-accent">
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </SectionWrapper>
  )
}
