"use client";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Blood Donation Management System",
    date: "Oct 2021",
    description:
      "A system built for my college's annual blood donation fair to store and manage donor information easily.",
    tech: "HTML, CSS, JavaScript, Bootstrap, PHP, MySQL",
  },
  {
    title: "Billing System with Python",
    date: "Oct 2022",
    description:
      "A billing application that provides product details like quantity, quality, and price simultaneously.",
    tech: "Python, Tkinter, MySQL",
  },
  {
    title: "Agri-Farma (Full-Stack Platform)",
    date: "Nov 2024",
    description:
      "A platform for farmers to buy farm medicines and access the latest government information & offers.",
    tech: "React.js, Node.js, MongoDB, Vite, Bootstrap",
  },
  {
    title: "Rabbit Auto Care",
    date: "2025",
    description:
      "An innovative car care platform offering services, product management, and modern dashboards for customers and admins.",
    tech: "Next.js, TailwindCSS, Supabase, Node.js",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 px-8 md:px-16 bg-black text-center">
      <motion.h2
        className="text-4xl font-bold mb-12 text-white drop-shadow-[0_0_15px_#60a5fa]"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Projects
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700 shadow-md hover:shadow-[0_0_20px_#60a5fa] hover:border-blue-400 transition transform hover:scale-105 text-left"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-blue-400">{project.title}</h3>
            <p className="text-sm text-gray-400 mb-2">{project.date}</p>
            <p className="text-gray-300 mb-4">{project.description}</p>
            <p className="text-sm font-medium text-gray-400">
              <span className="font-bold text-white">Tech:</span> {project.tech}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
