"use client"

import { useEffect, useRef } from "react"

interface ConfettiPiece {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  rotationSpeed: number
  size: number
  color: string
}

const COLORS = ["#ff6b35", "#4ecdc4", "#6bcf7f", "#ffd93d", "#ff6b9d"]

export function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const pieces: ConfettiPiece[] = []

    // Create confetti pieces
    for (let i = 0; i < 50; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: -10,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 5 + 4,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.2,
        size: Math.random() * 6 + 4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      })
    }

    let animationFrameId: number
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      pieces.forEach((piece, index) => {
        piece.x += piece.vx
        piece.y += piece.vy
        piece.vy += 0.1 // gravity
        piece.rotation += piece.rotationSpeed

        ctx.save()
        ctx.translate(piece.x, piece.y)
        ctx.rotate(piece.rotation)

        ctx.fillStyle = piece.color
        ctx.fillRect(-piece.size / 2, -piece.size / 2, piece.size, piece.size)

        ctx.restore()

        if (piece.y > canvas.height) {
          pieces.splice(index, 1)
        }
      })

      if (pieces.length > 0) {
        animationFrameId = requestAnimationFrame(animate)
      }
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 50 }} />
}
