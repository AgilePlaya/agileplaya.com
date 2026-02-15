'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/lib/theme-context'

interface CursorPosition {
  x: number
  y: number
}

interface NearbyButton {
  x: number
  y: number
  radius: number
}

export function CustomCursor() {
  const { theme } = useTheme()
  const [position, setPosition] = useState<CursorPosition>({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)
  const [targetButton, setTargetButton] = useState<NearbyButton | null>(null)
  const [circleRadius, setCircleRadius] = useState(15)
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const DETECTION_RADIUS = 80
    const BASE_RADIUS = 15
    const SNAP_RADIUS = 30

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX
      const y = e.clientY
      setPosition({ x, y })
      setIsVisible(true)

      // Find nearby buttons
      const buttons = document.querySelectorAll('a, button, [role="button"]')
      let nearest: NearbyButton | null = null
      let minDistance = DETECTION_RADIUS

      buttons.forEach((btn) => {
        const rect = btn.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dist = Math.sqrt((x - cx) ** 2 + (y - cy) ** 2)

        if (dist < minDistance) {
          minDistance = dist
          nearest = {
            x: cx,
            y: cy,
            radius: Math.max(rect.width, rect.height) / 2 + 10,
          }
        }
      })

      setTargetButton(nearest)

      if (nearest) {
        const button: NearbyButton = nearest
        const dist = Math.sqrt((x - button.x) ** 2 + (y - button.y) ** 2)
        if (dist < SNAP_RADIUS) {
          setCircleRadius(button.radius)
        } else {
          setCircleRadius(Math.max(BASE_RADIUS, BASE_RADIUS + (SNAP_RADIUS - dist) * 2))
        }
      } else {
        setCircleRadius(BASE_RADIUS)
      }
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseenter', () => setIsVisible(true))

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseenter', () => setIsVisible(true))
    }
  }, [])

  if (!isVisible) return null

  const circleColor = theme === 'dark' ? '#ffffff' : '#000000'
  const circleOpacity = targetButton ? 0.8 : 0.3
  const offsetX = targetButton ? 0 : 0
  const offsetY = targetButton ? 0 : 0

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed z-50"
      style={{
        left: targetButton ? targetButton.x : position.x,
        top: targetButton ? targetButton.y : position.y,
      }}
      animate={{
        width: circleRadius * 2,
        height: circleRadius * 2,
        marginLeft: -circleRadius,
        marginTop: -circleRadius,
      }}
      transition={{
        type: 'spring',
        damping: targetButton ? 10 : 20,
        stiffness: targetButton ? 200 : 100,
        mass: 0.8,
      }}
    >
      {/* Water drop circle */}
      <svg
        className="w-full h-full"
        viewBox="0 0 100 100"
        style={{
          filter: `drop-shadow(0 4px 12px ${circleColor}20)`,
        }}
      >
        <defs>
          {/* Main radial gradient - water drop effect with light reflection */}
          <radialGradient id="waterDropGradient" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor={circleColor} stopOpacity={circleOpacity + 0.35} />
            <stop offset="40%" stopColor={circleColor} stopOpacity={circleOpacity + 0.15} />
            <stop offset="100%" stopColor={circleColor} stopOpacity={circleOpacity * 0.4} />
          </radialGradient>

          {/* Inner highlight - light reflection at top-left */}
          <radialGradient id="highlight" cx="30%" cy="30%" r="40%">
            <stop offset="0%" stopColor={circleColor} stopOpacity={circleOpacity + 0.5} />
            <stop offset="100%" stopColor={circleColor} stopOpacity="0" />
          </radialGradient>

          {/* Outer glow - soft edge fade */}
          <radialGradient id="glowEdge" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor={circleColor} stopOpacity={circleOpacity} />
            <stop offset="100%" stopColor={circleColor} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer glow layer */}
        <circle cx="50" cy="50" r="48" fill="url(#glowEdge)" />

        {/* Main water drop circle */}
        <circle cx="50" cy="50" r="45" fill="url(#waterDropGradient)" />

        {/* Light reflection highlight */}
        <circle cx="50" cy="50" r="45" fill="url(#highlight)" />

        {/* Subtle rim for definition */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          stroke={circleColor}
          strokeWidth="0.8"
          strokeOpacity={circleOpacity * 0.3}
        />
      </svg>

      {/* Cursor offset indicator */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: '4px',
          height: '4px',
          backgroundColor: circleColor,
          borderRadius: '50%',
          left: `calc(50% + ${offsetX}px)`,
          top: `calc(50% + ${offsetY}px)`,
          opacity: targetButton ? 0 : 1,
          transition: 'opacity 0.3s ease',
        }}
      />
    </motion.div>
  )
}
