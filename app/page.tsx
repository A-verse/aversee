import { ProjectsSection } from "@/components/projects/projects-section";
import {
  BehindTheCurtains,
  ContactFooter,
  Hero,
  Skillset,
} from "@/components/home-sections";
import { NameHero } from "@/components/name-hero";
import { SiteShell } from "@/components/site-shell";

export default function Page() {
  return (
    <SiteShell>
      <NameHero />
      <Hero />
      <div id="projects">
        <ProjectsSection />
      </div>
      <Skillset />
      <BehindTheCurtains />
      <ContactFooter />
    </SiteShell>
  );
}
