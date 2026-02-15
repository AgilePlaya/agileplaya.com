import { Header } from '@/components/header'
import { Hero } from '@/components/hero'
import { About } from '@/components/about'
import { Projects } from '@/components/projects'
import { Experience } from '@/components/experience'
import { Skills } from '@/components/skills'
import { Blog } from '@/components/blog'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <div className="fixed inset-0 flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      {/* Fixed Header */}
      <Header />
      
      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-scroll overflow-x-hidden scrollbar-hide">
        <main className="w-full">
          <Hero />
          <About />
          <Projects />
          <Experience />
          <Skills />
          <Blog />
          <Contact />
        </main>
        
        {/* Fixed Footer */}
        <Footer />
      </div>
    </div>
  )
}
