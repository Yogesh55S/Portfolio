import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Skills from "@/section/Skills";
import Projects from "@/section/Projects";
import Experience from "@/section/Experience";
import Achievements from "@/section/Achievements";
import Contact from "@/section/Contact";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
