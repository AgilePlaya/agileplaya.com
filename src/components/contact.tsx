'use client'

import { motion } from 'framer-motion'
import { Mail, Github, Linkedin, Twitter } from 'lucide-react'
import { useState } from 'react'
import { AnimatedHeading, AnimatedText } from './animated-elements'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    console.log('Form submitted:', formData)
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', message: '' })
    }, 3000)
  }

  const socialLinks = [
    { icon: Mail, label: 'Email', href: 'mailto:hello@example.com' },
    { icon: Github, label: 'GitHub', href: 'https://github.com' },
    { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
    { icon: Twitter, label: 'Twitter', href: 'https://twitter.com' },
  ]

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeading className="text-4xl font-bold mb-4 text-slate-900 dark:text-white text-center">
          Let&apos;s <span className="text-primary dark:text-indigo-400">Connect</span>
        </AnimatedHeading>
        <AnimatedText className="text-center text-gray-600 dark:text-gray-400 mb-12 text-lg">
          Have a project in mind? Let&apos;s talk about it!
        </AnimatedText>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="glass rounded-lg p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 glass border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-indigo-400 text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 glass border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-indigo-400 text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-slate-900 dark:text-white mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-2 glass border-slate-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-indigo-400 text-slate-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="Tell me about your project..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full px-6 py-3 border-2 border-primary dark:border-indigo-400 text-primary dark:text-indigo-400 rounded-lg font-semibold transition-colors hover:bg-primary hover:text-white dark:hover:bg-indigo-400 dark:hover:text-slate-900"
              >
                {isSubmitted ? 'Message Sent! ✓' : 'Send Message'}
              </motion.button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: '-100px' }}
            className="flex flex-col justify-center space-y-8 glass rounded-lg p-8"
          >
            <div>
              <AnimatedText className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Connect with me on social media
              </AnimatedText>

              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map(({ icon: Icon, label, href }) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="flex items-center gap-3 p-4 glass rounded-lg border border-slate-400 hover:shadow-lg transition-shadow"
                  >
                    <Icon className="w-6 h-6 text-primary dark:text-indigo-400" />
                    <span className="font-semibold text-slate-900 dark:text-white">{label}</span>
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-400">
              <AnimatedText className="text-gray-600 dark:text-gray-400 mb-4">
                <strong>Email:</strong> hello@example.com
              </AnimatedText>
              <AnimatedText className="text-gray-600 dark:text-gray-400">
                <strong>Based in:</strong> San Francisco, CA
              </AnimatedText>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
