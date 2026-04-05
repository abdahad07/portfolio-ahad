import { motion } from "framer-motion";
import { profile } from "../data/site";
import { Button } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { scrollToSection } from "../utils/scroll";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";
import portrait from "../assets/photo.jpeg";

export default function HeroSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <section
      id="hero"
      className="relative flex min-h-[100dvh] items-center pt-24 pb-16 sm:pt-28"
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        aria-hidden
      >
        <div className="absolute -top-32 right-0 h-72 w-72 rounded-full bg-accent/15 blur-3xl dark:bg-accent/20" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      </div>
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <motion.div
            className="order-2 min-w-0 max-w-3xl lg:order-1"
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-mono text-sm font-medium tracking-wide text-accent uppercase">
              {profile.location}
            </p>
            <h1
              id="hero-heading"
              className="mt-4 text-4xl font-semibold tracking-tight text-ink sm:text-5xl lg:text-6xl"
            >
              {profile.name}
            </h1>
            <p className="mt-4 text-lg text-ink-muted sm:text-xl">
              {profile.title}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
              {profile.intro}
            </p>
            <motion.div
              className="mt-10 flex flex-wrap gap-3"
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.45 }}
            >
              <Button type="button" onClick={() => scrollToSection("projects")}>
                View work
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => scrollToSection("contact")}
              >
                Contact
              </Button>
            </motion.div>
            <motion.ul
              className="mt-12 flex flex-wrap gap-6"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.25, duration: 0.4 }}
              aria-label="Social links"
            >
              {profile.social.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm font-medium text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className="hidden lg:flex order-1 justify-center lg:order-2 lg:justify-end"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.6,
              delay: reduceMotion ? 0 : 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px]">
              <div
                className="pointer-events-none absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/25 via-accent/5 to-transparent opacity-80 blur-2xl dark:from-accent/35"
                aria-hidden
              />
              <motion.div
                className="relative overflow-hidden rounded-3xl border border-border bg-surface-elevated shadow-2xl ring-1 ring-ink/5 dark:ring-white/10"
                animate={
                  reduceMotion
                    ? undefined
                    : {
                        y: [0, -7, 0],
                      }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <img
                  src={portrait}
                  alt={profile.portraitAlt}
                  width={760}
                  height={950}
                  className="aspect-[4/5] w-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
