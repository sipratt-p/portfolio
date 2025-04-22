import Hero from '../components/Hero'
import About from '../components/About'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Experience from '../components/Experience'
import Simulations from '../components/Simulations'
import Art from '../components/Art'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Experience />
      <Simulations />
      <Art />
    </main>
  )
}
