"use client"

import { useEffect, useRef } from "react"

export function About() {
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
      { threshold: 0.15 }
    )

    const elements = section.querySelectorAll("[data-animate]")
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative px-6 py-32"
    >
      <div className="mx-auto max-w-6xl">
        <div className="grid items-start gap-16 md:grid-cols-2">
          {/* Left: Label + Heading */}
          <div>
            <p
              data-animate
              className="fade-up mb-4 font-heading text-xs font-medium uppercase tracking-[0.3em] text-primary"
            >
              Philosophy
            </p>
            <h2
              data-animate
              className="fade-up font-heading text-3xl font-bold leading-tight text-foreground delay-100 md:text-5xl"
            >
              Intelligence
              <br />
              designed for
              <br />
              <span className="text-muted-foreground">humans</span>
            </h2>
          </div>

          {/* Right: Description */}
          <div className="flex flex-col gap-6 md:pt-12">
            <p
              data-animate
              className="fade-up text-base leading-relaxed text-muted-foreground delay-200"
            >
              Aube, meaning &quot;dawn&quot; in French, represents our belief that
              artificial intelligence should illuminate, not obscure. We build
              systems that amplify human capability while preserving the nuance
              and warmth of human experience.
            </p>
            <p
              data-animate
              className="fade-up text-base leading-relaxed text-muted-foreground delay-300"
            >
              Our ecosystem spans from personal life moments to enterprise-scale
              intelligence, each product united by a singular design principle:
              technology should feel effortless.
            </p>
            <div
              data-animate
              className="fade-up mt-4 grid grid-cols-3 gap-8 delay-400"
            >
              <div>
                <p className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  3
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Products
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  AI
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  First
                </p>
              </div>
              <div>
                <p className="font-heading text-2xl font-bold text-foreground md:text-3xl">
                  B2C+B2B
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
                  Markets
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
