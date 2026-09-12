import Image from "next/image";
import type { Project } from "./projects-data";
import { PhoneMockup } from "./phone-mockup";
import { LaptopMockup } from "./laptop-mockup";
import { SparkleIcon } from "./sparkle-icon";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="project-card w-full" data-project-id={project.id}>
      <div
        className="flex flex-col w-full lg:max-w-[865px]"
        style={{ margin: 0, border: 0 }}
      >
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          draggable={false}
          className="project-frame group relative block w-full lg:max-w-[865px] lg:h-auto lg:min-h-[350px]"
          style={{ background: "transparent" }}
        >
          <div className="relative w-full h-full">
            {/* Tablet / desktop layout: 2 phones + laptop */}
            <div className="hidden sm:grid sm:grid-cols-[minmax(160px,28%)_minmax(0,1fr)] lg:grid-cols-[minmax(200px,262px)_minmax(400px,1fr)] gap-3 sm:gap-4 lg:gap-5 h-full justify-center w-full">
              <div className="flex flex-col gap-4 lg:gap-[30px]">
                <PhoneMockup
                  src={project.images.mobile1}
                  alt={`${project.title} Mobile View 1`}
                  gradient={project.gradient}
                />
                <PhoneMockup
                  src={project.images.mobile2}
                  alt={`${project.title} Mobile View 2`}
                  gradient={project.gradient}
                />
              </div>
              <div className="h-full">
                <LaptopMockup
                  src={project.images.main}
                  alt={project.title}
                  gradient={project.gradient}
                  fit={project.mainImageFit}
                  priority={project.id === "rune"}
                />
              </div>
            </div>
            {/* Mobile layout: laptop only */}
            <div className="sm:hidden aspect-[16/10]">
              <LaptopMockup
                src={project.images.main}
                alt={project.title}
                gradient={project.gradient}
                fit={project.mainImageFit}
              />
            </div>
          </div>
        </a>

        {/* Mobile info panel (hidden on lg where sticky panel takes over) */}
        <div className="mobile-project-info mt-4 sm:mt-5 p-4 sm:p-5 bg-neutral-100 dark:bg-white/5 rounded-xl sm:rounded-2xl border border-black/10 dark:border-white/10 lg:hidden">
          <div className="flex items-center mb-2 sm:mb-3">
            <div
              aria-hidden="true"
              className={`mr-2 sm:mr-3 h-1 w-5 sm:w-6 rounded-full ${project.accent.dash}`}
            />
            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 dark:text-white font-outfit">
              {project.title}
            </h3>
          </div>
          <p className="text-neutral-600 dark:text-gray-300 mb-3 sm:mb-4 leading-relaxed font-outfit text-sm sm:text-base">
            {project.description}
          </p>
          <ul className="list-none p-0 mb-4 sm:mb-5">
            {project.features.map((feature) => (
              <li
                key={feature}
                className="flex items-start mb-1.5 sm:mb-2 text-neutral-600 dark:text-gray-300 text-xs sm:text-sm font-outfit"
              >
                <SparkleIcon
                  className={`w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 mt-0.5 shrink-0 rounded-full p-0.5 ${project.accent.fill} ${project.accent.text} ${project.accent.bg}`}
                />
                {feature}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.tech.map((t) => (
              <div
                key={t.name}
                className="flex items-center gap-1.5 lg:gap-2 rounded-xl border border-black/10 dark:border-white/[0.14] dark:border-t-white/[0.25] bg-neutral-100 dark:bg-[#111111] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.4)] px-2.5 py-1 font-outfit text-xs text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <Image
                  src={t.icon || "/placeholder.svg"}
                  alt={t.name}
                  width={16}
                  height={16}
                  className="h-3.5 w-3.5 object-contain"
                />
                {t.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
