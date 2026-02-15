'use client'

import { motion } from 'framer-motion'
import { AnimatedHeading, AnimatedText } from './animated-elements'

export function About() {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeading className="text-4xl font-bold mb-8 text-slate-900 dark:text-white">
          About <span className="text-primary dark:text-indigo-400">Me</span>
        </AnimatedHeading>

        <div className="space-y-6 text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
          <AnimatedText delay={0.1}>
            <p>
              I&apos;m a passionate developer with over 5+ years of experience building web applications that solve real-world problems. My journey in tech started with a curiosity about how things work, which evolved into a career dedicated to creating elegant solutions.
            </p>
          </AnimatedText>

          <AnimatedText delay={0.2}>
            <p>
              What drives me is the intersection of design and functionality. I believe that great software isn&apos;t just about writing code—it&apos;s about understanding user needs and creating experiences that delight. Whether I&apos;m building complex backend systems or crafting intuitive user interfaces, I bring the same level of attention to detail and passion to every project.
            </p>
          </AnimatedText>

          <AnimatedText delay={0.3}>
            <p>
              When I&apos;m not coding, you&apos;ll find me contributing to open-source projects, writing technical articles, or exploring new technologies. I&apos;m always eager to collaborate and learn from the amazing community around me.
            </p>
          </AnimatedText>

          <div className="pt-8">
            <AnimatedHeading className="text-2xl font-semibold mb-4 text-slate-900 dark:text-white" delay={0.4}>
              Core Values
            </AnimatedHeading>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { title: 'Quality First', desc: 'Clean, maintainable code' },
                { title: 'User Focused', desc: 'Great experiences matter' },
                { title: 'Continuous Learning', desc: 'Always improving' },
              ].map((value, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-4 glass rounded-lg border"
                >
                  <h4 className="font-semibold text-slate-900 dark:text-white mb-2">{value.title}</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
