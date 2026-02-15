'use client'

import { motion } from 'framer-motion'
import { AnimatedHeading } from './animated-elements'

interface Experience {
  id: number
  company: string
  position: string
  duration: string
  description: string
  technologies: string[]
}

const experiences: Experience[] = [
  {
    id: 1,
    company: 'Tech Innovators Inc.',
    position: 'Senior Full-Stack Developer',
    duration: '2022 - Present',
    description:
      'Led development of multiple microservices, improved performance by 40%, and mentored junior developers. Architected scalable solutions for millions of daily users.',
    technologies: ['Next.js', 'Node.js', 'PostgreSQL', 'AWS', 'Docker'],
  },
  {
    id: 2,
    company: 'Digital Solutions Co.',
    position: 'Full-Stack Developer',
    duration: '2020 - 2022',
    description:
      'Built and maintained multiple production applications, implemented CI/CD pipelines, and improved code quality metrics. Increased application performance by 60%.',
    technologies: ['React', 'Express.js', 'MongoDB', 'GraphQL', 'Jest'],
  },
  {
    id: 3,
    company: 'StartUp Ventures',
    position: 'Frontend Developer',
    duration: '2019 - 2020',
    description:
      'Developed responsive web applications using React, collaborated with designers, and participated in agile development cycles.',
    technologies: ['React', 'Redux', 'CSS-in-JS', 'Webpack', 'Jest'],
  },
]

export function Experience() {
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeading className="text-4xl font-bold mb-12 text-slate-900 dark:text-white">
          Professional <span className="text-primary dark:text-indigo-400">Experience</span>
        </AnimatedHeading>

        <div className="space-y-8">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.id}
              variants={itemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: idx * 0.1 }}
              className="relative pl-8 border-l-2 border-primary dark:border-indigo-400"
            >
              <div className="absolute left--3 top-0 w-4 h-4 bg-primary dark:bg-indigo-400 rounded-full border-4 border-white dark:border-slate-900"></div>

              <div className="glass rounded-lg p-6">
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {exp.position}
                </h3>
                <p className="text-primary dark:text-indigo-400 font-semibold mb-2">
                  {exp.company}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {exp.duration}
                </p>

                <p className="text-gray-700 dark:text-gray-300 mb-4">
                  {exp.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {exp.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-blue-100 dark:bg-indigo-900/30 text-primary dark:text-indigo-400 text-sm rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
