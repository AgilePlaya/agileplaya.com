'use client'

import { motion } from 'framer-motion'
import { ArrowRight, Calendar } from 'lucide-react'
import { AnimatedHeading, AnimatedText } from './animated-elements'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Building Scalable APIs with Node.js and PostgreSQL',
    excerpt:
      'Learn how to design and implement scalable REST APIs that can handle millions of requests. We explore database optimization, caching strategies, and load balancing.',
    date: 'Feb 10, 2024',
    readTime: '8 min read',
    category: 'Backend',
    slug: 'scalable-apis',
  },
  {
    id: 2,
    title: 'React Performance Optimization Techniques',
    excerpt:
      'Discover practical techniques to optimize React applications. From code splitting to memoization, learn how to make your React apps lightning fast.',
    date: 'Feb 5, 2024',
    readTime: '6 min read',
    category: 'Frontend',
    slug: 'react-performance',
  },
  {
    id: 3,
    title: 'Mastering TypeScript: Advanced Patterns',
    excerpt:
      'Deep dive into advanced TypeScript patterns and techniques. Understand generics, decorators, and conditional types for building robust applications.',
    date: 'Jan 28, 2024',
    readTime: '10 min read',
    category: 'TypeScript',
    slug: 'typescript-patterns',
  },
]

export function Blog() {
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
    <section id="blog" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <AnimatedHeading className="text-4xl font-bold mb-12 text-slate-900 dark:text-white">
          Latest <span className="text-primary dark:text-indigo-400">Articles</span>
        </AnimatedHeading>

        <motion.div
          className="space-y-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {blogPosts.map((post) => (
            <motion.a
              key={post.id}
              href={`/blog/${post.slug}`}
              variants={itemVariants}
              whileHover={{ x: 5 }}
              className="block glass rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-primary/10 dark:bg-indigo-400/10 text-primary dark:text-indigo-400 text-sm rounded-full">
                  {post.category}
                </span>
              </div>

              <AnimatedText className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {post.title}
              </AnimatedText>

              <AnimatedText className="text-gray-600 dark:text-gray-400 mb-4">
                {post.excerpt}
              </AnimatedText>

              <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {post.date}
                  </span>
                  <span>{post.readTime}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary dark:text-indigo-400" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mt-12 text-center"
        >
          <a
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
