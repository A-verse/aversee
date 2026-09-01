'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import type { Project } from './projects-data'
import { SparkleIcon } from './sparkle-icon'

export function StickyInfoPanel({ project, showCaseStudyLink = true }: { project: Project; showCaseStudyLink?: boolean }) {
  const contentRef = useRef<HTMLDivElement>(null)

  // Animate content in whenever the active project changes
  useEffect(() => {
    const el = contentRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll('.panel-title, .panel-desc'),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.08 },
      )
      gsap.fromTo(
        el.querySelectorAll('.panel-feature'),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.12, delay: 0.15 },
      )
      gsap.fromTo(
        el.querySelectorAll('.panel-tech'),
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', stagger: 0.05, delay: 0.35 },
      )
    }, el)
    return () => ctx.revert()
  }, [project.id])

  return (
    <div className="flex-1 w-full">
      <div className="flex w-full h-auto lg:h-full relative" style={{ paddingRight: '20px' }}>
        <div
          className={`my-4 mr-4 rounded-full flex-shrink-0 ${project.accent.dash}`}
          style={{ width: '24px', height: '4px' }}
        />
        <div ref={contentRef} key={project.id} className="flex flex-col items-start w-full">
          <h3 className="panel-title text-2xl lg:text-3xl font-bold text-neutral-900 dark:text-white font-outfit leading-tight">
            {project.title}
          </h3>
          <p className="panel-desc my-3 text-sm lg:text-base font-light text-neutral-600 dark:text-gray-300 font-outfit leading-relaxed max-w-prose">
            {project.description}
          </p>
          <ul className="mt-2 lg:mt-4 flex flex-col gap-y-2 text-sm lg:text-base text-neutral-600 dark:text-gray-200/85">
            {project.features.map((feature) => (
              <li key={feature} className="panel-feature flex items-start text-sm font-outfit">
                <SparkleIcon
                  className={`mt-0.5 mr-2 size-4 lg:size-5 shrink-0 rounded-full lg:bg-white lg:dark:bg-black ${project.accent.fill} ${project.accent.text} ${project.accent.bg}`}
                />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 lg:mt-8 flex flex-wrap gap-2 lg:gap-3 text-xs lg:text-sm">
            {project.tech.map((t) => (
              <div
                key={t.name}
                className="panel-tech flex items-center gap-1.5 lg:gap-2 rounded-xl border border-black/10 dark:border-white/[0.14] dark:border-t-white/[0.25] bg-neutral-100 dark:bg-[#111111] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.05),0_1px_2px_rgba(0,0,0,0.4)] px-2.5 py-1 lg:px-3 lg:py-1 font-outfit text-neutral-700 dark:text-neutral-300 transition-colors"
              >
                <Image
                  src={t.icon || '/placeholder.svg'}
                  alt={t.name}
                  width={16}
                  height={16}
                  className="h-3.5 w-3.5 lg:h-4 lg:w-4 object-contain"
                />
                {t.name}
              </div>
            ))}
          </div>
          {showCaseStudyLink && (
            <Link href={`/projects/${project.id}`} className="panel-tech mt-6 lg:mt-8 inline-flex items-center gap-2 text-sm font-outfit text-neutral-900 dark:text-white underline underline-offset-4 decoration-neutral-400 dark:decoration-neutral-600 hover:decoration-current">
              View case study →
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
