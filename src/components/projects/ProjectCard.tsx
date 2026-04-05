import { memo } from "react";
import { motion } from "framer-motion";
import type { Project } from "../../types";
import { Button } from "../ui/Button";
import { usePrefersReducedMotion } from "../../hooks/usePrefersReducedMotion";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export const ProjectCard = memo(function ProjectCard({
  project,
  index,
}: ProjectCardProps) {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <motion.article
      className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-surface-elevated shadow-sm transition-shadow hover:shadow-md"
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.45,
        delay: index * 0.06,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-ink/5">
        <img
          src={project.imageSrc}
          alt={project.imageAlt}
          width={800}
          height={500}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-elevated/90 via-transparent to-transparent opacity-80 dark:from-surface/90" />
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-ink">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">
            {project.description}
          </p>
        </div>
        <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
          {project.techStack.map((tech) => (
            <li key={tech}>
              <span className="rounded-lg bg-ink/5 px-2.5 py-1 font-mono text-xs font-medium text-ink-muted dark:bg-white/10">
                {tech}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-3 pt-2">
          <Button variant="primary" href={project.liveUrl}>
            Live demo
          </Button>
          {project.githubUrl !== "" && (
            <Button variant="outline" href={project.githubUrl}>
              GitHub
            </Button>
          )}
        </div>
      </div>
    </motion.article>
  );
});
