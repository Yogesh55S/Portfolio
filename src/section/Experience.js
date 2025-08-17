"use client";
import { motion } from "framer-motion";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Indiefluence, Kurukshetra",
    date: "2025 - Present",
    description:
      "Working on full-stack web applications with modern frameworks like Next.js, Supabase, and TailwindCSS.",
  },
  {
    role: "Full-Stack Intern",
    company: "Hopping Minds, Mohali",
    date: "Jul 2023 - Aug 2023",
    description:
      "Built full-stack applications using React.js, Node.js, and MongoDB, gaining experience in scalable architectures.",
  },
  {
    role: "Web Developer Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description:
      "Worked with HTML, CSS, JavaScript, and PHP to design responsive websites and integrate databases.",
  },
  {
    role: "PHP Developer",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description:
      "Developed backend APIs and dynamic modules with PHP and MySQL.",
  },
  {
    role: "Python with Database Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description:
      "Worked with Python and MySQL to design database-driven applications.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-20 px-8 md:px-16 bg-gray-950">
      <motion.h2
        className="text-4xl font-bold text-center mb-12 text-white drop-shadow-[0_0_15px_#60a5fa]"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>

      <div className="relative border-l-4 border-blue-400 ml-6">
        {experiences.map((exp, index) => (
          <motion.div
            key={index}
            className="mb-10 ml-6"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div className="absolute -left-4 w-8 h-8 bg-blue-500 rounded-full border-4 border-white shadow-[0_0_20px_#60a5fa] animate-pulse"></div>
            <h3 className="text-xl font-bold text-blue-400">{exp.role}</h3>
            <p className="text-gray-400 italic">{exp.company}</p>
            <p className="text-sm text-gray-500">{exp.date}</p>
            <p className="mt-2 text-gray-300">{exp.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
