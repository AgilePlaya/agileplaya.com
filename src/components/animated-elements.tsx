'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface AnimatedHeadingProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

interface AnimatedTextProps {
  children: React.ReactNode
  className?: string
  delay?: number
}

export function AnimatedHeading({
  children,
  className = '',
  delay = 0,
}: AnimatedHeadingProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.8,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedText({
  children,
  className = '',
  delay = 0,
}: AnimatedTextProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-100px' }}
    >
      {children}
    </motion.div>
  )
}

interface AnimatedButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  href?: string
  delay?: number
  as?: 'button' | 'a'
}

export function AnimatedButton({
  children,
  className = '',
  onClick,
  href,
  delay = 0,
  as = 'button',
}: AnimatedButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut',
      }}
      viewport={{ once: true, margin: '-100px' }}
      whileHover={{
        scale: 1.05,
      }}
      whileTap={{
        scale: 0.95,
      }}
    >
      {as === 'a' ? (
        <a
          href={href}
          className={className}
          onClick={onClick}
        >
          {children}
        </a>
      ) : (
        <button
          className={className}
          onClick={onClick}
        >
          {children}
        </button>
      )}
    </motion.div>
  )
}
