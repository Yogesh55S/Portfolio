"use client";
import { motion } from "framer-motion";
import { SiJavascript, SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiMongodb, SiMysql, SiPhp, SiPython, SiSupabase, SiC, SiCplusplus } from "react-icons/si";

const skills = [
  { name: "C", icon: <SiC size={40} /> },
  { name: "C++", icon: <SiCplusplus size={40} /> },
  { name: "Python", icon: <SiPython size={40} /> },
  { name: "PHP", icon: <SiPhp size={40} /> },
  { name: "JavaScript", icon: <SiJavascript size={40} /> },
  { name: "React.js", icon: <SiReact size={40} /> },
  { name: "Next.js", icon: <SiNextdotjs size={40} /> },
  { name: "TailwindCSS", icon: <SiTailwindcss size={40} /> },
  { name: "Node.js", icon: <SiNodedotjs size={40} /> },
  { name: "Supabase", icon: <SiSupabase size={40} /> },
  { name: "MongoDB", icon: <SiMongodb size={40} /> },
  { name: "MySQL", icon: <SiMysql size={40} /> },
];

export default function Skills() {
  return (
    <section id="skills" className="py-20 px-8 md:px-16 bg-gray-50 text-center">
      <motion.h2
        className="text-4xl font-bold mb-12"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Skills & Technologies
      </motion.h2>

      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 }
          }
        }}
        viewport={{ once: true }}
      >
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center bg-white shadow-md p-6 rounded-xl hover:shadow-xl transition transform hover:scale-110"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-4xl text-gray-800">{skill.icon}</div>
            <p className="mt-3 font-medium">{skill.name}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
