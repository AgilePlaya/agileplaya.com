'use client'

import { motion } from 'framer-motion'
import { AnimatedHeading, AnimatedText } from './animated-elements'

interface Skill {
  category: string
  skills: { name: string; level: number }[]
}

const skillsData: Skill[] = [
  {
    category: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Next.js', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Tailwind CSS', level: 95 },
    ],
  },
  {
    category: 'Backend',
    skills: [
      { name: 'Node.js', level: 90 },
      { name: 'Express.js', level: 90 },
      { name: 'PostgreSQL', level: 85 },
      { name: 'MongoDB', level: 85 },
    ],
  },
  {
    category: 'DevOps & Tools',
    skills: [
      { name: 'Docker', level: 85 },
      { name: 'AWS', level: 80 },
      { name: 'Git', level: 95 },
      { name: 'CI/CD', level: 85 },
    ],
  },
  {
    category: 'Other',
    skills: [
      { name: 'GraphQL', level: 85 },
      { name: 'REST APIs', level: 95 },
      { name: 'Testing', level: 85 },
      { name: 'System Design', level: 80 },
    ],
  },
]

export function Skills() {
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
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <AnimatedHeading className="text-4xl font-bold mb-12 text-slate-900 dark:text-white">
          Technical <span className="text-primary dark:text-indigo-400">Skills</span>
        </AnimatedHeading>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {skillsData.map((skillGroup) => (
            <motion.div key={skillGroup.category} variants={itemVariants} className="glass rounded-lg p-6">
              <AnimatedText className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                {skillGroup.category}
              </AnimatedText>

              <div className="space-y-4">
                {skillGroup.skills.map((skill, idx) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {skill.name}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {skill.level}%
                      </span>
                    </div>

                    <motion.div
                      className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      transition={{
                        duration: 1,
                        delay: idx * 0.1,
                      }}
                      viewport={{ once: true }}
                      style={{ transformOrigin: 'left' }}
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-primary to-accent"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{
                          duration: 1,
                          delay: idx * 0.1,
                          ease: 'easeOut',
                        }}
                        viewport={{ once: true }}
                      />
                    </motion.div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
