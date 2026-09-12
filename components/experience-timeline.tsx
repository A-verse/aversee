"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const timeline = [
  {
    period: "MAY 2026 – PRESENT",
    org: "SNehra Solutions",
    location: "Remote",
    role: "Full Stack Developer",
    heading: "Building a Full-Stack Placement Platform",
    body: [
      "Built and deployed snehrasolutions.com, a full-stack placement consultancy platform featuring cohort enrollment, application workflows, authentication, and a pricing system with Razorpay payment integration.",
      "Designed and implemented a RESTful backend using Express.js with Prisma ORM over PostgreSQL, structuring relational schemas for users, cohorts, applications, and payment records.",
      "Architected the frontend with TanStack Router and Vite for fast client-side navigation, code splitting, and optimized bundle delivery across the platform.",
    ],
    tags: [
      "TanStack Router",
      "Express.js",
      "Vite",
      "Prisma",
      "PostgreSQL",
      "Razorpay",
      "TypeScript",
    ],
  },

  {
    period: "2026",
    org: "FABRO",
    location: "Self-directed",
    role: "Full Stack Developer",
    heading: "Building a Full-Stack E-Commerce Platform",
    body: [
      "Developed a production-ready full-stack e-commerce platform featuring authentication, cart management, order workflows, and role-based access control across frontend and backend systems.",
      "Designed and integrated modular REST APIs using Node.js and MongoDB, optimizing schema structures, query performance, and scalable backend data flow.",
      "Implemented Docker containerization and automated CI/CD pipelines using GitHub Actions for reliable testing, deployment automation, and production consistency.",
    ],
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "TypeScript",
      "Docker",
      "GitHub Actions",
    ],
  },

  {
    period: "2025",
    org: "Luxoree",
    location: "Self-directed",
    role: "Backend Developer",
    heading: "Crafting a Luxury Digital Experience",
    body: [
      "Designed and developed a luxury fragrance shopping experience with responsive interfaces, modern UI interactions, and reusable components across the application.",
      "Focused on creating a seamless product browsing experience across devices while maintaining a clean, consistent, and maintainable frontend architecture.",
    ],
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },

  {
    period: "JUN 2025 – AUG 2025",
    org: "Jaipur Metro Rail Corporation (JMRC)",
    location: "Jaipur, India",
    role: "Technical Intern",
    heading: "Building for a Real-World Transit System",
    body: [
      "Developed scalable full-stack modules for a metro services platform using the MERN stack, designing secure REST APIs and optimizing MongoDB schemas for reliability and performance.",
      "Collaborated in Agile sprint cycles, participating in code reviews, debugging, integration testing, and accelerated production feature delivery across frontend and backend systems.",
      "Improved frontend responsiveness using reusable component structures, optimized API communication workflows, and modular service-based architecture.",
    ],
    tags: [
      "MongoDB",
      "Express.js",
      "React.js",
      "Node.js",
      "REST APIs",
      "Tailwind CSS",
    ],
  },

  {
    period: "AUG 2024 – JUN 2025",
    org: "Astronomy & Physics Society, IIITDM Jabalpur",
    location: "Jabalpur, India",
    role: "Web Developer",
    heading: "Engineering for a 1,500+ User Community",
    body: [
      "Built and maintained a responsive web platform for 1,500+ users featuring event systems, technical resources, and engagement workflows.",
      "Developed reusable frontend components using Next.js and TypeScript, improving maintainability, rendering performance, accessibility, and frontend consistency.",
      "Integrated AI-assisted workflows and optimized frontend architecture for smoother navigation, better scalability, and faster load times.",
    ],
    tags: ["Next.js", "TypeScript", "Gemini API", "Shadcn/ui", "Tailwind CSS"],
  },

  {
    period: "MAY 2024 – AUG 2024",
    org: "GirlScript Summer of Code (GSSoC '24)",
    location: "Remote",
    role: "Open Source Contributor",
    heading: "Contributing Beyond Personal Projects",
    body: [
      "Selected among 20,000+ applicants for GirlScript Summer of Code and contributed to open-source projects through collaborative GitHub workflows.",
      "Worked with contributors and maintainers through issues, pull requests, code reviews, and collaborative software development.",
    ],
    tags: [
      "Open Source",
      "Git",
      "GitHub",
      "React",
      "TypeScript",
      "Code Review",
    ],
  },
];

export function ExperienceTimeline() {
  const rowsRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLDivElement>(null);
  const markerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rows = rowsRef.current;
    if (!rows || !fillRef.current || !markerRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set(fillRef.current, { scaleY: 0, transformOrigin: "top" });

      ScrollTrigger.create({
        trigger: rows,
        start: "top center",
        end: "bottom center",
        scrub: 0.5,
        onUpdate: (self) => {
          gsap.set(fillRef.current, { scaleY: self.progress });
          gsap.set(markerRef.current, { top: `${self.progress * 100}%` });
        },
      });
    }, rows);

    return () => ctx.revert();
  }, []);

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
            <Image
              src="/images/avatar.jpg"
              alt=""
              fill
              sizes="36px"
              className="object-cover"
            />
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
              {entry.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
              <div className="exp-row-tags">
                {entry.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
