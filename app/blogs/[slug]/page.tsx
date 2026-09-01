import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PageFrame, PageHero, SiteShell } from '@/components/site-shell'
import { BehindTheCurtains, ContactFooter } from '@/components/home-sections'

const posts = {
  'learning-dsa-under-placement-pressure': ['Notes on learning DSA under placement pressure', 'Placement'],
  'rebuilt-portfolio-from-scratch': ['Why I rebuilt my portfolio from scratch', 'Building'],
  'what-rag-taught-me-about-search': ['What RAG systems taught me about search', 'AI'],
  'placement-season-lessons': ['Placement season: what I wish I knew earlier', 'Placement'],
} as const

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }))
}

export default async function BlogDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = posts[slug as keyof typeof posts]
  if (!post) notFound()

  return (
    <SiteShell>
      <PageHero eyebrow={post[1]} title="BLOG" sub="A NOTE ON" em="the process." />
      <PageFrame>
        <article className="blog-detail">
          <p className="eyebrow">{post[1]} · 2026</p>
          <h1>{post[0]}</h1>
          <p className="blog-detail-lede">A working note from the build process — honest observations, useful patterns, and the parts that still need figuring out.</p>
          <div className="blog-detail-body">
            <p>This is a living draft, written from the projects and problems that shaped the work. The useful part is rarely the finished answer; it is the reasoning, trade-offs, and small decisions that made the next step clearer.</p>
            <p>More detail will land here as the note develops. For now, consider this a bookmark for the questions worth returning to.</p>
          </div>
          <Link href="/blogs" className="blog-detail-back">← All posts</Link>
        </article>
      </PageFrame>
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  )
}
