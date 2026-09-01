import Link from 'next/link'
import { PageFrame, PageHero, SectionHeading, SiteShell } from './site-shell'
import { BehindTheCurtains, ContactFooter } from './home-sections'

const groups = [
  {
    heading: 'Editor & Workflow',
    items: [
      { name: 'VS Code', slug: 'visualstudiocode' },
      { name: 'GitHub Copilot', slug: 'githubcopilot' },
      { name: 'Git', slug: 'git' },
      { name: 'GitHub', slug: 'github' },
    ],
  },
  {
    heading: 'Frontend',
    items: [
      { name: 'Next.js', slug: 'nextdotjs' },
      { name: 'React', slug: 'react' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'Tailwind CSS', slug: 'tailwindcss' },
    ],
  },
  {
    heading: 'Backend & Data',
    items: [
      { name: 'Node.js', slug: 'nodedotjs' },
      { name: 'PostgreSQL', slug: 'postgresql' },
      { name: 'Prisma', slug: 'prisma' },
      { name: 'Supabase', slug: 'supabase' },
    ],
  },
  {
    heading: 'Design & Planning',
    items: [
      { name: 'Figma', slug: 'figma' },
      { name: 'Notion', slug: 'notion' },
      { name: 'Linear', slug: 'linear' },
    ],
  },
]

export function UsesPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Uses" title="USES" sub="THE TOOLS BEHIND" em="the work." />
      <PageFrame>
        <SectionHeading
          eyebrow="Uses"
          title="The tools behind the work."
          copy="A deliberately small setup that keeps the focus on the idea instead of the configuration."
        />
        <div className="uses-groups">
          {groups.map((group) => (
            <div key={group.heading} className="uses-group">
              <p className="uses-group-heading">{group.heading}</p>
              <div className="uses-item-grid">
                {group.items.map((item) => (
                  <div key={item.name} className="uses-item">
                    <img src={`https://cdn.simpleicons.org/${item.slug}/ffffff`} alt="" width={22} height={22} />
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <Link href="/" className="mt-12 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back home
        </Link>
      </PageFrame>
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  )
}
