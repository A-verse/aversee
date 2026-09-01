import { projects } from './projects-data'
import { ProjectShowcase } from './project-showcase'

export function ProjectsSection() {
  return <ProjectShowcase items={projects} />
}
