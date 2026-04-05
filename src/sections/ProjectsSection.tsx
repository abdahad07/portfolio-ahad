import { projects } from "../data/projects";
import { SectionWrapper } from "../components/ui/SectionWrapper";
import { ProjectCard } from "../components/projects/ProjectCard";

export default function ProjectsSection() {
  return (
    <SectionWrapper id="projects" eyebrow="Work" title="Projects">
      <div className="grid gap-8 lg:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </SectionWrapper>
  );
}
