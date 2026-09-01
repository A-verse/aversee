'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Wraps a stack of `.photo-card` elements and adds a subtle scroll-linked
 * parallax: cards drift apart and tilt further as the section scrolls
 * through the viewport, then settle back — mirrors the tilted photo-stack
 * behaviour on parthh.in's "quick glance" section.
 */
export function PhotoTilt({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    const cards = Array.from(el.querySelectorAll<HTMLElement>('.photo-card'))
    if (cards.length === 0) return

    const ctx = gsap.context(() => {
      cards.forEach((card, i) => {
        const drift = i % 2 === 0 ? -22 : 22
        const spin = i % 2 === 0 ? -7 : 7
        gsap.to(card, {
          y: drift,
          rotation: `+=${spin}`,
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.1,
          },
        })
      })
    }, el)

    // Gentle mouse-parallax on desktop for a bit of life even without scrolling
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      const px = (e.clientX - rect.left) / rect.width - 0.5
      cards.forEach((card, i) => {
        gsap.to(card, {
          x: px * (10 + i * 4),
          duration: 0.6,
          ease: 'power2.out',
          overwrite: 'auto',
        })
      })
    }
    el.addEventListener('mousemove', onMove)

    return () => {
      ctx.revert()
      el.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
