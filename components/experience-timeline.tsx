'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    period: 'AUG 2025 – PRESENT',
    org: 'IIITDM Jabalpur',
    location: 'Jabalpur, India',
    role: 'Final-Year Student · Full Stack Dev',
    heading: 'Final Year, Placement Season',
    body: [
      'Deep in SDE / Full Stack / Data Engineering placement prep — sharpening DSA fundamentals through the Apna College SDE Sheet and revisiting CS core (DBMS, OS, CN, OOP) alongside coursework.',
      'Exploring RAG pipelines, LangChain, and agentic AI systems on the side, driven by real interview-prep needs rather than just curiosity.',
    ],
    tags: ['DSA', 'System Design Basics', 'RAG + LangChain', 'Interview Prep'],
  },
  {
    period: '2025',
    org: 'SNehra Solutions',
    location: 'Remote',
    role: 'Full Stack Development Intern',
    heading: 'First Real Production Codebase',
    body: [
      'Built and shipped features on a React + Prisma stack, working inside an existing production codebase instead of a greenfield project — a different kind of hard.',
      'Learned what "done" actually means in a team: PR reviews, shared conventions, and shipping without breaking things for other people.',
    ],
    tags: ['React', 'Prisma', 'Code Review', 'Team Workflow'],
  },
  {
    period: '2024 – 2025',
    org: 'Personal Projects',
    location: 'Self-directed',
    role: 'Builder',
    heading: 'Learning by Shipping',
    body: [
      'Built NeuroSpeak, an assistive communication platform (React, Supabase, PostgreSQL), FABRO, a full-stack fashion e-commerce store, and JMRC Connect, a metro commuter experience concept.',
      'Each project was chosen to force a new skill — real-time data, payment-adjacent flows, and REST API design — rather than repeating what I already knew.',
    ],
    tags: ['React', 'Supabase', 'PostgreSQL', 'REST APIs'],
  },
]

export function ExperienceTimeline() {
  const rowsRef = useRef<HTMLDivElement>(null)
  const fillRef = useRef<HTMLDivElement>(null)
  const markerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const rows = rowsRef.current
    if (!rows || !fillRef.current || !markerRef.current) return

    const ctx = gsap.context(() => {
      gsap.set(fillRef.current, { scaleY: 0, transformOrigin: 'top' })

      ScrollTrigger.create({
        trigger: rows,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleY: self.progress })
          gsap.set(markerRef.current, { top: `${self.progress * 100}%` })
        },
      })
    }, rows)

    return () => ctx.revert()
  }, [])

  return (
    <section className="exp-timeline">
      <p className="eyebrow">THE EXPERIENCE</p>
      <h2 className="exp-timeline-title">
        Experience That <em>Shapes the Craft</em>
      </h2>
      <div className="exp-rows" ref={rowsRef}>
        <div className="exp-rail-track">
          <div ref={fillRef} className="exp-rail-fill" />
          <div ref={markerRef} className="exp-rail-marker">
            <Image src="/images/avatar.jpg" alt="" fill sizes="36px" className="object-cover" />
          </div>
        </div>
        {timeline.map((entry) => (
          <div key={entry.org} className="exp-row">
            <div className="exp-row-meta">
              <small>{entry.period}</small>
              <strong>{entry.org}</strong>
              <span>{entry.location}</span>
              <span>{entry.role}</span>
            </div>
            <div className="exp-row-body">
              <h3>{entry.heading}</h3>
              {entry.body.map((p, i) => <p key={i}>{p}</p>)}
              <div className="exp-row-tags">
                {entry.tags.map((tag) => <span key={tag}>{tag}</span>)}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
