import { Navbar } from "@/components/aube/navbar"
import { Hero } from "@/components/aube/hero"
import { Solutions } from "@/components/aube/solutions"
import { About } from "@/components/aube/about"
import { Contact } from "@/components/aube/contact"
import { Footer } from "@/components/aube/footer"
import { ConstellationCanvas } from "@/components/aube/constellation-canvas"

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ConstellationCanvas />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Solutions />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
