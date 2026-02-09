"use client"

import { useEffect, useRef } from "react"

export function Hero() {
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
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      <div className="mx-auto max-w-4xl">
        <p
          data-animate
          className="fade-up mb-6 font-heading text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
        >
          AI Company
        </p>
        <h1
          data-animate
          className="fade-up font-heading text-5xl font-bold leading-[1.05] tracking-tight text-foreground delay-100 md:text-7xl lg:text-8xl"
        >
          Architecting the
          <br />
          <span className="bg-gradient-to-r from-primary to-foreground bg-clip-text text-transparent">
            Dawn
          </span>{" "}
          of Intelligence
        </h1>
        <p
          data-animate
          className="fade-up mx-auto mt-8 max-w-xl text-base leading-relaxed text-muted-foreground delay-200 md:text-lg"
        >
          We translate complex data into elegant human experiences.
        </p>
        <div
          data-animate
          className="fade-up mt-10 flex flex-col items-center justify-center gap-4 delay-300 sm:flex-row"
        >
          <a
            href="#solutions"
            className="group inline-flex items-center gap-2 border border-primary/40 bg-transparent px-8 py-3.5 font-heading text-sm font-medium uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Explore Ecosystem
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-3.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Get in touch
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Scroll
          </span>
          <div className="relative h-12 w-px overflow-hidden bg-border">
            <div className="animate-scroll-line absolute inset-x-0 h-full bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
