import { motion } from "framer-motion";
import { skillCategories, profile } from "../data/site";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { Card } from "../components/ui/Card";
import { usePrefersReducedMotion } from "../hooks/usePrefersReducedMotion";

export default function AboutSection() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <SectionWrapper
      id="about"
      eyebrow="About"
      title="Building clean, performant web experiences"
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
        <motion.p
          className="text-lg leading-relaxed text-ink-muted"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.45 }}
        >
          {profile.bio}
        </motion.p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
            >
              <Card asMotion={false} className="h-full p-5">
                <h3 className="text-sm font-semibold text-ink">{cat.title}</h3>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li key={item}>
                      <span className="inline-flex rounded-lg bg-ink/5 px-2 py-1 text-xs font-medium text-ink-muted dark:bg-white/10">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
