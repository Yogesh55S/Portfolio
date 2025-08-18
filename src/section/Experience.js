"use client";
import { motion } from "framer-motion";
import { FaLaptopCode, FaCode, FaBriefcase } from "react-icons/fa";

const experiences = [
  {
    role: "Full-Stack Developer",
    company: "Indiefluence, Kurukshetra",
    date: "2025 - Present",
    description: "Working on full-stack web applications with modern frameworks like Next.js, Supabase, and TailwindCSS.",
    icon: <FaLaptopCode className="text-gray-100" />,
  },
  {
    role: "Full-Stack Intern",
    company: "Hopping Minds, Mohali",
    date: "Jul 2023 - Aug 2023",
    description: "Built full-stack applications using React.js, Node.js, and MongoDB, gaining experience in scalable architectures.",
    icon: <FaCode className="text-gray-100" />,
  },
  {
    role: "Web Developer Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with HTML, CSS, JavaScript, and PHP to design responsive websites and integrate databases.",
    icon: <FaBriefcase className="text-gray-100" />,
  },
  {
    role: "PHP Developer",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Developed backend APIs and dynamic modules with PHP and MySQL.",
    icon: <FaCode className="text-gray-100" />,
  },
  {
    role: "Python with Database Trainee",
    company: "Achievers Technologies, Kurukshetra",
    date: "Aug 2021 - Oct 2021",
    description: "Worked with Python and MySQL to design database-driven applications.",
    icon: <FaBriefcase className="text-gray-100" />,
  },
];

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-2 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen flex flex-col items-center justify-center font-sans">
      <motion.h2
        className="text-5xl md:text-6xl font-extrabold text-center mb-16 text-white tracking-tight"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.2 }}
        viewport={{ once: true }}
      >
        Experience
      </motion.h2>
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center relative">

        {/* Center Timeline Vertical Line */}
        <div className="hidden sm:block absolute left-[45px] top-0 bottom-0 w-1 bg-gradient-to-b from-gray-700/70 via-gray-500/60 to-gray-700/70 rounded-full z-0" />

        <div className="flex flex-col gap-10">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="relative flex flex-row items-start z-10 group"
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * idx, duration: 0.6, type: "tween" }}
              viewport={{ once: true }}
            >
              {/* TIMELINE NODE */}
              <div className="flex flex-col items-center min-w-[90px] relative">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gradient-to-b from-gray-900 via-gray-700 to-gray-800 border-[3px] border-gray-500 flex items-center justify-center shadow-md group-hover:ring-4 group-hover:ring-white/30 transition-all duration-300"
                  animate={{ boxShadow: ["0 0 0 0 #fff0", "0 4px 30px 0 #5556"] }}
                  transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 + idx * 0.2 }}
                >
                  {exp.icon}
                </motion.div>
                {/* timeline line for small screens */}
                <span className="sm:hidden h-6 w-1 bg-gray-700 block mt-1"></span>
              </div>
              {/* INFO */}
              <div className="ml-5 flex-1">
                <div className="flex flex-col items-start mb-1">
                  <span className="uppercase text-xs text-gray-400 tracking-wide font-semibold">{exp.date}</span>
                  <span className="inline-block font-medium text-lg mt-1 bg-gradient-to-tr from-gray-100 to-gray-400 bg-clip-text text-transparent">
                    {exp.company}
                  </span>
                </div>
                <motion.h3
                  className="text-2xl font-bold text-white group-hover:text-gray-100 transition-colors duration-300 relative"
                  whileHover={{ letterSpacing: "0.06em", color: "#f3f4f6" }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  {exp.role}
                  <span className="block h-1 w-16 bg-gradient-to-r from-gray-600 via-gray-300 to-gray-500 rounded-full mt-1 group-hover:w-24 transition-all duration-500"></span>
                </motion.h3>
                <p className="text-gray-300 leading-relaxed mt-3">
                  {exp.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Horizontal mobile timeline */}
      <div className="block sm:hidden w-1 h-12 mx-auto mt-8 bg-gradient-to-b from-gray-600 to-gray-700 rounded-full opacity-60" />
    </section>
  );
}
