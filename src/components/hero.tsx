'use client'

import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'
import { AnimatedHeading, AnimatedText, AnimatedButton } from './animated-elements'

export function Hero() {
  return (
    <section className="min-h-screen flex items-center justify-center pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800/30 dark:to-slate-900">
      <div className="max-w-4xl mx-auto text-center">
        <AnimatedHeading className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white mb-6">
          Full-Stack Developer &{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            Creative Builder
          </span>
        </AnimatedHeading>

        <AnimatedText className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed" delay={0.2}>
          I craft beautiful, performant web experiences with modern technologies.
          Specializing in React, Node.js, and cloud-native solutions.
        </AnimatedText>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <AnimatedButton
            as="a"
            href="#projects"
            className="px-8 py-3 glass border border-primary/50 hover:border-primary text-primary dark:text-indigo-400 rounded-lg font-semibold transition-all hover:shadow-lg"
            delay={0.4}
          >
            View My Work
          </AnimatedButton>
          <AnimatedButton
            as="a"
            href="#contact"
            className="px-8 py-3 glass border border-primary/50 hover:border-primary text-primary dark:text-indigo-400 rounded-lg font-semibold transition-all hover:shadow-lg"
            delay={0.6}
          >
            Get In Touch
          </AnimatedButton>
        </div>

        <motion.div
          className="mt-16 flex justify-center"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <a href="#about" className="text-primary dark:text-indigo-400">
            <ArrowDown className="w-8 h-8" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
