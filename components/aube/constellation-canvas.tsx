"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
}

export function ConstellationCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef<{ x: number | null; y: number | null }>({
    x: null,
    y: null,
  })
  const particlesRef = useRef<Particle[]>([])
  const animFrameRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particleCount = 80
    const connectionDistance = 140
    const mouseDistance = 180

    function resize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    function initParticles() {
      if (!canvas) return
      particlesRef.current = []
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size: Math.random() * 1.5 + 0.5,
        })
      }
    }

    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const particles = particlesRef.current
      const mouse = mouseRef.current

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0 || p.x > canvas.width) p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1

        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x
          const dy = mouse.y - p.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < mouseDistance) {
            const force = (mouseDistance - distance) / mouseDistance
            p.x += (dx / distance) * force * 0.5
            p.y += (dy / distance) * force * 0.5
          }
        }

        ctx.fillStyle = "rgba(197, 198, 199, 0.6)"
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()

        for (let j = i + 1; j < particles.length; j++) {
          const dx = p.x - particles[j].x
          const dy = p.y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)
          if (distance < connectionDistance) {
            const opacity = 1 - distance / connectionDistance
            ctx.beginPath()
            ctx.strokeStyle = `rgba(212, 175, 55, ${opacity * 0.12})`
            ctx.lineWidth = 1
            ctx.moveTo(p.x, p.y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(animate)
    }

    function handleMouseMove(e: MouseEvent) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function handleMouseLeave() {
      mouseRef.current = { x: null, y: null }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("resize", resize)
    resize()
    animate()

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        background:
          "radial-gradient(ellipse at 50% 100%, hsl(220 15% 10%) 0%, hsl(220 15% 5%) 70%)",
      }}
      aria-hidden="true"
    />
  )
}
