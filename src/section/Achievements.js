"use client";
import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaUsers } from "react-icons/fa";

const achievements = [
  {
    title: "Smart India Hackathon",
    description: "Participated in the national level Smart India Hackathon.",
    icon: <FaTrophy size={40} className="text-yellow-400" />,
  },
  {
    title: "KAVACH Hackathon",
    description: "Represented my college team in KAVACH Hackathon.",
    icon: <FaMedal size={40} className="text-orange-500" />,
  },
  {
    title: "Jaipur Hackathon - Runner Up",
    description: "Secured Runner-up position at Jaipur Hackathon.",
    icon: <FaTrophy size={40} className="text-gray-300" />,
  },
  {
    title: "College Club Convener",
    description: "Organized and managed multiple technical & cultural events.",
    icon: <FaUsers size={40} className="text-blue-400" />,
  },
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-20 px-8 md:px-16 bg-black text-center">
      <motion.h2
        className="text-4xl font-bold mb-12 text-white drop-shadow-[0_0_15px_#60a5fa]"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        Achievements
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-10"
        initial="hidden"
        whileInView="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.15 } },
        }}
        viewport={{ once: true }}
      >
        {achievements.map((item, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center justify-center bg-gray-900 p-8 rounded-xl shadow-md border border-gray-700 hover:shadow-[0_0_20px_#60a5fa] hover:border-blue-400 transition transform hover:scale-105"
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-xl font-bold text-blue-400">{item.title}</h3>
            <p className="mt-2 text-gray-300">{item.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
