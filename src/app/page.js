import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/section/Skills";
import Projects from "@/section/Projects";
import Experience from "@/section/Experience";
import Achievements from "@/section/Achievements";
import Contact from "@/section/Contact";

export default function Home() {
  return (
    <div className="bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900">
      <Navbar />
      
      <section id="home" >
        <Hero />
      </section>
      
      <section id="skills" >
        <Skills />
      </section>

      <section id="projects" >
        <Projects />
      </section>

      <section id="experience" >
        <Experience />
      </section>

      <section id="achievements">
        <Achievements />
      </section>

      <section id="contact">
        <Contact />
      </section>
    </div>
  );
}
