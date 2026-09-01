import Link from 'next/link'
import { PageFrame, PageHero, SectionHeading, SiteShell } from './site-shell'
import { Reveal } from './reveal'
import { BehindTheCurtains, ContactFooter } from './home-sections'

const experiments = [
  {
    tag: 'DSA',
    title: 'Placement Prep Tracker',
    detail: 'A running log of the Apna College SDE Sheet — problems solved, patterns revisited, and weak spots to circle back to before interviews.',
    tech: ['DSA', 'Interview Prep'],
  },
  {
    tag: 'SYSTEM DESIGN',
    title: 'System Design Notes',
    detail: 'Write-ups on scalability, caching, load balancing, and API design — working through classic system design problems (URL shortener, rate limiter, chat app) end to end.',
    tech: ['Architecture', 'Scalability', 'API Design'],
  },
  {
    tag: 'AI',
    title: 'RAG + LangChain Experiments',
    detail: 'Small retrieval-augmented pipelines built outside of coursework — chunking strategies, embeddings, and agentic workflows.',
    tech: ['LangChain', 'RAG', 'Python'],
  },
  {
    tag: 'MOTION',
    title: 'Portfolio Motion Studies',
    detail: 'The scroll-driven reveals, sticky panels, and marquees on this very site — prototyped here first before shipping to production.',
    tech: ['GSAP', 'Framer Motion'],
  },
  {
    tag: 'TOOLING',
    title: 'Dev-tool Side Quests',
    detail: 'Small scripts and CLI helpers built to solve my own workflow annoyances — nothing polished enough to ship, yet.',
    tech: ['Node.js', 'TypeScript'],
  },
]

export function LabsPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Experiments" title="LABS" sub="WHAT I'M WORKING" em="through right now." />
      <PageFrame>
        <SectionHeading
          eyebrow="Currently building"
          title="What I'm working through right now."
          copy="DSA reps, agentic-AI experiments, and the small tools I build to solve my own problems along the way. Not polished, not finished — just honest work-in-progress."
        />
        <Reveal className="about-grid" stagger={0.1}>
          {experiments.map((item, index) => (
            <div key={item.title} className="about-card" data-reveal>
              <span className="about-card-index">0{index + 1} · {item.tag}</span>
              <h2 className="about-card-title">{item.title}</h2>
              <p className="about-card-detail">{item.detail}</p>
              <div className="exp-row-tags" style={{ marginTop: '1.1rem' }}>
                {item.tech.map((t) => <span key={t}>{t}</span>)}
              </div>
            </div>
          ))}
        </Reveal>
        <Link href="/" className="mt-12 inline-block text-sm text-muted-foreground hover:text-foreground">
          ← Back home
        </Link>
      </PageFrame>
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  )
}
