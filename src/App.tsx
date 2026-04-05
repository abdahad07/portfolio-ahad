import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { navItems } from './data/site'
import { useActiveSection } from './hooks/useActiveSection'
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { PageLoader } from './components/layout/PageLoader'
import { CursorFollow } from './components/layout/CursorFollow'
import HeroSection from './sections/HeroSection'

const AboutSection = lazy(() => import('./sections/AboutSection'))
const ProjectsSection = lazy(() => import('./sections/ProjectsSection'))
const ExperienceSection = lazy(() => import('./sections/ExperienceSection'))
const ContactSection = lazy(() => import('./sections/ContactSection'))

function SectionFallback() {
  return (
    <div className="py-24" aria-hidden>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-ink/10" />
        <div className="mt-4 h-12 max-w-md animate-pulse rounded-lg bg-ink/10" />
        <div className="mt-10 h-40 animate-pulse rounded-2xl bg-ink/5" />
      </div>
    </div>
  )
}

const MIN_LOADER_MS = 720

function App() {
  const reduceMotion = usePrefersReducedMotion()
  const [loading, setLoading] = useState(true)
  const sectionIds = useMemo(() => navItems.map((n) => n.id), [])
  const activeId = useActiveSection(sectionIds)

  useEffect(() => {
    const start = performance.now()
    const done = (): void => {
      const elapsed = performance.now() - start
      const wait = Math.max(0, MIN_LOADER_MS - elapsed)
      window.setTimeout(() => setLoading(false), wait)
    }
    if (document.readyState === 'complete') {
      done()
    } else {
      window.addEventListener('load', done, { once: true })
      return () => window.removeEventListener('load', done)
    }
  }, [])

  return (
    <>
      <PageLoader visible={loading} />
      <AnimatePresence mode="wait">
        {!loading && (
          <motion.div
            key="app-shell"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <LayoutGroup>
              <Navbar activeId={activeId} />
            </LayoutGroup>
            <CursorFollow />
            <main className="bg-surface text-ink">
              <HeroSection />
              <Suspense fallback={<SectionFallback />}>
                <AboutSection />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <ProjectsSection />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <ExperienceSection />
              </Suspense>
              <Suspense fallback={<SectionFallback />}>
                <ContactSection />
              </Suspense>
              <Footer />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default App
