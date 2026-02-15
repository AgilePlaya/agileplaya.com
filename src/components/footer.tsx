'use client'

import { motion } from 'framer-motion'
import { AnimatedHeading, AnimatedText } from './animated-elements'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="glass text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center"
        >
          <AnimatedHeading className="text-2xl font-bold mb-4 text-white">
            Let&apos;s Create Something Amazing
          </AnimatedHeading>
          <AnimatedText className="text-gray-300 mb-8">
            I&apos;m always interested in hearing about new projects and opportunities.
          </AnimatedText>

          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-slate-900 rounded-lg font-semibold transition-colors mb-12"
          >
            Get In Touch
          </motion.a>

          <div className="border-t border-white/20 pt-8 text-gray-300 text-sm">
            <p>
              © {currentYear} Your Name. All rights reserved. Built with Next.js, Framer Motion, and Tailwind CSS.
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
