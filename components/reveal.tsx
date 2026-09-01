'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wrap any section in <Reveal>. Any direct child (or nested element) marked
 * with data-reveal="1" fades + rises into view as it enters the viewport,
 * staggered in document order. Mirrors the per-section reveal pattern used
 * across parthh.in.
 */
export function Reveal({
  children,
  className,
  stagger = 0.08,
  y = 24,
  as: Tag = 'div',
}: {
  children: React.ReactNode
  className?: string
  stagger?: number
  y?: number
  as?: 'div' | 'section' | 'article' | 'ul'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const targets = el.querySelectorAll('[data-reveal]')
    if (targets.length === 0) return

    if (prefersReducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    const ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(targets, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            stagger,
          })
        },
      })
    }, el)

    return () => ctx.revert()
  }, [stagger, y])

  return (
    <Tag ref={ref as never} className={className}>
      {children}
    </Tag>
  )
}
