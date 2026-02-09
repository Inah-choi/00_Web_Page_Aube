"use client"

import { useEffect, useRef } from "react"

const solutions = [
  {
    name: "Nuptia AI",
    description:
      "The world's first algorithmic event planner. Predictive modeling for seamless matrimonial experiences.",
    tag: "B2C / Lifestyle",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
        />
      </svg>
    ),
  },
  {
    name: "Aube Studio",
    description:
      "Generative video synthesis for creators. Turn raw text into cinematic narratives via our rendering engine.",
    tag: "SaaS / Creative",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
        />
      </svg>
    ),
  },
  {
    name: "GeoFlux",
    description:
      "Live geospatial intelligence. Real-time mapping interface for urban planning and logistics optimization.",
    tag: "Enterprise / Data",
    icon: (
      <svg
        className="h-6 w-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418"
        />
      </svg>
    ),
  },
]

export function Solutions() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in")
          }
        })
      },
      { threshold: 0.1 }
    )

    const elements = section.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="solutions" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <p
            data-animate
            className="fade-up mb-4 font-heading text-xs font-medium uppercase tracking-[0.3em] text-primary"
          >
            Ecosystem
          </p>
          <h2
            data-animate
            className="fade-up font-heading text-3xl font-bold text-foreground delay-100 md:text-5xl"
          >
            Our Solutions
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {solutions.map((solution, i) => (
            <div
              key={solution.name}
              data-animate
              className={`fade-up group relative overflow-hidden rounded-xl border border-border bg-card/40 p-8 backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-primary/30 hover:shadow-[0_20px_60px_-15px_rgba(212,175,55,0.1)] delay-${(i + 1) * 100}`}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              <div className="relative">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-border bg-secondary/50 text-primary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  {solution.icon}
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-foreground">
                  {solution.name}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {solution.description}
                </p>
                <span className="inline-block rounded-full border border-primary/20 px-3 py-1 text-[11px] uppercase tracking-wider text-primary">
                  {solution.tag}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
