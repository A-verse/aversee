import { notFound } from 'next/navigation'
import Link from 'next/link'
import { projects } from '@/components/projects/projects-data'
import { ProjectShowcase } from '@/components/projects/project-showcase'
import { SiteShell, PageHero } from '@/components/site-shell'
import { BehindTheCurtains, ContactFooter } from '@/components/home-sections'

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.id }))
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = projects.find((p) => p.id === slug)
  if (!project) notFound()

  return (
    <SiteShell>
      <PageHero eyebrow="Case study" title={project.title.toUpperCase()} sub="A CLOSER LOOK AT" em="how it was built." />
      <ProjectShowcase items={[project]} eyebrow="One project, up close" headingA="THE" headingB="DETAILS" />
      <div className="page-frame" style={{ paddingTop: 0 }}>
        <a href={project.url} target="_blank" rel="noreferrer" className="gradient-button">
          View repository →
        </a>
        <Link href="/projects" className="ml-6 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← All projects
        </Link>
      </div>
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  )
}
