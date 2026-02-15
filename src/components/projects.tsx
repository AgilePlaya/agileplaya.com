'use client'

import { motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import { AnimatedHeading, AnimatedText } from './animated-elements'

interface Project {
  id: number
  title: string
  description: string
  tags: string[]
  link?: string
  github?: string
}

const projects: Project[] = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with real-time inventory, payment processing, and admin dashboard.',
    tags: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management tool with real-time updates using WebSockets and React Query.',
    tags: ['React', 'Node.js', 'socket.io', 'MongoDB'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 3,
    title: 'AI Chat Application',
    description: 'Real-time chat application powered by OpenAI API with streaming responses and conversation history.',
    tags: ['Next.js', 'OpenAI API', 'Prisma', 'Redis'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 4,
    title: 'Analytics Dashboard',
    description: 'Custom analytics dashboard with data visualization, real-time metrics, and custom reports.',
    tags: ['React', 'D3.js', 'Express', 'PostgreSQL'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 5,
    title: 'Mobile Weather App',
    description: 'Cross-platform weather application with location services and detailed forecasts.',
    tags: ['React Native', 'Expo', 'Weather API'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
  {
    id: 6,
    title: 'Content Management System',
    description: 'Headless CMS with API-first architecture, markdown support, and version control.',
    tags: ['Next.js', 'GraphQL', 'MongoDB', 'MDX'],
    link: 'https://example.com',
    github: 'https://github.com',
  },
]

export function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading className="text-4xl font-bold mb-12 text-slate-900 dark:text-white">
          Featured <span className="text-primary dark:text-indigo-400">Projects</span>
        </AnimatedHeading>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="glass rounded-lg border p-6 hover:shadow-lg transition-shadow"
            >
              <AnimatedText className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                {project.title}
              </AnimatedText>

              <AnimatedText className="text-gray-600 dark:text-gray-300 mb-4 min-h-12">
                {project.description}
              </AnimatedText>

              <div className="mb-4 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-primary/10 dark:bg-indigo-400/10 text-primary dark:text-indigo-400 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3 pt-4 border-t border-white/20 dark:border-slate-700/20">
                {project.link && (
                  <a
                    href={project.link}
                    className="flex items-center gap-2 text-primary dark:text-indigo-400 hover:text-primary-dark dark:hover:text-indigo-300 transition-colors px-3 py-1 rounded border border-transparent hover:border-primary/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span className="text-sm">Live</span>
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    className="flex items-center gap-2 text-primary dark:text-indigo-400 hover:text-primary-dark dark:hover:text-indigo-300 transition-colors px-3 py-1 rounded border border-transparent hover:border-primary/50"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-4 h-4" />
                    <span className="text-sm">Code</span>
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
