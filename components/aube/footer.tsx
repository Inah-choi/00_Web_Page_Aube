export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex items-center gap-6">
          <span className="font-heading text-sm font-bold tracking-[0.15em] text-foreground">
            AUBE
          </span>
          <span className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Aube Technologies
          </span>
        </div>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            GitHub
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            LinkedIn
          </a>
          <a
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </a>
        </div>
      </div>
    </footer>
  )
}
