"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Project } from "./projects-data";
import { ProjectCard } from "./project-card";
import { StickyInfoPanel } from "./sticky-info-panel";

gsap.registerPlugin(ScrollTrigger);

export function ProjectShowcase({
  items,
  eyebrow = "Things I've built and shipped",
  headingA = "PROJECT",
  headingB = "SHOWCASE",
}: {
  items: Project[];
  eyebrow?: string;
  headingA?: string;
  headingB?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const progressMarkerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".project-card");

      cards.forEach((card, index) => {
        const phones = card.querySelectorAll(".phone-frame");
        const laptops = card.querySelectorAll(".laptop-frame");

        gsap.set(phones, { opacity: 0, y: 20 });
        gsap.set(laptops, { opacity: 0, scale: 0.95 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 85%",
          once: true,
          onEnter: () => {
            gsap.to(phones, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power2.out",
              stagger: 0.15,
            });

            gsap.to(laptops, {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: "power2.out",
              delay: 0.1,
            });
          },
        });

        gsap.fromTo(
          card,
          { y: 80, opacity: 0.35, scale: 0.96 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top bottom",
              end: "top 30%",
              scrub: true,
            },
          },
        );

        ScrollTrigger.create({
          trigger: card,
          start: "top center",
          end: "bottom center",
          onEnter: () => setActiveIndex(index),
          onEnterBack: () => setActiveIndex(index),
        });
      });

      const rightContainer = section.querySelector(".right-container");

      if (
        rightContainer &&
        progressFillRef.current &&
        progressMarkerRef.current
      ) {
        gsap.set(progressFillRef.current, {
          opacity: 1,
          scaleY: 0,
          transformOrigin: "top",
        });

        ScrollTrigger.create({
          trigger: rightContainer,
          start: "top center",
          end: "bottom center",
          scrub: 0.5,
          onUpdate: (self) => {
            gsap.set(progressFillRef.current, {
              scaleY: self.progress,
            });

            gsap.set(progressMarkerRef.current, {
              top: `${self.progress * 100}%`,
            });
          },
        });
      }
    }, section);

    return () => ctx.revert();
  }, [items]);

  const activeProject = items[activeIndex] ?? items[0];

  return (
    <div className="bg-neutral-50 dark:bg-black">
      <section
        ref={sectionRef}
        className="w-full min-h-screen overflow-x-clip flex flex-col justify-start items-center z-20 font-outfit px-4 sm:px-6 lg:px-4 py-12 sm:py-16 lg:pt-16 pb-24 sm:pb-32 lg:pb-[200px]"
        style={{
          margin: 0,
          border: 0,
          position: "relative",
        }}
      >
        {/* =========================
            SECTION HEADING
        ========================== */}

        <div className="w-full text-center mb-10 sm:mb-14 md:mb-16 lg:mb-20 relative z-30 pt-8 sm:pt-12 md:pt-16 pb-6 sm:pb-8 md:pb-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 sm:w-75 sm:h-75 md:w-100 md:h-100 opacity-20 pointer-events-none">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500/30 to-blue-500/30 blur-[60px] animate-pulse" />
          </div>

          <div className="relative flex flex-col items-center px-4">
            <p className="text-xs sm:text-sm uppercase tracking-wider text-neutral-500 dark:text-gray-300 mb-1 sm:mb-2 font-outfit">
              {eyebrow}
            </p>

            <div className="flex items-center">
              <h2 className="font-outfit font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-neutral-900 dark:text-white">
                {headingA}
              </h2>

              <h2 className="work-text ml-1.5 sm:ml-2 md:ml-3 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
                {headingB}
              </h2>
            </div>
          </div>
        </div>

        {/* =========================
            PROJECT SHOWCASE
        ========================== */}

        <div
          className="flex flex-col w-full lg:max-w-[1488.8px]"
          style={{
            margin: 0,
            border: 0,
            padding: 0,
            position: "relative",
          }}
        >
          <div
            className="flex flex-col lg:flex-row w-full relative"
            style={{
              gap: "clamp(2rem, 5vw, 4rem)",
              margin: 0,
              border: 0,
              padding: 0,
              position: "relative",
            }}
          >
            {/* =========================
                LEFT STICKY PANEL
            ========================== */}

            <div
              id="left-box-container"
              className="hidden lg:block lg:w-[40%] xl:w-[35%] lg:min-w-[340px] relative lg:self-stretch"
            >
              <div
                id="sticky-box"
                className="z-20 w-full relative flex self-start lg:sticky lg:top-36 lg:h-[400px]"
                style={{
                  height: "min(400px, calc(100vh - 4rem))",
                  minHeight: "320px",
                }}
              >
                {/* Progress line */}

                <div className="absolute -right-6 top-0 h-full w-8 z-10">
                  <div className="relative h-full w-full">
                    <div className="absolute top-0 bottom-0 left-1/2 w-1.5 -translate-x-1/2 rounded-full bg-neutral-200 dark:bg-neutral-800 shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)] dark:shadow-[inset_0_2px_1.5px_rgba(165,174,184,0.62)]">
                      <div
                        ref={progressFillRef}
                        className="absolute inset-0 w-full origin-top rounded-full bg-gradient-to-t from-orange-600 from-[0%] via-yellow-500 via-[10%] to-transparent"
                        style={{
                          opacity: 0,
                          transform: "scaleY(0)",
                        }}
                      />
                    </div>

                    <div
                      ref={progressMarkerRef}
                      className="absolute -right-0.5 z-10 flex"
                      style={{
                        height: "36px",
                        top: "0%",
                        transform: "translateY(-50%)",
                      }}
                    >
                      <div className="relative h-9 w-9 overflow-hidden rounded-full border-2 border-white dark:border-neutral-900 bg-white dark:bg-neutral-900 shadow-md">
                        <Image
                          src="/images/avatar.jpg"
                          alt="Profile"
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* 
                  Case study link disabled.
                  Sticky panel now only shows project information.
                */}

                <StickyInfoPanel
                  project={activeProject}
                  showCaseStudyLink={false}
                />
              </div>
            </div>

            {/* =========================
                RIGHT PROJECT CARDS
            ========================== */}

            <div className="right-container flex flex-col gap-8 sm:gap-10 lg:gap-y-24 w-full lg:flex-1 lg:min-w-0">
              {items.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          </div>

          {/* =========================
              SEE ALL PROJECTS
          ========================== */}

          <div className="flex justify-center pt-10 sm:pt-12 lg:pt-16">
            <a
              href="https://github.com/A-verse"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 px-6 py-3 text-sm sm:text-base font-medium text-neutral-900 dark:text-white transition-all duration-300 hover:-translate-y-1 hover:border-neutral-500 dark:hover:border-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
            >
              <span>See all projects</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
