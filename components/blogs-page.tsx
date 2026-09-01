'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PageFrame, PageHero, SectionHeading, SiteShell } from './site-shell'
import { BehindTheCurtains, ContactFooter } from './home-sections'

type Post = { slug: string; title: string; excerpt: string; category: string; date: string; readTime: string }

// TODO(Anjali): these are topics, not published posts yet — swap in real
// dates/read-times once each one is actually written.
const posts: Post[] = [
  { slug: 'learning-dsa-under-placement-pressure', title: 'Notes on learning DSA under placement pressure', excerpt: 'What actually helped versus what just felt productive, three months into interview prep.', category: 'Placement', date: 'Planned', readTime: '—' },
  { slug: 'rebuilt-portfolio-from-scratch', title: 'Why I rebuilt my portfolio from scratch', excerpt: 'On starting over instead of iterating, and what that taught me about scope.', category: 'Building', date: 'Planned', readTime: '—' },
  { slug: 'what-rag-taught-me-about-search', title: 'What RAG systems taught me about search', excerpt: 'Notes from experimenting with LangChain and retrieval pipelines outside of coursework.', category: 'AI', date: 'Planned', readTime: '—' },
  { slug: 'placement-season-lessons', title: 'Placement season: what I wish I knew earlier', excerpt: 'The unglamorous parts of prepping for SDE interviews as a final-year student.', category: 'Placement', date: 'Planned', readTime: '—' },
]

const categories = ['All Posts', 'Placement', 'Building', 'AI']

export function BlogsPage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('All Posts')

  const filtered = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = category === 'All Posts' || p.category === category
      const q = query.trim().toLowerCase()
      const matchesQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <SiteShell>
      <PageHero eyebrow="Writing" title="BLOG" sub="THOUGHTS I'M PLANNING TO" em="write down." />
      <PageFrame>
        <SectionHeading
          eyebrow="Writing"
          title="Topics I want to write about."
          copy="Not published yet — this is the running list. Notes on the process, from someone still figuring most of it out."
        />

        <div className="blog-controls">
          <div className="blog-search">
            <span>⌕</span>
            <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search articles..." />
          </div>
          <div className="blog-filters">
            {categories.map((c) => (
              <button key={c} className={c === category ? 'blog-filter-active' : ''} onClick={() => setCategory(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="blog-grid">
          {filtered.length === 0 && <p className="text-muted-foreground">No posts match that search yet.</p>}
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blogs/${post.slug}`} className="blog-card">
              <div className="blog-card-meta">
                <span>{post.date}</span>
                <span>·</span>
                <span>{post.readTime}</span>
              </div>
              <h2>{post.title}</h2>
              <p>{post.excerpt}</p>
              <span className="blog-card-tag">{post.category}</span>
            </Link>
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
