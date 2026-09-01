import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import { PageFrame, PageHero, SectionHeading, SiteShell } from './site-shell'
import { BehindTheCurtains, ContactFooter } from './home-sections'

const links = [
  { label: 'GitHub', handle: '@A-verse', href: 'https://github.com/A-verse' },
  { label: 'LinkedIn', handle: 'theanjalikamal', href: 'https://linkedin.com/in/theanjalikamal' },
  { label: 'LeetCode', handle: '@A-verse', href: 'https://leetcode.com/u/A-verse/' },
  { label: 'Instagram', handle: '@anjalikamal31', href: 'https://instagram.com/anjalikamal31' },
  { label: 'Email', handle: 'anjalikamal3105@gmail.com', href: 'mailto:anjalikamal3105@gmail.com' },
]

export function LinksPage() {
  return (
    <SiteShell>
      <PageHero eyebrow="Elsewhere" title="LINKS" sub="FIND ME AROUND" em="the web." />
      <PageFrame>
        <SectionHeading
          eyebrow="Elsewhere"
          title="Find me around the web."
          copy="A short list of places where I share work, code, and the occasional off-the-clock post."
        />
        <div className="links-grid">
          {links.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="links-card">
              <div>
                <strong>{link.label}</strong>
                <span>{link.handle}</span>
              </div>
              <ArrowUpRight className="links-card-icon" size={20} />
            </a>
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
