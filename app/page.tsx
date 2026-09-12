import { ProjectsSection } from "@/components/projects/projects-section";
import { DevToolsGuard } from "@/components/dev-tools-guard.tsx";
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
      <DevToolsGuard />
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
