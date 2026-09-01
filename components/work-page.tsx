import Link from "next/link";
import { projects } from "./projects/projects-data";
import { ProjectShowcase } from "./projects/project-showcase";
import { PageHero, SiteShell } from "./site-shell";
import { BehindTheCurtains, ContactFooter } from "./home-sections";

export function WorkPage() {
  return (
    <SiteShell>
      <PageHero
        eyebrow="Selected work"
        title="WORK"
        sub="A FEW THINGS I HAVE"
        em="actually made."
      />
      <ProjectShowcase items={projects} />
      <div className="page-frame" style={{ paddingTop: 0 }}>
        <Link
          href="/"
          className="text-sm text-muted-foreground hover:text-foreground"
        >
          ← Back home
        </Link>
      </div>
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
