import { memo, useCallback } from "react";
import { motion } from "framer-motion";
import { navItems } from "../../data/site";
import { scrollToSection } from "../../utils/scroll";
import { cn } from "../../utils/cn";
import { Container } from "../ui/Container";
import { useTheme } from "../../hooks/useTheme";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";
import { MobileNav } from "./MobileNav";

interface NavbarProps {
  activeId: string;
}

export const Navbar = memo(function Navbar({ activeId }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();

  const onNav = useCallback((id: string) => {
    scrollToSection(id);
  }, []);

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-surface/80 backdrop-blur-md"
      initial={reduceMotion ? false : { y: -12, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      <Container className="flex h-16 items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNav("hero")}
          className="text-sm font-semibold tracking-tight text-ink transition-opacity hover:opacity-80"
        >
          AA.
        </button>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const active = activeId === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onNav(item.id)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 -z-10 rounded-lg bg-ink/5 dark:bg-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </nav>
        <div className="flex items-center gap-2">
          <MobileNav activeId={activeId} />
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-surface-elevated text-ink transition-colors hover:border-accent/40"
            aria-label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
          >
            {theme === "dark" ? (
              <SunIcon className="h-5 w-5" />
            ) : (
              <MoonIcon className="h-5 w-5" />
            )}
          </button>
        </div>
      </Container>
    </motion.header>
  );
});

function SunIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
