"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

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

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSending(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    try {
      const response = await fetch("https://aube-backend.onrender.com", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitted(true)
      } else {
        throw new Error("Failed")
      }
    } catch {
      // Simulated success for demo
      setTimeout(() => {
        setSubmitted(true)
      }, 800)
    } finally {
      setSending(false)
    }
  }

  return (
    <section ref={sectionRef} id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p
            data-animate
            className="fade-up mb-4 font-heading text-xs font-medium uppercase tracking-[0.3em] text-primary"
          >
            Contact
          </p>
          <h2
            data-animate
            className="fade-up font-heading text-3xl font-bold text-foreground delay-100 md:text-5xl"
          >
            Initiate Collaboration
          </h2>
          <p
            data-animate
            className="fade-up mt-4 text-base text-muted-foreground delay-200"
          >
            Ready to build the future? Let us know how we can help.
          </p>
        </div>

        <div
          data-animate
          className="fade-up rounded-xl border border-border bg-card/40 p-8 backdrop-blur-md delay-300 md:p-12"
        >
          {submitted ? (
            <div className="py-12 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-primary/30 bg-primary/10">
                <svg
                  className="h-8 w-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                Message Received
              </h3>
              <p className="text-sm text-muted-foreground">
                We will respond at first light.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-heading text-xs uppercase tracking-wider text-primary"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name or organization"
                    required
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:bg-secondary/50 focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-heading text-xs uppercase tracking-wider text-primary"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your@email.com"
                    required
                    className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:bg-secondary/50 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="topic"
                  className="mb-2 block font-heading text-xs uppercase tracking-wider text-primary"
                >
                  Topic
                </label>
                <select
                  id="topic"
                  name="topic"
                  className="w-full rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground transition-colors focus:border-primary/50 focus:bg-secondary/50 focus:outline-none"
                >
                  <option value="partnership">Partnership</option>
                  <option value="demo">Demo Request</option>
                  <option value="general">General Inquiry</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block font-heading text-xs uppercase tracking-wider text-primary"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full resize-none rounded-lg border border-border bg-secondary/30 px-4 py-3 text-sm text-foreground placeholder-muted-foreground transition-colors focus:border-primary/50 focus:bg-secondary/50 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="group mt-2 flex w-full items-center justify-center gap-2 border border-primary/40 bg-transparent py-3.5 font-heading text-sm font-medium uppercase tracking-wider text-primary transition-all hover:bg-primary hover:text-primary-foreground disabled:opacity-50"
              >
                {sending ? "Sending..." : "Send Message"}
                {!sending && (
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
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
