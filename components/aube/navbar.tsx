"use client"

import { useState, useEffect } from "react"

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <a
          href="#"
          className="font-heading text-xl font-bold tracking-[0.15em] text-foreground"
        >
          AUBE
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 md:flex">
          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Philosophy
          </a>
          <a
            href="#solutions"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Ecosystem
          </a>
          <a
            href="#contact"
            className="border border-primary/40 bg-transparent px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Contact
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-foreground transition-all duration-300 ${
              mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`overflow-hidden border-b border-border bg-background/95 backdrop-blur-xl transition-all duration-500 md:hidden ${
          mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0 border-b-0"
        }`}
      >
        <div className="flex flex-col gap-4 px-6 pb-6">
          <a
            href="#about"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Philosophy
          </a>
          <a
            href="#solutions"
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Ecosystem
          </a>
          <a
            href="#contact"
            className="w-fit border border-primary/40 bg-transparent px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            onClick={() => setMobileOpen(false)}
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  )
}
